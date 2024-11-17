import React from 'react';
import PointBlock from '../components/MainPage/PointBlock';
import MenuBlock from '../components/MainPage/MenuBlock';
import TodoBlock from '../components/MainPage/TodoBlock';
import './MainPage.css';

const MainPage: React.FC = () => {
  // For reflect the modified cors code
  return (
    <div className="container">


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
      

   
    </div>
  );
};

export default MainPage;
