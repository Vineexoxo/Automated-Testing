import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Nunito_Sans } from 'next/font/google';
const nunitoSans = Nunito_Sans({ subsets: ["latin"], weight: "700" });
import { dark, shadesOfPurple } from '@clerk/themes'

import "./globals.css";
import { ClerkProvider, ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <ClerkLoading>
            <div className="flex items-center justify-center h-screen">
              <span className="styled-text">Striide</span>
            </div>
          </ClerkLoading>

          <ClerkLoaded>
            <div className="flex flex-col min-h-screen">
              <nav className="bg-purple-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                  <Link href="/" className="text-white text-2xl font-bold">Striide</Link>
                  <div>
                    <SignedIn>
                      <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <SignedOut>
                      <Link href="/sign-up" className="text-white mr-4 hover:underline">Sign Up</Link>
                      <Link href="/sign-in" className="text-white hover:underline">Log In</Link>
                    </SignedOut>
                  </div>
                </div>
              </nav>
              <main className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl">
                  {children}
                </div>
              </main>
            </div>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}