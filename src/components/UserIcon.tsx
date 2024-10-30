import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

interface UserIconProps {
  user: string; 
  onClick: (user: string) => void; 
}

const UserIcon: React.FC<UserIconProps> = ({ user, onClick }) => {
  const [iconColor, setIconColor] = useState('white');
  const [isClicked, setIsClicked] = useState(false);

  const handleIconClick = () => {
    onClick(user); 
    setIsClicked(true); 
    setIconColor('#6B18D8'); 

    
    setTimeout(() => {
      setIsClicked(false);
      setIconColor('white'); 
    }, 300);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
      <span>{user}</span>
      <FontAwesomeIcon
        icon={faUserPlus} 
        style={{
          cursor: 'pointer',
          fill: iconColor, 
          marginLeft: '1rem',
          transition: 'fill 0.3s ease',
        }}
        onClick={handleIconClick} 
        onMouseEnter={() => !isClicked && setIconColor('#6B18D8')} 
        onMouseLeave={() => !isClicked && setIconColor('white')} 
      />
    </div>
  );
};

export default UserIcon;
