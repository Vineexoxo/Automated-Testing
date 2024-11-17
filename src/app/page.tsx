"use client";
import React from "react";
import Link from "next/link";
import { useAuth, SignOutButton } from "@clerk/nextjs";

/**
 * Home component that serves as the landing page for the Striide application.
 * Displays a welcome message and provides navigation options based on the user's authentication status.
 *
 * @returns {JSX.Element} The rendered Home component.
 */
export default function Home() {
  const { isSignedIn } = useAuth();

  return (
    <div className="bg-gradient-to-tr from-[#3A00A4] to-[#802EE8] min-h-screen w-full flex flex-col items-center justify-center text-white px-4">
      <div className="text-center max-w-lg mb-8">
        <h1 className="text-[30px] font-bold mb-6">
          Welcome to <span className="font-bold italic">Striide</span>
        </h1>
        <p className="text-lg mb-4">
          Join us in building a connected and aware community where we look out for each other.
        </p>
        <p className="text-lg mb-10">
          Welcome to Version 1! It&apos;s not perfect, but with your help, we can make it amazing.
        </p>
      </div>
      <div className="w-full max-w-sm flex flex-col gap-4">
        {isSignedIn ? (
          <>
            <Link href="/connect" className="bg-white text-[#5044F1] font-semibold py-2 rounded-lg text-center">
              Go to Connect
            </Link>
            <SignOutButton>
              <button className="w-full border border-white text-white font-semibold py-2 rounded-lg text-center">
                Log out
              </button>
            </SignOutButton>
          </>
        ) : (
          <>
            <Link href="/sign-up" className="bg-white text-[#5044F1] font-semibold py-2 rounded-lg text-center">
              Sign up
            </Link>
            <Link href="/sign-in" className="border border-white text-white font-semibold py-2 rounded-lg text-center">
              Log in
            </Link>
          </>
        )}
      </div>
    </div>
  );
}