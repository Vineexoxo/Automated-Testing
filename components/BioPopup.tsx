import React from 'react';

interface BioPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const BioPopup: React.FC<BioPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-50 bg-black text-white px-10 py-5 rounded-xl flex flex-col items-center justify-center"
      style={{
        width: '80%',
        maxWidth: '300px',
        height: 'auto',
        backdropFilter: 'blur(5px)',  // Blur effect only on the popup
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
      }}
    >
      <div className="flex justify-between items-center w-full mb-4">
        <input
          type="text"
          placeholder="City"
          className="bg-transparent border-b border-gray-500 text-white w-full py-2 px-4"
        />
        <button className="ml-2">
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
            className="feather feather-search"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>

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
          onClick={onClose}  // Or you can change this to another action
          className="flex items-center justify-center px-4 py-5 rounded-full text-white"
          style={{
            fontSize: '28px',
            fontFamily: 'Montserrat, sans-serif',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          +
        </button>
      </div>

    </div>
  );
};

export default BioPopup;
