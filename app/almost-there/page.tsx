"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { useUser } from '@clerk/nextjs';

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
    <div className="flex-grow flex flex-col px-4 py-10">

        <div style={{ paddingTop: '1rem' }}>
          <div className="text-center font-bold text-white text-3xl italic" style={{ fontFamily: 'Montserrat, sans-serif' }}>Striide</div>
        </div>

        <div style={{ marginTop: '4rem', marginLeft: '0rem', marginBottom: '5rem' }}>
          <div className="text-6xl font-extrabold" style={{ fontFamily: 'Montserrat, sans-serif' }}>HELLO!</div>
        </div>

        <div style={{ marginTop: '1rem', marginBottom: '5rem' }}>
          <div style={{ fontSize: '1.4rem' }}>
            <div>We&apos;re building this for you!</div>
            <div>Tell us a bit about yourself so we can tailor the experience to you.</div>
          </div>
        </div>

        <div className="flex justify-end" style={{ marginBottom: '1rem', paddingRight: '1rem' }}>
          <div className="flex -space-x-8">
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