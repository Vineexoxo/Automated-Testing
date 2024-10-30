"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Upload from '../../components/Upload';
import Modal from 'react-modal';
import NextPageButton from '@/components/NextPageButton';
import BioPopup from '@/components/BioPopup';

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const authenticator = async () => {
  try {
    const res = await fetch("/api/upload-auth");

    if (!res.ok) {
      throw new Error("Authentication failed");
    }

    const data = await res.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error("Authentication failed");
  }
};

const handleError = (error: any) => {
  console.log("Error uploading file:", error);
};

const Page = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [triggerUpload, setTriggerUpload] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCameraClick = () => {
    setTriggerUpload(true);
  };

  const handleUploadSuccess = (imageUrl: string) => {
    setUploadedImageUrl(imageUrl);
    setTriggerUpload(false);
  };

  const handleUploadError = (error: any) => {
    console.error("Upload error:", error);
    setTriggerUpload(false);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      try {
        const { signature, expire, token } = await authenticator();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('signature', signature);
        formData.append('expire', expire.toString());
        formData.append('token', token);

        const response = await fetch(`${urlEndpoint}/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const result = await response.json();
        setUploadedImageUrl(result.url); 
        console.log('File uploaded successfully:', result);
      } catch (error) {
        handleError(error);
      }
    }
  };
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [step, setStep] = useState(1);

  const [occupation, setOccupation] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pronouns, setPronouns] = useState('');

  const [isBioPopupOpen, setIsBioPopupOpen] = useState(false);

  const [cityEmojis, setCityEmojis] = useState<{ city: string; emoji: string }[]>([]);

  const addCityEmoji = (city: string, emoji: string) => {
    setCityEmojis([...cityEmojis, { city, emoji }]);
  };

  

  useEffect(() => {
    console.log(user);
  }, [user]);
  
  useEffect(() => {
    console.log("City-Emoji pairs updated:", cityEmojis);
  }, [cityEmojis]);


  const toggleBioPopup = () => {
    setIsBioPopupOpen(!isBioPopupOpen);
  };

  useEffect(() => {
    console.log(user);
  })

  useEffect(() => {
    if (isLoaded && user) {
      setFirstName(user.firstName ?? '');
      setLastName(user.lastName ?? '');

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

  const handleNextStep = async () => {
    if (step === 1) {
      if (occupation && gender && birthday && isChecked) {
        setStep(2);
      } else {
        alert('Please fill in all fields and confirm that you have read and agree with the Terms of Service and Privacy Policy.');
      }
    } else {
      if (firstName && lastName && pronouns) {
        try {
          const response = await fetch('/api/update-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName,
              lastName,
              pronouns,
              occupation,
              gender,
              birthday,
              imageUrl: uploadedImageUrl,
              cityEmojis,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to update user');
          }

          const updatedUser = await response.json();
          console.log('User updated:', updatedUser);
          router.push('/connect');
        } catch (error) {
          console.error('Error updating user:', error);
          alert('An error occurred while saving your information. Please try again.');
        }
      } else {
        alert('Please fill in all fields before proceeding.');
      }
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-[#292732] w-full text-white justify-start">
      {step === 1 ? (
        <div className="flex flex-col h-full justify-center">
          {/* Title Section */}
          <div className="mt-8 w-full">
            <div className="text-[#E0631D] font-semibold text-[24px] text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              You&apos;re almost there!
            </div>
          </div>

          <div className="mt-5 w-full">
            <div className="text-white text-center">
              <div>Tell Us About Yourself!</div>
              <div>This information is <span style={{ color: '#00A886' }}>private</span> and will not be displayed on your profile.</div>
            </div>
          </div>

          {/* Form Fields Section */}
          <div className="flex justify-center mt-5">
            <div className="mt-2 mb-2 pr-0 max-w-md w-full">
              <div className="text-white">
                <div className="flex flex-col space-y-5 ml-2 mr-2 mb-5">
                  {/* Occupation Field */}
                  <div className="bg-[#00A886] rounded-lg">
                    <div className="p-2">
                      <label htmlFor="occupation" className="text-[#F4E9E9] pl-4">Occupation *</label>
                    </div>
                    <div className="bg-white rounded-b-md pl-4">
                      <input
                        id="occupation"
                        type="text"
                        placeholder="ex. Engineer"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        className="w-full p-2 bg-transparent border-none outline-none text-black"
                      />
                    </div>
                  </div>

                  {/* Gender Field - Changed from select to input */}
                  <div className="bg-[#00A886] text-[#F4E9E9] rounded-lg">
                    <div className="p-2">
                      <label htmlFor="gender" className="pl-4">Gender *</label>
                    </div>
                    <div className="bg-white rounded-b-md pl-4">
                      <input
                        id="gender"
                        type="text"
                        placeholder="Enter your gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full p-2 bg-transparent border-none outline-none text-black"
                      />
                    </div>
                  </div>

                  {/* Birthday Field */}
                  <div className="bg-[#00A886] text-[#F4E9E9] rounded-lg">
                    <div className="p-2">
                      <label htmlFor="birthday" className="pl-4">Birthday *</label>
                    </div>
                    <div className="bg-white rounded-b-md pl-2">
                      <input
                        id="birthday"
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        className="w-full p-2 bg-transparent border-none outline-none text-black placeholder:font-semibold pl-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkbox Section */}
          <div className="flex items-center ml-3 justify-center">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="mr-4"
            />
            <label className="text-white">
              I hereby confirm that I have read and agree with the
              <span style={{ textDecoration: 'underline' }}> Terms of Service</span> and
              <span style={{ textDecoration: 'underline' }}> Privacy Policy</span>.
            </label>
          </div>

          {/* Fixed Position Next Page Button */}
          <div className="fixed bottom-4 right-4 mb-0 mr-0">
            <NextPageButton handleNextPage={handleNextStep} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full justify-center">
          {/* Title Section */}
          <div className="mt-8 w-full">
            <div className="text-[#E0631D] font-semibold text-[24px] text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              One last step!
            </div>
          </div>

          {/* Subheading Section */}
          <div className="mt-5 w-full">
            <div className="text-white text-center">
              <div>Please complete your profile!</div>
              <div>This information will be <span style={{ color: '#FFBF42' }}>public</span> and will help you connect with people.</div>
            </div>
          </div>

          {/* Camera icon and bio */}
          <div className="flex justify-center mt-4 items-center">
            {uploadedImageUrl ? (
              <>
                <Image
                  src={uploadedImageUrl}
                  alt="Uploaded image"
                  width={100}
                  height={100}
                  onClick={openModal}
                  className="cursor-pointer"
                />
                <button
                  onClick={handleCameraClick}
                  className="ml-4 bg-[#00A886] text-white px-4 py-2 rounded-md hover:bg-[#008c6e]"
                >
                  Change Image
                </button>
              </>
            ) : (
              <div onClick={handleCameraClick} className="cursor-pointer">
                <Image
                  src="/camera.svg"
                  alt="Camera icon"
                  width={100}
                  height={100}
                />
              </div>
            )}
            <Upload
              onSuccess={handleUploadSuccess}
              onError={handleUploadError}
              triggerUpload={triggerUpload}
            />
          </div>

          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Expanded Image"
            className="flex items-center justify-center"
            overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
          >
            <div className="relative">
              <Image
                src={uploadedImageUrl || ''}
                alt="Expanded image"
                width={500}
                height={500}
                objectFit="contain"
              />
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2"
              >
                X
              </button>
            </div>
          </Modal>

          {/* Bio Section */}
          <div className="mt-4 mx-4">
            {cityEmojis.length === 0 ? (
              // When cityEmojis are empty, render the Bio button
              <div
                className="border border-[#FFBF42] rounded-lg flex justify-center items-center px-4 py-2 gap-x-2"
                onClick={toggleBioPopup}
                style={{ color: '#FFFFFF', cursor: 'pointer' }}
              >
                <span className="text-lg font-semibold">Bio</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ) : (
              // When cityEmojis are present, render the cities and plus button
              <div className="flex justify-center items-center mt-4 gap-x-6">
                {cityEmojis.map((cityEmoji, index) => (
                  <span key={index} className="text-white flex items-center gap-x-1">
                    {cityEmoji.emoji} {cityEmoji.city}
                  </span>
                ))}
                <button
                  className="text-white flex items-center justify-center bg-transparent border border-white p-2 rounded-md"
                  onClick={toggleBioPopup}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
            {/* BioPopup Component */}
            <BioPopup
              isOpen={isBioPopupOpen}
              onClose={toggleBioPopup}
              addCityEmoji={addCityEmoji}
              cityEmojis={cityEmojis}
            />
          </div>

          <div style={{ marginTop: '2rem', marginBottom: '3rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
            <div className="text-white">
              <div className="flex flex-col space-y-4">
                {/* First Name Field */}
                <div className="bg-[#00A886] rounded-lg">
                  <div className="p-2">
                    <label htmlFor="firstName" className="text-[#F4E9E9] pl-4">First Name *</label>
                  </div>
                  <div className="bg-white rounded-b-md pl-4">
                    <input
                      id="firstName"
                      type="text"
                      placeholder="ex. John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full p-2 bg-transparent border-none outline-none text-black"
                    />
                  </div>
                </div>

                {/* Last Name Field */}
                <div className="bg-[#00A886] rounded-lg">
                  <div className="p-2">
                    <label htmlFor="lastName" className="text-[#F4E9E9] pl-4">Last Name *</label>
                  </div>
                  <div className="bg-white rounded-b-md pl-4">
                    <input
                      id="lastName"
                      type="text"
                      placeholder="ex. Smith"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full p-2 bg-transparent border-none outline-none text-black"
                    />
                  </div>
                </div>

                {/* Pronouns Field - Changed from select to input */}
                <div className="bg-[#00A886] rounded-lg">
                  <div className="p-2">
                    <label htmlFor="pronouns" className="text-[#F4E9E9] pl-4">Pronouns *</label>
                  </div>
                  <div className="bg-white rounded-b-md pl-4">
                    <input
                      id="pronouns"
                      type="text"
                      placeholder="Enter your pronouns"
                      value={pronouns}
                      onChange={(e) => setPronouns(e.target.value)}
                      className="w-full p-2 bg-transparent border-none outline-none text-black"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end p-4 ">
            <NextPageButton handleNextPage={handleNextStep} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;