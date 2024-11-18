// components/layout/Header.tsx
import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import NotificationPopup from '../Notification/NotificationPopup';
import { getLogoImage } from '../../utils/ImageUtils';
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
        <div className="logo-placeholder">
          {getLogoImage('main', '피팁 로고')} {/* 로고 삽입 */}
        </div>
      </div>
      <div className="header-right">
        <Icon type="bell" onClick={handleBellClick} />
      </div>
      {isPopupVisible && <NotificationPopup onClose={closePopup} />}
    </header>
  );
};

export default Header;
