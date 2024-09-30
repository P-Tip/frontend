import React from 'react';
import './Header.css';
import { FaHome, FaBell, FaUser } from 'react-icons/fa'; // 예시 아이콘들

const Header: React.FC = () => {
  return (
    <header className="header">
      {/* 왼쪽에 큰 아이콘 */}
      <div className="header-left">
        <FaHome data-testid="large-icon" className="header-icon large-icon" />
      </div>

      {/* 오른쪽에 두 개의 작은 아이콘 */}
      <div className="header-right">
        <FaBell data-testid="small-icon" className="header-icon small-icon" />
        <FaUser data-testid="small-icon" className="header-icon small-icon" />
      </div>
    </header>
  );
};

export default Header;
