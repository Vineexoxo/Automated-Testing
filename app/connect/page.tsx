"use client"; // Add this line to mark the component as a Client Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Change the import to next/navigation
import { useSwipeable } from 'react-swipeable'; // For swipe functionality
import { Html5QrcodeScanner } from 'html5-qrcode';
import QrScanner from '../../components/QrScanner';
const Page = () => {
  // State to manage the visibility of the pop-up
  const [showPopup, setShowPopup] = useState(false);
  const [showQRPopup, setShowQRPopup] = useState(false); // QR code popup state
  const [searchTerm, setSearchTerm] = useState(''); // State to manage search input
  const [activeIndex, setActiveIndex] = useState<number>(0); // 0: QR Code, 1: Scan QR
  const [scanMessage, setScanMessage] = useState(''); // State to manage scan messages

  // Function to handle copying the link
  const handleCopyLink = () => {
    // Your logic to copy the link (you can use navigator.clipboard API)
    navigator.clipboard.writeText("Your invite link here").then(() => {
      setShowPopup(true); // Show the pop-up
      setTimeout(() => {
        setShowPopup(false); // Hide the pop-up after 2 seconds
      }, 2000);
    });
  };

  // Function to handle showing the QR code popup
  const handleShowQRPopup = () => {
    setShowQRPopup(true); // Show QR code popup
  };


  // Function to close the QR code popup
  const handleCloseQRPopup = () => {
    setShowQRPopup(false);
    setActiveIndex(0); // Reset to the QR Code view if needed
    setScanMessage(''); // Reset the scan message
  };
  const handleScanSuccess = (decodedText: string) => {
    setScanMessage("Scan successful: " + decodedText); // Set success message
  };

  const handleScanError = (errorMessage: string) => {
    setScanMessage("Incorrect QR code."); // Set error message
  };

    // Swipe handlers
  const handlers = useSwipeable({
      onSwipedLeft: () => setActiveIndex(1),  // Swiping left will switch to scanner
      onSwipedRight: () => setActiveIndex(0), // Swiping right will switch back to QR code
      trackMouse: true,
  });

  // Sample users for demonstration
  const users = ['User 1', 'User 2', 'User 3', 'Alice', 'Bob']; // Add more users as needed

  // Filtered users based on the search term
  const filteredUsers = users.filter(user => user.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex flex-col h-screen bg-[#292732] text-white px-4">
      <div style={{ marginTop: '2rem' }}>
        <div
          className="text-[#E0631D] font-semibold text-[24px] text-center" // Center alignment
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Let's Connect
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <div className="text-white text-center" style={{ fontFamily: 'Nunito Sans, sans-serif', paddingLeft: '3rem', paddingRight: '3rem' }}>
          <div>Looks like none of your contacts is on Striide yet, let's bring them onboard!</div>
        </div>
      </div>

      <div className="flex justify-center items-center" style={{ marginTop: '2rem' }}>
        <button
          className="content-div-3"
          onClick={handleCopyLink} // Attach the click handler
          style={{
            backgroundColor: '#00A886',
            color: 'white',
            padding: '1.24rem 2.9rem',
            fontSize: '13px',
            borderRadius: '8px',
            fontFamily: 'Nunito Sans, sans-serif',
            cursor: 'pointer',
            border: 'none',
            marginRight: '1.2rem', // Adds space between the buttons
          }}
        >
          Copy invite link
        </button>
              {/* Pop-Up Notification */}
      {showPopup && (
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-40 bg-black text-white px-10 py-5 rounded-xl flex items-center justify-center"
          style={{
            width: '350px',
            height: '100px',
            textAlign: 'center',
            backdropFilter: 'blur(5px)', // Add blur for background
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)', // Shadow effect
          }}
        >
          Link copied!
        </div>
      )}

        <div>
        <button
          className="content-div-4"
          onClick={handleShowQRPopup} // Attach the click handler to open QR code popup
          style={{
            backgroundColor: '#00A886',
            color: 'white',
            padding: '1.24rem 2.9rem',
            fontSize: '13px',
            borderRadius: '8px',
            fontFamily: 'Nunito Sans, sans-serif',
            cursor: 'pointer',
            border: 'none',
          }}
        >
          Add by QR code
        </button>
        </div>
        {/* QR Code Popup with Swiping Functionality */}
        {showQRPopup && (
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-40 bg-black text-white px-10 py-5 rounded-xl flex flex-col items-center justify-center"
            style={{
              width: '300px',
              height: '450px',
              backdropFilter: 'blur(5px)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
              zIndex: 1000, // Set higher z-index for the popup
            }}
            {...handlers} // Adding swipe handlers
          >
            {activeIndex === 0 && (
              <div className="flex flex-col items-center">
                <h3 className="text-center" style={{ marginBottom: '1rem' }}>QR Code</h3>
                {/* Placeholder for QR Code Image */}
                <img
                  src="your-qr-code-url-here" // Replace with your actual QR code URL
                  alt="QR Code"
                  style={{ width: '200px', height: '200px', marginBottom: '1rem' }}
                />
                <div className="text-center" style={{ fontSize: '14px', marginBottom: '1.5rem' }}>
                  Swipe left to add by scanning their QR code
                </div>
              </div>
            )}
            
            {activeIndex === 1 && (
              <div className="flex flex-col items-center">
                <h3 className="text-center" style={{ marginBottom: '1rem' }}>Scanner Option</h3>
                {/* Integrate QrScanner component here */}
                {/* <QrScanner setScanMessage={setScanMessage} onClose={handleCloseQRPopup} /> */}
                {scanMessage && <div className="mt-2 text-center">{scanMessage}</div>} {/* Display scan message */}
                <div className="text-center" style={{ fontSize: '14px', marginBottom: '1.5rem' }}>
                  Point your camera at a QR code to scan
                </div>
              </div>
            )}
            {/* Orange Bar */}
            <div
              style={{
                position: 'absolute', // Positioning it absolutely
                top: ' 10px', // Position from the top
                left: activeIndex === 0 ? '30%' : activeIndex === 1 ? '50%' : '20%', // Adjust left based on activeIndex
                width: '50px', // Width of the orange bar
                height: '8px', // Height of the orange bar
                backgroundColor: '#FF6F20', // Orange color
                borderRadius: '4px', // Optional: rounded corners
                transition: 'left 0.3s ease', // Smooth transition for movement
              }}
            />

            {/* Close Button */}
            <button
              onClick={handleCloseQRPopup}
              style={{
                backgroundColor: '#6B18D8',
                color: 'white',
                padding: '0.8rem 3rem',
                fontSize: '14px',
                borderRadius: '8px',
                fontFamily: 'Montserrat, sans-serif',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              Close
            </button>
          </div>
        )}

        
      </div>

      <div className="flex justify-center items-center" style={{ marginTop: '2rem', marginRight: '1.5rem', marginLeft: '1.5rem' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
          <input
            type="text"
            placeholder="Search with first or last name"
            value={searchTerm} // Set the input value to searchTerm
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
            style={{
              padding: '1rem',
              width: '100%',
              paddingRight: '3rem', // Space for the icon
              borderRadius: '8px',
              border: '0.3px solid #9E88B2',
              fontSize: '14px',
              fontFamily: 'Nunito Sans, sans-serif',
              backgroundColor: 'transparent',
              color: '#9E88B2',
            }}
          />
          {/* Magnifying glass icon */}
          <FontAwesomeIcon
            icon={faSearch}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9E88B2',
            }}
          />
        </div>
      </div>

      {/* Users Display Section */}
      <div style={{ marginTop: '1rem' }}>
      <div className="text-white text-center" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
        <div style={{ padding: '1rem', border: 'none', backgroundColor: '#292732' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Users:</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{user}</span>
                  <FontAwesomeIcon
                    icon={faUserPlus} // Use the user icon
                    style={{
                      cursor: 'pointer',
                      fill: 'white',
                      marginLeft: '1rem', // Space between user name and icon
                    }}
                    onClick={() => console.log(`User clicked: ${user}`)} // Handle icon click
                    onMouseEnter={(e) => (e.currentTarget.style.fill = '#6B18D8')} // Change color on hover
                    onMouseLeave={(e) => (e.currentTarget.style.fill = 'white')} // Revert color when not hovering
                  />
                </li>
              ))
            ) : (
              <li>No users found</li>
            )}
          </ul>
        </div>
      </div>
    </div>

      {/* Start Striiding Button */}
      <div className="flex justify-center" style={{ marginTop: '12rem' }}>
        <button
          style={{
            backgroundColor: '#6B18D8',
            color: 'white',
            padding: '1rem 7rem',
            fontSize: '14px',
            borderRadius: '8px',
            fontFamily: 'Montserrat, sans-serif',
            cursor: 'pointer',
            border: 'none',
          }}
        >
          Start Striiding!
        </button>
      </div>
    </div>
  );
};

export default Page;
