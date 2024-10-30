import React, { useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import US_States_and_Cities from '../src/assets/US_States_and_Cities.json';

interface SearchBarProps {
  inputValue: string;
  emoji: string;
  onChange: (value: string, emoji: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ inputValue, emoji, onChange }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleInputChange = (value: string) => {
    onChange(value, emoji);

    const allCities = Object.values(US_States_and_Cities).flat();
    const filteredSuggestions = allCities.filter((city) =>
      city.toLowerCase().startsWith(value.toLowerCase())
    );

    setSuggestions(value ? filteredSuggestions : []);
  };

  const handleSuggestionClick = (city: string) => {
    onChange(city, emoji);
    setSuggestions([]);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const newEmoji = emojiData.emoji;
    onChange(inputValue, newEmoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex items-center w-full mt-3 relative">
      <div className="relative flex-grow">
        <input
          id="searchInput"
          type="text"
          placeholder="City"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          className="bg-transparent border border-gray-300 text-white w-full py-2 px-4 rounded-md focus:outline-none"
          style={{
            borderColor: 'rgba(255, 255, 255, 255)',
            borderRadius: '8px',
          }}
        />
        {!inputValue && (
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
        )}
      </div>

      <div className="relative">
        <button
          className="ml-4 bg-transparent border border-gray-300 p-2 rounded-md flex justify-center items-center focus:outline-none"
          style={{
            borderColor: 'rgba(255, 255, 255, 255)',
            borderRadius: '8px',
            width: '55px',
          }}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          {emoji ? (
            <span className="text-2xl">{emoji}</span>
          ) : (
            <img src="/smile.svg" alt="Smile icon" className="w-6 h-6" />
          )}
        </button>
        {showEmojiPicker && (
          <div className="absolute right-0 mt-2" style={{ zIndex: 1000 }}>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>

      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white text-black rounded-lg mt-1 z-50">
          {suggestions.map((city, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSuggestionClick(city)}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;