import React from 'react';

import homeIcon from '../assets/images/아이콘/홈.png';
import moneyIcon from '../assets/images/아이콘/솔선수범.png';
import reminderIcon from '../assets/images/아이콘/리마인더.png';
import mypageIcon from '../assets/images/아이콘/마이페이지.png';
import bellIcon from '../assets/images/아이콘/알림.png';


const iconData = [
  { type: 'home', src: homeIcon },
  { type: 'money', src: moneyIcon },
  { type: 'reminder', src: reminderIcon },
  { type: 'mypage', src: mypageIcon },
  { type: 'bell', src: bellIcon },
];

export const getIconImage = (type: string) => {
  return iconData
    .filter((icon) => icon.type === type)
    .map((icon) => <img key={icon.type} src={icon.src} alt={icon.type} className="icon" />)[0] || null;
};
