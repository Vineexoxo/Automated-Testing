// components/userIcon.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

interface UserIconProps {
  user: string; // The username to display
  onClick: (user: string) => void; // Function to handle the click
}

const UserIcon: React.FC<UserIconProps> = ({ user, onClick }) => {
  const [iconColor, setIconColor] = useState('white'); // State for icon color
  const [isClicked, setIsClicked] = useState(false); // To track if the icon was clicked

  const handleIconClick = () => {
    onClick(user); // Call the onClick function passed from parent
    setIsClicked(true); // Set the icon as clicked
    setIconColor('#6B18D8'); // Change color on click

    // Revert color back to white after 300 milliseconds
    setTimeout(() => {
      setIsClicked(false);
      setIconColor('white'); // Reset to white
    }, 300);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
      <span>{user}</span>
      <FontAwesomeIcon
        icon={faUserPlus} // Use the user icon
        style={{
          cursor: 'pointer',
          fill: iconColor, // Use the state for the icon color
          marginLeft: '1rem',
          transition: 'fill 0.3s ease', // Smooth transition
        }}
        onClick={handleIconClick} // Handle icon click
        onMouseEnter={() => !isClicked && setIconColor('#6B18D8')} // Change color on hover if not clicked
        onMouseLeave={() => !isClicked && setIconColor('white')} // Revert color when not hovering if not clicked
      />
    </div>
  );
};

export default UserIcon;
