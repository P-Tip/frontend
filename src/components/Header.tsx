import React from 'react';
import Icon from './Icon'; 
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-left">
        {/* 로고가 들어갈 예정인 영역 */}
        <div className="logo-placeholder"></div>
      </div>
      <div className="header-right">
        <Icon type="bell" />
      </div>
    </header>
  );
};

export default Header;
