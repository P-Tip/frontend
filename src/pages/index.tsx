import React, { useEffect } from 'react';
import MainPage from './MainPage';
import './MainPage.css';

const Home: React.FC = () => {
  useEffect(() => {
    const currentHost = window.location.hostname;

    // www 리다이렉션
    if (currentHost === 'ptutip.p-e.kr') {
      const newUrl = `https://www.${currentHost}${window.location.pathname}${window.location.search}`;
      window.location.replace(newUrl);
      return; // 리다이렉션 후 추가 실행 방지
    }

    // 루트 경로 리다이렉션
    if (window.location.pathname === '/' || window.location.pathname === '') {
      window.location.replace('/MainPage'); // /MainPage로 강제 이동
    }
  }, []);

  return (
    <div>
      <MainPage />
    </div>
  );
};

export default Home;