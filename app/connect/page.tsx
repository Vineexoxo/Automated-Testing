"use client"; // Add this line to mark the component as a Client Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '../../models/User';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Change the import to next/navigation
import { useSwipeable } from 'react-swipeable'; // For swipe functionality
import CopyLinkPopup from '../../components/copyLinkPopup';
import QRPopup from '../../components/QRPopup';
import UserDisplay from '../../components/UserDisplay';

const Page = () => {
  // State to manage the visibility of the pop-up
  const [showPopup, setShowPopup] = useState(false);
  const [showQRPopup, setShowQRPopup] = useState(false); // QR code popup state
  const [searchTerm, setSearchTerm] = useState(''); // State to manage search input
  const [activeIndex, setActiveIndex] = useState<number>(0); // 0: QR Code, 1: Scan QR
  const [scanMessage, setScanMessage] = useState(''); // State to manage scan messages
  const [clickedUser, setClickedUser] = useState<User | null>(null); // Track which user's icon was clicked
  const [inviteSent, setInviteSent] = useState(false);

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
    } else if (!inviteSent) {
      // Handle adding friend logic here (e.g., send invite)
      setInviteSent(true); // Example: Set invite sent state
      setClickedUser(user); // Set the clicked user
    }
  };

  return (
  <div className="flex flex-col min-h-screen w-full bg-[#292732] text-white">        <div className="flex-grow flex flex-col justify-between px-2 py-10 text-white ">
        <div className="flex-grow flex flex-col justify-between px-4 text-white ">
          {/* Title Section */}
          <div>
            <div className="text-[#E0631D] font-semibold text-center font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl"  style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Let's Connect
          </div>

          <div className="text-white text-center mt-2 sm:mt-4 md:mt-6 " style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              <p className="text-md md:text-xl lg:text-2xl">For the app to work, your friends need to be here too. Let's invite as many as possible!</p>
          </div>

          <div className="flex justify-center w-full mt-5 sm:mt-5 md:mt-7 lg:mt-9">
            <div className="flex space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 w-full max-w-4xl">
              {/* Copy Invite Link Button */}
              <button
                onClick={handleCopyLink}
                className="bg-[#00A886] text-white text-xs sm:text-s md:text-base lg:text-lg py-4 rounded-lg font-nunito w-full max-w-xs sm:max-w-sm lg:max-w-md min-w-[100px] sm:min-w-[150px] md:min-w-[200px] cursor-pointer"
              >
                Copy invite link
              </button>

              {/* Add by QR Code Button */}
              <button
                onClick={handleShowQRPopup}
                className="bg-[#00A886] text-white text-xs sm:text-s md:text-base lg:text-lg rounded-lg font-nunito py-3 sm:py-3 md:py-4 lg:py-5 w-full max-w-xs sm:max-w-sm lg:max-w-md min-w-[100px] sm:min-w-[150px] md:min-w-[200px] cursor-pointer"
              >
                Add by QR code
              </button>
            </div>
          </div>
          {/* Search Bar Section */}
        <div className="flex justify-center items-center mt-8 sm:mt-10 md:mt-10 lg:mt-12 " style={{ width: '100%', }}>
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
        <div>
          <UserDisplay users={filteredUsers} onIconClick={handleIconClick} clickedUser={clickedUser} />
        </div>

      </div>


      <div className="flex items-center  " >
      {/* Pop-Up Notification */}
      {showPopup && (
        <CopyLinkPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />

      )}

      {/* QR Code Popup with Swiping Functionality */}
      {showQRPopup && (
        <QRPopup
          isOpen={showQRPopup}
          onClose={handleCloseQRPopup}
          activeIndex={activeIndex}
          handlers={handlers}
        />
      )}
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
