"use client";

import { useState, useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen bg-gradient-to-tr from-[#3A00A4] to-[#802EE8]">
          <span className="styled-text">Striide</span>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-tr from-[#3A00A4] to-[#802EE8]">
          {children}
        </div>
      )}
    </>
  );
} 