import React, { useState } from 'react';
import RemoveFriend from './RemoveFriend'; 
import { User } from '@prisma/client'; 

interface FriendManagerProps {
  users: User[];
}

const FriendManager: React.FC<FriendManagerProps> = ({ users }) => {
  const [clickedUser, setClickedUser] = useState<User | null>(null);
  const [inviteSent, setInviteSent] = useState(false);
  const [removingUser, setRemovingUser] = useState(false);

  const getFullName = (user: User): string => {
    return [user.firstName, user.lastName].filter(Boolean).join(' ') || 'Unnamed User';
  };

  const handleIconClick = (user: User) => {
    if (clickedUser === user) {
      setRemovingUser(true);
    } else {
      setClickedUser(user);
      setInviteSent(true);
    }
  };

  const handleConfirmRemove = () => {
    console.log(`Removing ${clickedUser ? getFullName(clickedUser) : 'user'}`);
    setRemovingUser(false);
    setClickedUser(null);
  };

  const handleCancelRemove = () => {
    setRemovingUser(false);
  };

  return (
    <div style={{ marginTop: '1rem', width: '200px', height: '320px', display: 'flex', justifyContent: 'center' }}>
      <div className="text-white text-center">
        <div style={{ padding: '1rem', border: 'none' }}>
          <ul
            style={{
              listStyleType: 'none',
              padding: 0,
              height: '200px',
              overflowY: 'scroll',
              scrollbarWidth: 'none',
              width: '380px',
              textAlign: 'center',
            }}
          >
            {users.length > 0 ? (
              users.map((user) => (
                <li
                  key={user.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    textAlign: 'center',
                  }}
                >
                  <span style={{ marginRight: '8px' }}>{getFullName(user)}</span>
                  <img
                    src={clickedUser === user ? "/add-friend-filled.svg" : "/userIcon.svg"}
                    alt="User Icon"
                    style={{
                      width: '24px',
                      height: '24px',
                      cursor: 'pointer',
                      marginLeft: '8px',
                    }}
                    onClick={() => handleIconClick(user)}
                  />
                </li>
              ))
            ) : (
              <li>No users found</li>
            )}
          </ul>
        </div>
        {inviteSent && (
          <div style={{ width: '100%', textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ color: 'white' }}>
              Your friends have been sent an invite!
            </p>
          </div>
        )}
      </div>
      {removingUser && clickedUser && (
        <RemoveFriend
          onConfirm={handleConfirmRemove}
          onCancel={handleCancelRemove}
          user={clickedUser}
        />
      )}
    </div>
  );
};

export default FriendManager;
