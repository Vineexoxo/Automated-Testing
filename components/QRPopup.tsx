import React from 'react';

interface QRPopupProps {
  isOpen: boolean;
  onClose: () => void;
  activeIndex: number;
  handlers: any; // Assuming swipe handlers from your previous implementation
  scanMessage?: string;
  setScanMessage?: (message: string) => void;
}

const QRPopup: React.FC<QRPopupProps> = ({
  isOpen,
  onClose,
  activeIndex,
  handlers,
  scanMessage,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-40 bg-black text-white px-10 py-5 rounded-xl flex flex-col items-center justify-center"
      style={{
        width: '80%',
        maxWidth: '300px',
        height: 'auto',
        backdropFilter: 'blur(5px)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
      }}
      {...handlers} // Adding swipe handlers
    >
      {activeIndex === 0 && (
        <div className="flex flex-col items-center">
          <h3 className="text-center" style={{ marginBottom: '1rem' }}>QR Code</h3>
          <img
            src="your-qr-code-url-here" // Replace with your actual QR code URL
            alt="QR Code"
            style={{ width: '80%', maxWidth: '200px', height: 'auto', marginBottom: '1rem' }}
          />
          <div className="text-center" style={{ fontSize: '14px', marginBottom: '1.5rem' }}>
            Swipe left to add by scanning their QR code
          </div>
        </div>
      )}

      {activeIndex === 1 && (
        <div className="flex flex-col items-center">
          <h3 className="text-center" style={{ marginBottom: '1rem' }}>Scanner Option</h3>
          {/* You can integrate QrScanner component here */}
          {scanMessage && <div className="mt-2 text-center">{scanMessage}</div>}
          <div className="text-center" style={{ fontSize: '14px', marginBottom: '1.5rem' }}>
            Point your camera at a QR code to scan
          </div>
        </div>
      )}

      {/* Orange Bar */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: activeIndex === 0 ? '30%' : '50%',
          width: '50px',
          height: '8px',
          backgroundColor: '#FF6F20',
          borderRadius: '4px',
          transition: 'left 0.3s ease',
        }}
      />

      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          backgroundColor: '#6B18D8',
          color: 'white',
          padding: '0.8rem 3rem',
          fontSize: '14px',
          borderRadius: '8px',
          fontFamily: 'Montserrat, sans-serif',
          cursor: 'pointer',
          border: 'none',
          width: '100%',
          maxWidth: '200px',
        }}
      >
        Close
      </button>
    </div>
  );
};

export default QRPopup;
