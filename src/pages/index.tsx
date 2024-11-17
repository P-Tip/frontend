import React, { useEffect } from 'react';
import MainPage from './MainPage';
import './MainPage.css';

const Home: React.FC = () => {
  useEffect(() => {
    const currentHost = window.location.hostname;

    // www 리다이렉션만 처리 (루트 경로 리다이렉션 제거)
    if (currentHost === 'ptutip.p-e.kr') {
      const newUrl = `https://www.${currentHost}${window.location.pathname}${window.location.search}`;
      window.location.replace(newUrl);
    }
  }, []);

  return (
    <div>
      {/* 루트 경로에서 MainPage를 직접 렌더링 */}
      <MainPage />
    </div>
  );
};

export default Home;