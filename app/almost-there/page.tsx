"use client"; // Add this line to mark the component as a Client Component

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Change the import to next/navigation
import { useAuth } from "@clerk/nextjs";

const Page = () => {
  const router = useRouter();
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/sign-in');
    }
  }, [isLoaded, userId, router]);

  const handleNextPage = () => {
    router.push('/almost-there-2');
  };

  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center text-white px-4 bg-gradient-to-tr from-[#3A00A4] to-[#802EE8] h-screen w-screen">
      <div className="w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl flex flex-col">
        
        {/* Wrapper for Striide with inline style for top margin */}
        <div style={{ paddingTop : '1rem'}}>
          <div className="text-center font-bold text-white text-3xl italic" style={{ fontFamily: 'Montserrat, sans-serif' }}>Striide</div>
        </div>

        {/* Wrapper for HELLO! aligned to the left */}
        <div style={{ marginTop: '4rem', marginLeft: '0rem', marginBottom:'5rem' }}>
          <div className="text-6xl font-extrabold" style={{ fontFamily: 'Montserrat, sans-serif' }}>HELLO!</div>
        </div>

        {/* Wrapper for Additional Text Section centered */}
        <div style={{ marginTop : '1rem', marginBottom: '5rem' }}>
          <div style={{ fontSize: '1.4rem' }}>
            <div>We&apos;re building this for you!</div>
            <div>Tell us a bit about yourself so we can tailor the experience to you.</div>
          </div>
        </div>

        {/* Arrow icons */}
        <div className="flex justify-end" style={{ marginBottom: '1rem', paddingRight: '1rem' }}> 
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
    </div>
  );
};

export default Page;
