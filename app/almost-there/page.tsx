"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { useUser } from '@clerk/nextjs';
import NextPageButton from '@/components/NextPageButton';


const Page = () => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {

      // Check if occupation exists and redirect if it does
      const checkOccupation = async () => {
        try {
          const response = await fetch('/api/check-occupation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user.id }),
          });

          const result = await response.json();
          if (result.occupationExists) {
            router.push('/get-started');
          }
        } catch (error) {
          console.error('Error checking occupation:', error);
        }
      };

      checkOccupation();
    }
  }, [isLoaded, user, router]);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await fetch('/api/authenticate');
        if (response.ok) {
          const data = await response.json();
          setIsAuth(data.isAuth);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Failed to fetch authentication status:", error);
        router.push("/");
      }
    };

    fetchAuthStatus();
  }, [router]);

  const handleNextPage = () => {
    router.push('/almost-there-2');
  };

  if (!isAuth) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-tr from-[#3A00A4] to-[#802EE8] text-white">
      <div className="flex-grow flex flex-col justify-between px-4 py-10">
  
        {/* Striide at the top of the screen */}
        <div className="flex-grow text-center font-bold text-white italic mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Striide
        </div>
  
        {/* HELLO! aligned to the center */}
        <div className="flex-grow flex items-center mb-2 sm:mb-4 md:mb-4 lg:mb-4">
          <div className="flex grow text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
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
  
        {/* Fixed Position Next Page Button */}
        <div className="flex bottom-4 right-0 mb-0 mr-0">
          <NextPageButton handleNextPage={handleNextPage} />
        </div>
  
      </div>
    </div>
  );
};  
  
  export default Page;