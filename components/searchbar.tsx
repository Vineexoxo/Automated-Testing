import React from 'react';

interface SearchBarProps {
  inputValue: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ inputValue, onChange }) => {
  return (
    <div className="flex items-center w-full mt-3">
      {/* Search Input */}
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="City"
          value={inputValue}
          onChange={(e) => onChange(e.target.value)}
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
  );
};

export default SearchBar;
