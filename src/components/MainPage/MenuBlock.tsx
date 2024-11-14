import React, { useState, useEffect } from 'react';
import { fetchCafeteriaMenu } from '../../utils/api/api';
import { getFilteredMenu, formatMenuText } from '../../utils/menuUtils';
import './MenuBlock.css';

const MenuBlock: React.FC = () => {
  const [mainMenuText, setMainMenuText] = useState<string[]>(["오늘의 학식은 없습니다"]);
  const [sideMenuText, setSideMenuText] = useState<string[]>([]);

  useEffect(() => {
    const loadMenu = async () => {
      const menuData = await fetchCafeteriaMenu();
      console.log("Original Menu Data:", menuData);

      const currentTime = new Date();
      const { mainMenu, sideMenu } = getFilteredMenu(menuData, currentTime);

      setMainMenuText(mainMenu ? formatMenuText([mainMenu]) : ["오늘의 학식은 없습니다"]);
      setSideMenuText(sideMenu ? formatMenuText([sideMenu]) : []);
    };

    loadMenu();
  }, []);

  return (
    <div className="block-square">
      <div className="main-menu">
        {mainMenuText.map((line, index) => (
          <p key={index} className={`menublock-text ${index === 0 ? 'first-text' : ''}`}>
            {line}
          </p>
        ))}
      </div>
      {sideMenuText.length > 0 && (
        <div className="side-menu">
          {sideMenuText.map((line, index) => (
            <p key={index} className={`menublock-text ${index === 0 ? 'first-text' : ''}`}>
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuBlock;