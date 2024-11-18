const iconData = [
  { type: 'home', src: '/assets/images/아이콘/홈.png', selectedSrc: '/assets/images/아이콘/홈-선택.png' },
  { type: 'money', src: '/assets/images/아이콘/솔선수범.png', selectedSrc: '/assets/images/아이콘/솔선수범-선택.png' },
  { type: 'reminder', src: '/assets/images/아이콘/리마인더.png', selectedSrc: '/assets/images/아이콘/리마인더-선택.png' },
  { type: 'mypage', src: '/assets/images/아이콘/마이페이지.png', selectedSrc: '/assets/images/아이콘/마이페이지-선택.png' },
  { type: 'bell', src: '/assets/images/아이콘/알림.png'},
];

export const getIconImage = (type: string, isSelected: boolean) => {
  const icon = iconData.find((icon) => icon.type === type);
  if (!icon) return null;

  const src = isSelected ? icon.selectedSrc : icon.src;
  return <img key={type} src={src} alt={type} className="icon" />;
};