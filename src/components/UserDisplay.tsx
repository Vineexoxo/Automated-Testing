// components/UserDisplay.tsx

import React from 'react';
import { User } from '@prisma/client';

interface UserDisplayProps {
  users: User[];
  onIconClick: (user: User) => void;
  friendRequests: Set<string>;
}

const UserDisplay: React.FC<UserDisplayProps> = ({ users, onIconClick, friendRequests }) => {
  const getFullName = (user: User) => {
    return [user.firstName, user.lastName].filter(Boolean).join(' ') || 'Unnamed User';
  };

  return (
    <div className="mt-8 space-y-4 max-w-2xl mx-auto">
      {users.map((user) => (
        <div 
          key={user.id} 
          className="flex items-center justify-between p-4 bg-[#363241] rounded-lg"
        >
          <div className="flex items-center space-x-4">
            <img
              src={user.imageUrl || "/userIcon.svg"}
              alt={getFullName(user)}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="text-white font-semibold">{getFullName(user)}</h3>
              <p className="text-gray-400 text-sm">@{user.username}</p>
              {user.occupation && (
                <p className="text-gray-400 text-sm">{user.occupation}</p>
              )}
            </div>
          </div>
          <button
            onClick={() => onIconClick(user)}
            className={`px-4 py-2 rounded-lg ${
              friendRequests.has(user.id)
                ? 'bg-gray-500 text-white cursor-not-allowed'
                : 'bg-[#00A886] text-white hover:bg-[#008c70]'
            }`}
            disabled={friendRequests.has(user.id)}
          >
            {friendRequests.has(user.id) ? 'Request Sent' : 'Add Friend'}
          </button>
        </div>
      ))}
      {users.length === 0 && (
        <div className="text-center text-gray-400">No users found</div>
      )}
    </div>
  );
};

export default UserDisplay;