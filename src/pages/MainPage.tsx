import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Block from '../components/Block';
import './MainPage.css';

const MainPage: React.FC = () => {
  return (
    <div className="container">
      <Header />

      {/* 한줄 문장 */}
      <p className="main-text">P-tip에 오신걸 환영합니다.</p>

      {/*정사각형 위젯 */}
      <div className="widget-container">
        <Block content="솔선수범 장학금" isSquare={true} />
        <Block content="학식 메뉴" isSquare={true} />
      </div>
      <div className="widget-gap"></div>

      {/*직사각형 위젯 */}
      <Block content="시간표" />
      <div className="widget-gap"></div>

      <Footer />
    </div>
  );
};

export default MainPage;
