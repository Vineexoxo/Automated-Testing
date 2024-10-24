"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

const Page = async () => {
  const router = useRouter();
  const { userId } = auth();
  const isAuth = !!userId;
  const user = await currentUser();

  if (!user) {
    return null;
  }

  console.log(user);

  const loggedInUser = await prisma.user.findUnique({
    where: {clerkUserId: user.id},
  });
  if (!loggedInUser) {
    await prisma.user.create({
      data: {
        clerkUserId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }

  const handleNextPage = () => {
    router.push('/almost-there-2');
  };

  if (!isAuth) {
    router.push("/");
  }

  return (
    <div className="flex flex-col items-center justify-center text-white px-4 bg-gradient-to-tr from-[#3A00A4] to-[#802EE8] h-screen w-screen">
      <div className="w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl flex flex-col">
        
        <div style={{ paddingTop : '1rem'}}>
          <div className="text-center font-bold text-white text-3xl italic" style={{ fontFamily: 'Montserrat, sans-serif' }}>Striide</div>
        </div>

        <div style={{ marginTop: '4rem', marginLeft: '0rem', marginBottom:'5rem' }}>
          <div className="text-6xl font-extrabold" style={{ fontFamily: 'Montserrat, sans-serif' }}>HELLO!</div>
        </div>

        <div style={{ marginTop : '1rem', marginBottom: '5rem' }}>
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