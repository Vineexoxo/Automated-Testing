"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

const Page = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [step, setStep] = useState(1);

  // State for almost-there-2 fields
  const [occupation, setOccupation] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  // State for build-profile fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pronouns, setPronouns] = useState('');

  useEffect(() => {
    console.log(user);
  })

  useEffect(() => {
    if (isLoaded && user) {
      // Auto-fill first name and last name
      setFirstName(user.firstName ?? '');
      setLastName(user.lastName ?? '');
    }
  }, [isLoaded, user]);

  const handleNextStep = async () => {
    if (step === 1) {
      if (occupation && gender && birthday && isChecked) {
        setStep(2);
      } else {
        alert('Please fill in all fields and confirm that you have read and agree with the Terms of Service and Privacy Policy.');
      }
    } else {
      if (firstName && lastName && pronouns) {
        try {
          const response = await fetch('/api/update-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName,
              lastName,
              pronouns,
              occupation,
              gender,
              birthday,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to update user');
          }

          const updatedUser = await response.json();
          console.log('User updated:', updatedUser);
          router.push('/connect'); // Navigate to the dashboard after successful update
        } catch (error) {
          console.error('Error updating user:', error);
          alert('An error occurred while saving your information. Please try again.');
        }
      } else {
        alert('Please fill in all fields before proceeding.');
      }
    }

  };
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#292732] text-white">
      {step === 1 ? (
        <div className="flex-grow flex flex-col justify-between px-2 py-10 text-white ">
          {/* Title Section */}
          <div>
            <div className="text-[#E0631D] font-semibold text-center font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl"  style={{ fontFamily: 'Montserrat, sans-serif' }}>
              You're almost there!
            </div>

            <div className="text-white text-center mt-2 sm:mt-4 md:mt-6 " style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              <p className="text-md md:text-xl lg:text-2xl">Tell Us About Yourself!</p>
              <p className="text-md md:text-xl lg:text-2xl">
                This information is <span style={{ color: '#00A886' }}>private</span> and will not be displayed on your profile.
              </p>
            </div>

            <div className="text-white mt-6 sm:mt-10 md:mt-6 lg:mt-8 ml-4 mr-4" >
           <div className="flex flex-col space-y-4">
      
            {/* Occupation Field */}
            <div className="bg-[#00A886] rounded-lg">
              <div className="p-2">
                <label htmlFor="occupation" className="text-[#F4E9E9] pl-4">Occupation *</label>
              </div>
              <div className="bg-white rounded-b-md pl-4 relative">
                <input
                  id="occupation"
                  type="text"
                  placeholder="ex. Engineer"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full p-2 bg-transparent border-none outline-none text-black"
                />
              </div>
            </div>

            {/* Gender Dropdown */}
            <div className="bg-[#00A886] rounded-lg">
              <div className="p-2">
                <label htmlFor="gender" className="text-[#F4E9E9] pl-4">Gender *</label>
              </div>
              <div className="bg-white rounded-b-md pl-4 relative">
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-2 bg-transparent border-none outline-none text-black pl-5 pr-8 appearance-none"
                >
                  <option value="" disabled>Select from the dropdown</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10l5 5 5-5H7z" fill="#9E88B2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Birthday Field */}
            <div className="bg-[#00A886] rounded-lg">
              <div className="p-2">
                <label htmlFor="birthday" className="text-[#F4E9E9] pl-4">Birthday *</label>
              </div>
              <div className="bg-white rounded-b-md pl-4">
                <input
                  id="birthday"
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="w-full p-2 bg-transparent border-none outline-none text-black placeholder:font-semibold pl-4"
                />
              </div>
            </div>

          </div>
        </div>
                  {/* Checkbox Section */}
                  <div className="flex items-center ml-3 justify-center mt-5 sm:mt-6 md:mt-8 lg:mt-10">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="mr-4"
            />
            <label className="text-white" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              I hereby confirm that I have read and agree with the
              <span style={{ textDecoration: 'underline' }}> Terms of Service</span> and
              <span style={{ textDecoration: 'underline' }}> Privacy Policy</span>.
            </label>
          </div>
      </div>
  
         {/* Arrow icons at the bottom */}
         <div className="flex justify-end" style={{ marginBottom: '1rem', paddingRight: '0.7rem' }}> 
          <div className="flex -space-x-8"> 
            {/* Arrow with smooth hover effect */}
            <div onClick={handleNextStep} className="cursor-pointer">
              <svg 
                width="60" 
                height="60" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="transition-transform duration-300 hover:scale-110">
                <path 
                  d="M8 4l8 8-8 8" 
                  stroke="rgba(255, 255, 255, 0.6)" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  className="transition-all duration-300" />
              </svg>
            </div>

            <div onClick={handleNextStep} className="cursor-pointer">
              <svg 
                width="60" 
                height="60" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="transition-transform duration-300 hover:scale-110">
                <path 
                  d="M8 4l8 8-8 8" 
                  stroke="rgba(255, 255, 255, 0.8)" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  className="transition-all duration-300" />
              </svg>
            </div>

            <div onClick={handleNextStep} className="cursor-pointer">
              <svg 
                width="60" 
                height="60" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="transition-transform duration-300 hover:scale-110">
                <path 
                  d="M8 4l8 8-8 8" 
                  stroke="rgba(255, 255, 255, 1)" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  className="transition-all duration-300" />
              </svg>
            </div>
          </div>
        </div>

      </div>
      ) : (
        <div className="flex-grow flex flex-col justify-between px-2 py-10 text-white ">
          {/* Title Section */}
          <div>
          <div className="text-[#E0631D] font-semibold text-center font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl"  style={{ fontFamily: 'Montserrat, sans-serif' }}>
              One last step!
            </div>
            <div className="text-white text-center mt-2 sm:mt-4 md:mt-6 " style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            <div className="text-white text-center" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              <p className="text-md md:text-xl lg:text-2xl">Please complete your profile!</p>
              <p className="text-md md:text-xl lg:text-2xl">This information will be <span style={{ color: '#FFBF42' }}>public</span> and will help you connect with people.</p>
            </div>
          </div>  
          </div>
  

  
          {/* Camera icon and bio */}
          <div className="flex justify-center mt-4">
            <Image
              src="/camera.svg"
              alt="Camera icon"
              width={100}
              height={100}
            />
          </div>
  
      {/* Bio Section */}
      <div className="mt-4 mx-4">
        <div 
          className="border border-[#FFBF42] rounded-lg flex justify-center items-center px-4 py-2 gap-x-2"
          onClick={togglePopup} // Open popup on click
          style={{ color: '#FFFFFF', cursor: 'pointer' }}
        >
          <span className="text-lg font-semibold">Bio</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>  
  
          <div style={{ marginTop: '2rem', marginBottom: '3rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
            <div className="text-white">
              <div className="flex flex-col space-y-4">
                {/* First Name Field */}
                <div className="bg-[#00A886] rounded-lg">
                  <div className="p-2">
                    <label htmlFor="firstName" className="text-[#F4E9E9] pl-4">First Name *</label>
                  </div>
                  <div className="bg-white rounded-b-md pl-4">
                    <input
                      id="firstName"
                      type="text"
                      placeholder="ex. John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full p-2 bg-transparent border-none outline-none text-black"
                    />
                  </div>
                </div>
  
                {/* Last Name Field */}
                <div className="bg-[#00A886] rounded-lg">
                  <div className="p-2">
                    <label htmlFor="lastName" className="text-[#F4E9E9] pl-4">Last Name *</label>
                  </div>
                  <div className="bg-white rounded-b-md pl-4">
                    <input
                      id="lastName"
                      type="text"
                      placeholder="ex. Smith"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full p-2 bg-transparent border-none outline-none text-black"
                    />
                  </div>
                </div>
                <div className="bg-[#00A886] rounded-lg">
              <div className="p-2">
                <label htmlFor="gender" className="text-[#F4E9E9] pl-4">Gender *</label>
              </div>

              {/* Pronouns Field */}
              <div className="bg-white rounded-b-md pl-2 relative">
                <select
                  id="pronouns"
                  value={pronouns}
                  onChange={(e) => setPronouns(e.target.value)}
                  className="w-full p-2 bg-transparent border-none outline-none text-black pl-5 pr-8 appearance-none"
                >
                  <option value="" disabled>Select from the dropdown</option>
                  <option value="male">She/Her</option>
                  <option value="female">He/Him</option>
                  <option value="other">They/Them</option>
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10l5 5 5-5H7z" fill="#9E88B2" />
                  </svg>
                </div>
              </div>
            </div>
              </div>
            </div>
          </div>

        {/* Arrow icons at the bottom */}
        <div className="flex justify-end" style={{ marginBottom: '1rem', paddingRight: '0.7rem' }}> 
          <div className="flex -space-x-8"> 
            {/* Arrow with smooth hover effect */}
            <div onClick={handleNextStep} className="cursor-pointer">
              <svg 
                width="60" 
                height="60" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="transition-transform duration-300 hover:scale-110">
                <path 
                  d="M8 4l8 8-8 8" 
                  stroke="rgba(255, 255, 255, 0.6)" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  className="transition-all duration-300" />
              </svg>
            </div>

            <div onClick={handleNextStep} className="cursor-pointer">
              <svg 
                width="60" 
                height="60" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="transition-transform duration-300 hover:scale-110">
                <path 
                  d="M8 4l8 8-8 8" 
                  stroke="rgba(255, 255, 255, 0.8)" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  className="transition-all duration-300" />
              </svg>
            </div>

            <div onClick={handleNextStep} className="cursor-pointer">
              <svg 
                width="60" 
                height="60" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="transition-transform duration-300 hover:scale-110">
                <path 
                  d="M8 4l8 8-8 8" 
                  stroke="rgba(255, 255, 255, 1)" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  className="transition-all duration-300" />
              </svg>
            </div>
          </div>
        </div>

      </div>
      )}
    </div>
  );
};  

export default Page;