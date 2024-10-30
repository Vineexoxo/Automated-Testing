"use client";
import { useUser } from "@clerk/nextjs";
import { User } from '@prisma/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CopyLinkPopup from '@/components/CopyLinkPopup';
import QRPopup from '@/components/QRPopup';
import UserDisplay from '@/components/UserDisplay';

const Page = () => {
  const { user: clerkUser } = useUser();
  const [showPopup, setShowPopup] = useState(false);
  const [showQRPopup, setShowQRPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [scanMessage, setScanMessage] = useState('');
  const [clickedUser, setClickedUser] = useState<User | null>(null);
  const [inviteSent, setInviteSent] = useState(false);

  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [friendRequests, setFriendRequests] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (clerkUser) {
      fetchUsers();
    }
  }, [clerkUser]);

  const handleStartStriiding = () => {
    router.push('/get-started');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("Your invite lionk here").then(() => {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    });
  };

  const handleShowQRPopup = () => {
    setShowQRPopup(true);
  };

  const handleCloseQRPopup = () => {
    setShowQRPopup(false);
    setActiveIndex(0);
    setScanMessage('');
  };

  const handleSendFriendRequest = async (targetUser: User) => {
    if (!clerkUser || friendRequests.has(targetUser.id)) return;

    try {
      const response = await fetch('/api/friend-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiverId: targetUser.id,
        }),
      });

      if (response.ok) {
        setFriendRequests(prev => new Set(prev).add(targetUser.id));
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#292732] text-white">
      <div className="flex-grow flex flex-col justify-between px-2 py-10 text-white">
        <div className="flex-grow flex flex-col justify-between px-4 text-white">
          {/* Title Section */}
          <div>
            <div className="text-[#E0631D] font-semibold text-center font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Let's Connect
            </div>

            <div className="text-white text-center mt-2 sm:mt-4 md:mt-6" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
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
            <div className="flex justify-center items-center mt-8 sm:mt-10 md:mt-10 lg:mt-12" style={{ width: '100%', }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
                <input
                  type="text"
                  placeholder="Search with first or last name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: '1rem',
                    width: '100%',
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
            <div className="flex-grow px-4">
              <UserDisplay 
                users={filteredUsers}
                onIconClick={handleSendFriendRequest}
                friendRequests={friendRequests}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center">
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
            inviteLink="your-invite-link-here"
          />
        )}
      </div>

      {/* Start Striiding Button */}
      <div className="flex justify-center" style={{ marginBottom: '1rem' }}>
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
  );
};

export default Page;