"use client"; // Add this line to mark the component as a Client Component

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Page = () => {
  const router = useRouter();

  const handleNextPage = () => {
    router.push('/profile');
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-tr from-[#3A00A4] to-[#802EE8] text-white">
      {/* Top half container */}
      <div className="flex items-center justify-center h-1/2">
        <Image 
          src="/thankyou.svg" // Replace with the correct path to your SVG file
          alt="Thank You"
          height={800}
          width={2000} // Adjust width for responsiveness
          className="max-w-full h-auto"
        />
      </div>

      {/* Bottom half container */}
      <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto text-center px-4">
        {/* Text Section */}
        <div className="text-white font-nunito space-y-4">
          <p>
            Your insights are invaluable. During this beta phase, we encourage you to
            share your feedback, report any issues, and suggest improvements.
          </p>
          <p>
            Together, let's empower one another!
          </p>
        </div>

        {/* Button Section */}
        <div className="mt-16 w-full flex justify-center">
          <button
            onClick={handleNextPage} // Navigate to the profile page on click
            className="bg-[#FFF6FF] text-[#6B18D8] py-4 px-10 rounded-lg text-lg font-montserrat"
          >
            Let's Striide!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;