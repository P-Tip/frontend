import React from 'react';

const iconData = [
  { type: 'home', src: '/assets/images/아이콘/홈.png' },
  { type: 'money', src: '/assets/images/아이콘/솔선수범.png' },
  { type: 'reminder', src: '/assets/images/아이콘/리마인더.png' },
  { type: 'mypage', src: '/assets/images/아이콘/마이페이지.png' },
  { type: 'bell', src: '/assets/images/아이콘/알림.png' },
];

export const getIconImage = (type: string) => {
  return iconData
    .filter((icon) => icon.type === type)
    .map((icon) => (
      <img key={icon.type} src={icon.src} alt={icon.type} className="icon" />
    ))[0] || null;
};
