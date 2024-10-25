import React, { useState } from 'react';
import cityData from '../src/assets/US_States_and_Cities.json'; // Adjust the path as necessary

interface BioPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const BioPopup: React.FC<BioPopupProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  if (!isOpen) return null;
  

  return (
    <>
      {/* Backdrop to block interaction with the rest of the screen */}
      <div
        className="fixed inset-0 z-50 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Popup content */}
      <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-60 bg-black text-white px-10 py-5 rounded-xl flex flex-col z-60"
      style={{
          width: '80vw', // Adjusts to 80% of the viewport width
          maxWidth: '600px', // Sets a max width for larger screens
          minWidth: '300px', // Ensures a minimum width for small screens
          height: '300px',
          maxHeight: '90vh', // Limits the popup height to 90% of the viewport height
          backdropFilter: 'blur(10px)', // Blur effect only on the popup
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
          zIndex: 60, // Must be higher than the backdrop's z-index
          overflowY: 'auto', // Allows scrolling if content exceeds max height
        }}
      >
        {/* Search Bar with Smile Button Next to It */}
        <div className="flex items-center w-full mt-3">
          {/* Search Input */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="City"
              value={inputValue}
              // onChange={handleInputChange}
              className="bg-transparent border border-gray-300 text-white w-full py-2 px-4 pr-10 rounded-md focus:outline-none"
              style={{
                borderColor: 'rgba(255, 255, 255, 255)',
                borderRadius: '8px',
              }}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-search text-gray-400"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
          {/* Smile Button */}
          <div className="relative">
            <button
              className="ml-4 bg-transparent border border-gray-300 p-2 rounded-md flex justify-center items-center focus:outline-none"
              style={{
                borderColor: 'rgba(255, 255, 255, 255)',
                borderRadius: '8px',
                width: '55px',
              }}
            >
              <img src="/smile.svg" alt="Smile icon" className="w-6 h-6" />
            </button>
          </div>
        </div>
      {/* Spacer to push buttons to the bottom */}
      <div className="flex-grow"></div>


        <div className="flex justify-center items-center mt-4 gap-2">
          <button
            onClick={onClose}
            className="flex items-center justify-center gap-2 px-4 py-1 rounded-full border border-white text-white"
            style={{
              fontSize: '14px',
              fontFamily: 'Montserrat, sans-serif',
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
          >
            Close
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <button
            onClick={onClose} // Or you can change this to another action
            className="flex items-center justify-center px-4 py-5 rounded-full text-white"
            style={{
              fontSize: '14px',
              fontFamily: 'Montserrat, sans-serif',
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-plus"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default BioPopup;
