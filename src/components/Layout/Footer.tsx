// components/layout/Footer.tsx
import React from 'react';
import Icon from '../Icon/Icon';
import './Footer.css';
import { useRouter } from 'next/router';

const Footer: React.FC = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <footer className="footer">
      <nav className="nav-bar">
        <div className="nav-item">
          <Icon
            type="home"
            isSelected={currentPath === '/'}
            onClick={() => router.push('/')}
          />
          <span className="nav-label">홈</span>
        </div>
        <div className="nav-item">
          <Icon
            type="money"
            isSelected={currentPath === '/Scholarship'}
            onClick={() => router.push('/Scholarship')}
          />
          <span className="nav-label">솔선수범</span>
        </div>
        <div className="nav-item">
          <Icon
            type="reminder"
            isSelected={currentPath === '/To-Do'}
            onClick={() => router.push('/To-Do')}
          />
          <span className="nav-label">To Do</span>
        </div>
        <div className="nav-item">
          <Icon
            type="mypage"
            isSelected={currentPath === '/MyPage'}
            onClick={() => console.log('My Page clicked')}
          />
          <span className="nav-label">MY</span>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;