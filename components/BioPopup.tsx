import React, { useState, useEffect } from 'react';
import SearchBar from './searchbar';

interface BioPopupProps {
  isOpen: boolean;
  onClose: () => void;
  addCityEmoji: (city: string, emoji: string) => void;
  cityEmojis: { city: string; emoji: string }[];
}

const BioPopup: React.FC<BioPopupProps> = ({ isOpen, onClose, addCityEmoji, cityEmojis }) => {
  const [searchBars, setSearchBars] = useState<{ city: string; emoji: string }[]>([{ city: '', emoji: '' }]);

  useEffect(() => {
    if (cityEmojis.length > 0) {
      setSearchBars(cityEmojis);
    }
  }, [cityEmojis]);

  if (!isOpen) return null;

  const addSearchBar = () => {
    setSearchBars([...searchBars, { city: '', emoji: '' }]);
  };

  const handleInputChange = (index: number, city: string, emoji: string) => {
    const newSearchBars = [...searchBars];
    newSearchBars[index] = { city, emoji };
    setSearchBars(newSearchBars);
  };

  const handleSave = () => {
    cityEmojis.forEach(() => addCityEmoji('', ''));
    
    searchBars.forEach((bar) => {
      if (bar.city.trim()) {
        addCityEmoji(bar.city.trim(), bar.emoji);
      }
    });
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-60 bg-black text-white px-10 py-5 rounded-xl flex flex-col z-60"
        style={{
          width: '80vw',
          maxWidth: '600px',
          minWidth: '300px',
          height: '300px',
          maxHeight: '90vh',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
          zIndex: 60,
          overflowY: 'auto',
        }}
      >
        {searchBars.map((bar, index) => (
          <SearchBar
            key={index}
            inputValue={bar.city}
            emoji={bar.emoji}
            onChange={(city, emoji) => handleInputChange(index, city, emoji)}
          />
        ))}

        <div className="flex-grow"></div>

        <div className="flex justify-center items-center mt-4 gap-2">
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 px-4 py-1 rounded-full border border-white text-white"
            style={{
              fontSize: '14px',
              fontFamily: 'Montserrat, sans-serif',
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
          >
            Save
          </button>
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
            onClick={addSearchBar}
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