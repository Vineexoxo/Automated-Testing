"use client"; // Add this line to mark the component as a Client Component

import React from 'react';
import { useRouter } from 'next/navigation'; // Change the import to next/navigation
import Image from 'next/image';


const Page = () => {
  const router = useRouter();

  const handleNextPage = () => {
    router.push('/profile');
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-tr from-[#3A00A4] to-[#802EE8] text-white px-0"> {/* Remove padding */}
      {/* Top half container */}
      <div className=" h-1/2 flex items-center justify-center relative">
        <Image 
          src="/thankyou.svg" // Replace with the correct path to your SVG file
          alt="Thank You"
          height={700}
          width={700}
        />
      </div>

        {/* Bottom half container */}
        <div className="w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl flex flex-col items-center justify-center">
        
        <div style={{ paddingTop: '1rem', textAlign: 'center', marginRight: '1rem', marginLeft: '1rem' }}>
            <div className="text-center text-white" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            <div>
                Your insights are invaluable. During this beta phase, we encourage you to
                share your feedback, report any issues, and suggest improvements.
            </div>
            <div style={{marginTop:'1rem'}}>
                Together, let's empower one another!
            </div>
            </div>
        </div>

{/* Button Section */}
            <div style={{ marginTop: '6rem', textAlign: 'center', display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <button
                        onClick={handleNextPage} // Navigate to the profile page on click
                        style={{
                        backgroundColor: '#FFF6FF', // Button background color
                        color: '#6B18D8', // Button text color
                        padding: '1.4rem 6rem', // Padding for the button
                        borderRadius: '8px', // Rounded corners
                        border: 'none', // No border
                        fontSize: '18px', // Font size
                        fontFamily: 'Montserrat, sans-serif', // Font family
                        cursor: 'pointer', // Pointer cursor on hover
                        }}
                    >
                        Let's Striide! {/* Button text */}
                    </button>
                </div>

            </div>
            </div>
  );
};

export default Page;
