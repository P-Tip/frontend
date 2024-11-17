// components/layout/Footer.tsx
import React from 'react';
import Icon from '../Icon/Icon';
import './Footer.css';
import { useRouter } from 'next/router';

const Footer: React.FC = () => {
  const router = useRouter();

  return (
    <footer className="footer">
      <nav className="nav-bar">
        <div className="nav-item">
          <Icon
            type="home"
            onClick={() => router.push('/')}
          />
          <span className="nav-label">홈</span>
        </div>
        <div className="nav-item">
          <Icon
            type="money"
            onClick={() => router.push('/Scholarship')}
          />
          <span className="nav-label">솔선수범</span>
        </div>
        <div className="nav-item">
          <Icon
            type="reminder"
            onClick={() => console.log('Reminder clicked')}
          />
          <span className="nav-label">To Do</span>
        </div>
        <div className="nav-item">
          <Icon
            type="mypage"
            onClick={() => console.log('My Page clicked')}
          />
          <span className="nav-label">MY</span>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;