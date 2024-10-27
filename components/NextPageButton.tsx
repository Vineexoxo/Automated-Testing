import React from 'react';

interface NextPageButtonProps {
  handleNextPage: () => void;
}

const NextPageButton: React.FC<NextPageButtonProps> = ({ handleNextPage }) => {
  return (
    <div className="flex justify-end" style={{ marginBottom: '1rem', paddingRight: '1rem' }}>
      <div className="flex -space-x-8">
        {[0.6, 0.8, 1].map((opacity, index) => (
          <div key={index} onClick={handleNextPage} className="cursor-pointer">
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300 hover:scale-110">
              <path
                d="M8 4l8 8-8 8"
                stroke={`rgba(255, 255, 255, ${opacity})`}
                strokeWidth="2"
                strokeLinecap="round"
                className="transition-all duration-300" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextPageButton;
