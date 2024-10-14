import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PointBlock from '../components/MainPageComponents/PointBlock';
import MenuBlock from '../components/MainPageComponents/MenuBlock';
import TodoBlock from '../components/MainPageComponents/TodoBlock';
import './MainPage.css';

const MainPage: React.FC = () => {
  return (
    <div className="container">
      <Header />

      {/* 한줄 문장 */}
      <p className="main-text">영차영차q(≧▽≦q)체육대회</p>

      {/* 정사각형 위젯 */}
      <div className="widget-container">
        <PointBlock />
        <MenuBlock />
      </div>
      <div className="widget-gap"></div>

      {/* 직사각형 위젯 */}
      <TodoBlock />
      <div className="widget-gap"></div>

      <Footer />
    </div>
  );
};

export default MainPage;
