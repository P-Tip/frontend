import React, { useState, useEffect } from 'react';
import { fetchCafeteriaMenu } from '../../utils/api/api';
import { getFilteredMenu, formatMenuText } from '../../utils/menuUtils';
import './MenuBlock.css';

const MenuBlock: React.FC = () => {
  const [mainMenuText, setMainMenuText] = useState<string[]>(["오늘의 학식은 없습니다"]);
  const [sideMenuText, setSideMenuText] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0); // 0: 메인메뉴, 1: 사이드메뉴
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const loadMenu = async () => {
      const menuData = await fetchCafeteriaMenu();
      console.log("Original Menu Data:", menuData);

      const { mainMenu, sideMenu } = getFilteredMenu(menuData);

      setMainMenuText(mainMenu ? formatMenuText([mainMenu]) : ["오늘의 학식은 없습니다"]);
      setSideMenuText(sideMenu ? formatMenuText([sideMenu]) : []);
    };

    loadMenu();
  }, []);

  // 터치 시작 위치 기록
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  // 터치 이동 종료 후 페이지 전환
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance > 50 && currentPage > 0) {
      // 오른쪽으로 스와이프: 이전 페이지
      setCurrentPage(currentPage - 1);
    } else if (swipeDistance < -50 && currentPage < 1) {
      // 왼쪽으로 스와이프: 다음 페이지
      setCurrentPage(currentPage + 1);
    }

    setTouchStartX(null); // 초기화
  };

  return (
    <div
      className="block-square"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="slider-container">
        <div
          className="slider"
          style={{
            transform: `translateX(-${currentPage * 100}%)`,
          }}
        >
          {/* 메인 메뉴 */}
          <div className="menu-page main-menu">
            {mainMenuText.map((line, index) => (
              <p key={index} className={`menublock-text ${index === 0 ? 'first-text' : ''}`}>
                {line}
              </p>
            ))}
          </div>

          {/* 사이드 메뉴 */}
          <div className="menu-page side-menu">
            {sideMenuText.map((line, index) => (
              <p key={index} className={`menublock-text ${index === 0 ? 'first-text' : ''}`}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuBlock;
