import React, { useEffect } from 'react';
import MainPage from './MainPage';
import './MainPage.css';

const Home: React.FC = () => {
  useEffect(() => {
    // URL 처리
    if (window.location.hostname === 'ptutip.p-e.kr') {
      const newUrl = `https://www.${window.location.hostname}${window.location.pathname}${window.location.search}`;
      window.location.replace(newUrl);
    }

    // 루트 경로 처리
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