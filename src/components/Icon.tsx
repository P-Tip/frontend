import React from 'react';
import './Icon.css';

// IconProps 인터페이스 정의
interface IconProps {
  type: 'home' | 'money' | 'reminder' | 'mypage' | 'bell';
  onClick?: () => void;
}

// Icon 컴포넌트 정의
const Icon: React.FC<IconProps> = ({ type, onClick }) => {
  // 아이콘 이미지 파일 경로 설정 함수
  const getImageSrc = () => {
    switch (type) {
      case 'home':
        return '/images/아이콘/홈.png'; 
      case 'money':
        return '/images/아이콘/솔선수범.png'; 
      case 'reminder':
        return '/images/아이콘/리마인더.png'; 
      case 'mypage':
        return '/images/아이콘/마이페이지.png'; 
      case 'bell':
        return '/images/아이콘/알림.png'; 
        default:
          return undefined;
    }
  };

  return (
    <button className="transparent-button" onClick={onClick}>
      {getImageSrc() && (
        <img src={getImageSrc()} alt={type} className="icon" />
      )}
    </button>
  );
};

export default Icon;
