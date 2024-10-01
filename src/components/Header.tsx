import React from 'react';
import Icon from './Icon'; // Icon 컴포넌트 import
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      {/* 왼쪽에 큰 아이콘 */}
      <div className="header-left">
        <Icon type="home" size="large" />
      </div>

      {/* 오른쪽에 두 개의 작은 아이콘 */}
      <div className="header-right">
        <Icon type="bell" size="small" />
        <Icon type="user" size="small" />
      </div>
    </header>
  );
};

export default Header;
