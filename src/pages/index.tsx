import React, { useEffect } from 'react';
import MainPage from './MainPage';
import './MainPage.css';

const Home: React.FC = () => {
  useEffect(() => {
    const currentHost = window.location.hostname;

    // www 리다이렉션 처리 
    if (currentHost === 'ptutip.p-e.kr') {
      const newUrl = `https://www.${currentHost}${window.location.pathname}${window.location.search}`;
      window.location.replace(newUrl);
    }
  }, []);

  return (
    <div>
      <MainPage />
    </div>
  );
};

export default Home;