"use client"; // Add this line to mark the component as a Client Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '../../models/User';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Change the import to next/navigation
import { useSwipeable } from 'react-swipeable'; // For swipe functionality
import RemoveFriend from '../../components/RemoveFriend'; // Adjust the import path as necessary


const Page = () => {
  // State to manage the visibility of the pop-up
  const [showPopup, setShowPopup] = useState(false);
  const [showQRPopup, setShowQRPopup] = useState(false); // QR code popup state
  const [searchTerm, setSearchTerm] = useState(''); // State to manage search input
  const [activeIndex, setActiveIndex] = useState<number>(0); // 0: QR Code, 1: Scan QR
  const [scanMessage, setScanMessage] = useState(''); // State to manage scan messages
  const [clickedUser, setClickedUser] = useState<User | null>(null); // Track which user's icon was clicked
  const [inviteSent, setInviteSent] = useState(false);
  const [removingUser, setRemovingUser] = useState<User | null>(null);

  const router = useRouter();

  const handleStartStriiding = () => {
    router.push('/get-started'); // Navigate to /get-started
  };

  // Function to handle copying the link
  const handleCopyLink = () => {
    // Your logic to copy the link (you can use navigator.clipboard API)
    navigator.clipboard.writeText("Your invite lionk here").then(() => {
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

    // Swipe handlers for qrcode pop up
  const handlers = useSwipeable({
      onSwipedLeft: () => setActiveIndex(1),  // Swiping left will switch to scanner
      onSwipedRight: () => setActiveIndex(0), // Swiping right will switch back to QR code
      trackMouse: true,
  });
  //next page contents
  // Sample users for demonstration
  // Sample user objects for demonstration
  const users: User[] = [
    new User('Alice', 'Smith'),
    new User('Bob', 'Johnson'),
    new User('Charlie', 'Brown'),
    new User('Diana', 'Prince'),
    new User('Ethan', 'Hunt'),
    new User('Fiona', 'Apple'),
    new User('George', 'Costanza'),
    new User('Hannah', 'Montana'),
    new User('Isaac', 'Newton'),
    new User('Julia', 'Roberts'),
    new User('Kevin', 'Bacon'),
  ];
  
    // Filtered users based on the search term
    const filteredUsers = users.filter(user => 
      user.getFullName().toLowerCase().includes(searchTerm.toLowerCase())
    );

  //adding friends
  
  const handleIconClick = (user: User) => {
    if (inviteSent && clickedUser === user) {
      // If an invite is sent and the same icon is clicked again, show the confirmation popup
      setRemovingUser(user);
    } else if (!inviteSent) {
      // Handle adding friend logic here (e.g., send invite)
      setInviteSent(true); // Example: Set invite sent state
      setClickedUser(user); // Set the clicked user
    }
  };

  return (
  <div className="flex flex-col min-h-screen w-full bg-[#292732] text-white">        <div className="flex-grow flex flex-col justify-between px-2 py-10 text-white ">
        <div className="flex-grow flex flex-col justify-between px-2 text-white ">
          {/* Title Section */}
          <div>
            <div className="text-[#E0631D] font-semibold text-center font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl"  style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Let's Connect
          </div>

          <div className="text-white text-center mt-2 sm:mt-4 md:mt-6 " style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              <p className="text-md md:text-xl lg:text-2xl">For the app to work, your friends need to be here too. Let's invite as many as possible!</p>
          </div>
        </div>


      <div className="flex justify-center items-center mb-5 sm:mb-6 md:mb-8 lg:mb-9 " >
        <div className="flex justify-center space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 w-full max-w-4xl px-4 ">
          {/* Copy Invite Link Button */}
          <button
            onClick={handleCopyLink} // Attach the click handler
            className="bg-[#00A886] text-white text-xs sm:text-s md:text-base lg:text-lg rounded-lg font-nunito py-3 sm:py-3 md:py-4 lg:py-5 w-full max-w-xs sm:max-w-sm lg:max-w-md min-w-[100px] sm:min-w-[150px] md:min-w-[200px] cursor-pointer"
          >
            Copy invite link
          </button>

          {/* Add by QR Code Button */}
          <button
            onClick={handleShowQRPopup} // Attach the click handler to open QR code popup
            className="bg-[#00A886] text-white text-xs sm:text-s md:text-base lg:text-lg rounded-lg font-nunitopy-3 sm:py-3 md:py-4 lg:py-5 w-full max-w-xs sm:max-w-sm lg:max-w-md min-w-[100px] sm:min-w-[150px] md:min-w-[200px] cursor-pointer"
          >
            Add by QR code
          </button>
        </div>


    {/* Pop-Up Notification */}
    {showPopup && (
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-40 bg-black text-white px-10 py-5 rounded-xl flex items-center justify-center"
        style={{
          width: '80%', // Use percentage for responsive width
          maxWidth: '350px', // Set a max width
          height: 'auto', // Allow height to adjust based on content
          textAlign: 'center',
          backdropFilter: 'blur(5px)', // Add blur for background
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)', // Shadow effect
        }}
      >
        Link copied!
      </div>
    )}

    {/* QR Code Popup with Swiping Functionality */}
    {showQRPopup && (
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-40 bg-black text-white px-10 py-5 rounded-xl flex flex-col items-center justify-center"
        style={{
          width: '80%', // Use percentage for responsive width
          maxWidth: '300px', // Set a max width
          height: 'auto', // Allow height to adjust based on content
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
              style={{ width: '80%', maxWidth: '200px', height: 'auto', marginBottom: '1rem' }} // Make QR code responsive
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
            top: '10px', // Position from the top
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
            width: '100%', // Make button full width
            maxWidth: '200px', // Set a max width for the close button
          }}
        >
          Close
        </button>
      </div>
    )}
  </div>



  {/* Search Bar Section */}
  <div className="flex justify-center items-center" style={{ width: '100%'}}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
            <input
              type="text"
              placeholder="Search with first or last name"
              value={searchTerm} // Set the input value to searchTerm
              onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
              style={{
                padding: '1rem',
                width: '100%', // Change to 100% for responsiveness
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
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', width: '100%', height:'40%'}}>
          <div className="text-white text-center" style={{ fontFamily: 'Nunito Sans, sans-serif', width: '100%', maxWidth: '400px', padding: '1rem' }}>
            <ul
              style={{
                listStyleType: 'none',
                padding: 0,
                height: '200px', // Set a fixed height for scrollable list
                overflowY: 'scroll', // Enable vertical scrolling
                scrollbarWidth: 'none', // Hide scrollbar for Firefox
                width: '100%', // Use 100% width for responsiveness
                textAlign: 'center', // Center text inside the list
              }}
            >
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <li
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem', // Space between each user entry
                      textAlign: 'center', // Center text for each user entry
                    }}
                  >
                    <span style={{ marginRight: '8px' }}>{user.getFullName()}</span> {/* Add margin to the right */}
                    <img
                      src="/userIcon.svg" // Single image used for the icon
                      alt="User Icon"
                      style={{
                        width: '24px', // Set the width of the icon
                        height: '24px', // Set the height of the icon
                        cursor: 'pointer',
                        marginLeft: '8px', // Add margin to the left of the icon
                        filter: clickedUser === user ? 'hue-rotate(240deg)' : 'none', // Change color to purple when clicked
                        opacity: clickedUser === user ? 1 : 0.6, // Optionally adjust opacity for a visual effect
                        transition: 'filter 0.3s, opacity 0.3s', // Smooth transition
                      }}
                      onClick={() => handleIconClick(user)} // Handle icon click
                    />
                  </li>
                ))
              ) : (
                <li>No users found</li>
              )}
            </ul>
          </div>
        </div>


        {/* Start Striiding Button */}
        <div className="flex justify-center" style={{marginBottom:'1rem' }}>
          <button
          onClick={handleStartStriiding}
            style={{
              
              backgroundColor: '#6B18D8',
              color: 'white',
              padding: '1rem 7rem',
              fontSize: '14px',
              borderRadius: '8px',
              fontFamily: 'Montserrat, sans-serif',
              cursor: 'pointer',
              border: 'none',
              // maxWidth:'50rem',
              // minWidth:'30rem',
            }}
          >
            Start Striiding!
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Page;
