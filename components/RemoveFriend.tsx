import React from 'react';
import { User } from '../models/User'
interface RemoveFriendProps {
  onConfirm: () => void;
  onCancel: () => void;
  user: User; 
}

const RemoveFriend: React.FC<RemoveFriendProps> = ({ onConfirm, onCancel, user }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)', 
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
    }}>
      <p style={{ marginBottom: '1rem' }}>
        Are you sure you want to remove {user.getFullName()} as a friend?
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onConfirm} style={{
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '10px 15px',
          cursor: 'pointer',
        }}>
          Confirm
        </button>
        <button onClick={onCancel} style={{
          backgroundColor: 'lightgray',
          border: 'none',
          borderRadius: '4px',
          padding: '10px 15px',
          cursor: 'pointer',
        }}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RemoveFriend;
