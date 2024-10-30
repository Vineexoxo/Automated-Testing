import React from 'react';

interface CopyLinkPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const CopyLinkPopup: React.FC<CopyLinkPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-40 bg-black text-white px-10 py-5 rounded-xl flex items-center justify-center"
      style={{
        width: '80%',
        maxWidth: '350px',
        height: 'auto',
        textAlign: 'center',
        backdropFilter: 'blur(5px)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div>
        Link copied!
      </div>
    </div>
  );
};

export default CopyLinkPopup;
