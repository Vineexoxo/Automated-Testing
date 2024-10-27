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
  <div className="flex flex-col min-h-screen w-full bg-gradient-to-tr from-[#3A00A4] to-[#802EE8] text-white">
    <div className="flex-grow flex flex-col px-4 py-10">

      {/* Striide at the top of the screen */}
      <div className="flex-grow text-center font-bold text-white talic mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        Striide
      </div>

      {/* HELLO! aligned to the center */}
      <div className="flex-grow flex ml-10 mg:ml-20 lg:ml-28 items-center mb-40 sm:mb-40 md:mb-40 lg:mb-40">
        <div className="flex grow flex text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          HELLO!
        </div>
      </div>

    {/* Additional Text Section centered */}
    <div className="flex-grow w-full flex items-center justify-center">
      <div className="text-center" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
        <p className="text-lg md:text-xl lg:text-2xl">We're building this for you!</p>
        <p className="text-lg md:text-xl lg:text-2xl">Tell us a bit about yourself so we can tailor the experience to you.</p>
      </div>
    </div>


      {/* Arrow icons at the bottom */}
      <div className="flex justify-end" style={{ marginBottom: '1rem', paddingRight: '0.2rem' }}> 
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
