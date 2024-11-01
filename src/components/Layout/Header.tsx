// components/layout/Header.tsx
import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import NotificationPopup from '../notification/NotificationPopup';
import './Header.css';

const Header: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleBellClick = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo-placeholder"></div>
      </div>
      <div className="header-right">
        <Icon type="bell" onClick={handleBellClick} />
      </div>
      {isPopupVisible && <NotificationPopup onClose={closePopup} />}
    </header>
  );
};

export default Header;
