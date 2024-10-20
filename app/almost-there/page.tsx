import React from 'react';

const Page = () => {
  return (
    <div className="bg-[#590BBE] h-screen flex items-center justify-center text-center text-white">
      <div className="w-4/5 md:w-1/5 flex flex-col items-center">
        <div className="font-montserrat text-2xl italic font-bold leading-[36.57px] mb-5">
          Striide
        </div>
        <div className="self-start ml-5 mb-5 text-xl font-bold">
          HELLO!
        </div>
        <div className="max-w-lg text-lg leading-6">
          We're building this for you! Tell us a bit about yourself so we can tailor the experience to you!
        </div>
      </div>
    </div>
  );
};

export default Page;