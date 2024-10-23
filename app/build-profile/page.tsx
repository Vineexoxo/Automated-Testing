"use client"; // Add this line to mark the component as a Client Component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Change the import to next/navigation

const Page = () => {
  const [firstName, setFirstName] = useState(''); // State for first name input
  const [lastName, setLastName] = useState(''); // State for last name input
  const [pronouns, setPronouns] = useState(''); // State for pronouns selection
  const router = useRouter();

  // Handler for navigating to the next page
  const handleNextPage = () => {
    // Check if all fields are filled
    if (firstName && lastName && pronouns) {
      router.push('/connect'); // Update the route to match your folder structure
    } else {
      alert('Please fill in all fields before proceeding.'); // Alert if not all fields are filled
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#292732] text-white px-4">

      {/* Wrapper for the topmost div */}
      <div style={{ marginTop: '2rem' }}>
        <div
          className="text-[#E0631D] font-semibold text-[24px] text-center" // Center alignment
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          One last step!
        </div>
      </div>

      {/* Wrapper for the second div */}
      <div style={{ marginTop: '1rem' }}>
        <div className="text-white text-center" style={{ fontFamily: 'Nunito Sans, sans-serif' }}> {/* Set font to Nunito Sans */}
          <div> Lets build your profile!</div>
          <div>This information will be <span style={{ color: '#FFBF42' }}>public</span> and will help you connect with people.</div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', marginBottom: '3rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
        <div className="text-white">
          {/* Form Fields */}
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
                  onChange={(e) => setFirstName(e.target.value)} // Update firstName state on input change
                  className="w-full p-2 bg-transparent border-none outline-none text-[#9E88B2]" // Set text color for the input
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
                  onChange={(e) => setLastName(e.target.value)} // Update lastName state on input change
                  className="w-full p-2 bg-transparent border-none outline-none text-[#9E88B2]" // Set text color for the input
                />
              </div>
            </div>

            {/* Pronouns Dropdown */}
            <div className="bg-[#00A886] rounded-lg">
              <div className="p-2">
                <label htmlFor="pronouns" className="text-[#F4E9E9] pl-4">Pronouns *</label>
              </div>
              <div className="bg-white rounded-b-md pl-4 relative"> {/* Added relative for dropdown positioning */}
                <select
                  id="pronouns"
                  value={pronouns}
                  onChange={(e) => setPronouns(e.target.value)} // Update pronouns state on selection change
                  className="w-full p-2 bg-transparent border-none outline-none text-[#9E88B2] pl-2 pr-8 appearance-none" // Remove default arrow
                >
                  <option value="" disabled>Select from the dropdown</option>
                  <option value="male">she/her</option>
                  <option value="female">he/him</option>
                  <option value="other">they/them</option>
                </select>
                {/* Custom dropdown arrow */}
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10l5 5 5-5H7z" fill="#9E88B2"/>
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>
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
