import React, { useEffect } from 'react';
import MainPage from './MainPage';
import './MainPage.css';

const Home: React.FC = () => {
  useEffect(() => {
    const currentHost = window.location.hostname;

    // www를 붙여서 리다이렉션
    if (currentHost === 'ptutip-e.kr') {
      const newUrl = `https://www.${currentHost}${window.location.pathname}${window.location.search}`;
      window.location.replace(newUrl);
      return; 
    }

    // 루트 경로에서 메인 페이지로 리다이렉션
    if (window.location.pathname === '/') {
      window.history.replaceState(null, '', '/MainPage');
    }
  }, []);

  return (
    <div>
      <MainPage />
    </div>
  );
};

export default Home;