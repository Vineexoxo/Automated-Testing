"use client"; // Add this line to mark the component as a Client Component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Change the import to next/navigation

const Page = () => {
  const [isChecked, setIsChecked] = useState(false); // State to manage checkbox
  const [occupation, setOccupation] = useState(''); // State for occupation input
  const [gender, setGender] = useState(''); // State for gender selection
  const [birthday, setBirthday] = useState(''); // State for birthday input
  const router = useRouter();

  // Function to handle checkbox toggle
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Handler for navigating to the next page
  const handleNextPage = () => {
    // Check if all fields are filled and the checkbox is checked
    if (occupation && gender && birthday && isChecked) {
      router.push('/build-profile'); // Update the route to match your folder structure
    } else {
      alert('Please fill in all fields and confirm that you have read and agree with the Terms of Service and Privacy Policy.'); // Alert if not all fields are filled
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#292732] text-white px-4">

      {/* Wrapper for the topmost div */}
      <div style={{ marginTop: '2rem' }}>
        <div
          className="text-[#E0631D] font-semibold text-[24px] text-center" // Added text-center for center alignment
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          You're almost there!
        </div>
      </div>

      {/* Wrapper for the second div */}
      <div style={{ marginTop: '1rem' }}>
        <div className="text-white text-center" style={{ fontFamily: 'Nunito Sans, sans-serif' }}> {/* Set font to Nunito Sans */}
          <div>Tell Us About Yourself!</div>
          <div>This information is <span style={{ color: '#00A886' }}>private</span> and will not be displayed on your profile.</div>
        </div>
      </div>

      {/* Wrapper for the third div with form inputs */}
      <div style={{ marginTop: '2rem', marginBottom: '3rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
        <div className="text-white">
          {/* Form Fields */}
          <div className="flex flex-col space-y-4">
            {/* Occupation Field */}
            <div className="bg-[#00A886] rounded-lg">
              <div className="p-2"> {/* Wrapper for the label with padding */}
                <label htmlFor="occupation" className="text-[#F4E9E9] pl-4">Occupation *</label>
              </div>
              <div className="bg-white rounded-b-md pl-4"> {/* Background for input field */}
                <input
                  id="occupation"
                  type="text"
                  placeholder="ex. Engineer"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)} // Update occupation state on input change
                  className="w-full p-2 bg-transparent border-none outline-none text-[#9E88B2]" // Set text color for the input
                />
              </div>
            </div>

            {/* Gender Dropdown */}
            <div className="bg-[#00A886] text-[#F4E9E9] rounded-lg">
              <div className="p-2"> {/* Wrapper for the label with padding */}
                <label htmlFor="gender" className="pl-4"> {/* Added left padding */}
                  Gender *
                </label>
              </div>
              <div className="bg-white rounded-b-lg relative"> {/* Added relative for dropdown positioning */}
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)} // Update gender state on selection change
                  className="w-full p-2 bg-transparent border-none outline-none text-[#9E88B2] pl-5 pr-8 appearance-none" // Added padding-left and vertical padding
                >
                  <option value="" disabled>Select from the dropdown</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {/* Custom dropdown arrow */}
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10l5 5 5-5H7z" fill="#9E88B2"/>
                  </svg>
                </div>
              </div>
            </div>


            {/* Birthday Field */}
            <div className="bg-[#00A886] text-[#F4E9E9] rounded-lg">
              <div className="p-2"> {/* Wrapper for the label with padding */}
                <label htmlFor="birthday" className="pl-4">Birthday *</label>
              </div>
              <div className="bg-white rounded-b-md pl-2"> {/* Background for input field */}
                <input
                  id="birthday"
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)} // Update birthday state on input change
                  className="w-full p-2 bg-transparent border-none outline-none text-[#9E88B2] placeholder:font-semibold pl-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wrapper for the checkbox and text */}
      <div className="flex items-center mb-4"> {/* Flex for horizontal alignment */}
        <input 
          type="checkbox" 
          checked={isChecked} 
          onChange={handleCheckboxChange} 
          className="mr-2" // Margin-right for spacing
        />
        <label className="text-white" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
          I hereby confirm that I have read and agree with the 
          <span style={{ textDecoration: 'underline' }}> Terms of Service</span> and 
          <span style={{ textDecoration: 'underline' }}> Privacy Policy</span>.
        </label>
      </div>

      {/* Arrow icons */}
      <div className="flex justify-end" style={{ marginTop: '5rem', paddingRight: '1rem' }}> 
        <div className="flex -space-x-8"> 
          {/* Arrow with smooth hover effect */}
          <div onClick={handleNextPage} className="cursor-pointer">
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

          <div onClick={handleNextPage} className="cursor-pointer">
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

          <div onClick={handleNextPage} className="cursor-pointer">
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
  );
};

export default Page;
