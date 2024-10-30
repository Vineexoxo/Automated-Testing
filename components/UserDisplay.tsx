// components/UserDisplay.tsx

import React from 'react';
import { User } from '../models/User';

interface UserDisplayProps {
  users: User[];
  onIconClick: (user: User) => void;
  clickedUser?: User | null;
}

const UserDisplay: React.FC<UserDisplayProps> = ({ users, onIconClick, clickedUser }) => {
  return (
    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', width: '100%', height: '40%' }}>
      <div className="text-white text-center" style={{ fontFamily: 'Nunito Sans, sans-serif', width: '100%', maxWidth: '400px', padding: '1rem' }}>
        <ul
          style={{
            listStyleType: 'none',
            padding: 0,
            height: '200px', // Fixed height for scrollable list
            overflowY: 'scroll', // Enable vertical scrolling
            scrollbarWidth: 'none', // Hide scrollbar for Firefox
            width: '100%',
            textAlign: 'center',
          }}
        >
          {users.length > 0 ? (
            users.map((user, index) => (
              <li
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  textAlign: 'center',
                }}
              >
                <span style={{ marginRight: '8px' }}>{user.getFullName()}</span>
                <img
                  src="/userIcon.svg"
                  alt="User Icon"
                  style={{
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer',
                    marginLeft: '8px',
                    filter: clickedUser === user ? 'hue-rotate(240deg)' : 'none',
                    opacity: clickedUser === user ? 1 : 0.6,
                    transition: 'filter 0.3s, opacity 0.3s',
                  }}
                  onClick={() => onIconClick(user)}
                />
              </li>
            ))
          ) : (
            <li>No users found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserDisplay;