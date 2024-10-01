import React from 'react'; 
import { FaHome, FaBell, FaUser } from 'react-icons/fa'; 
import './Icon.css'; 

// IconProps 인터페이스 정의
interface IconProps {
  type: 'home' | 'bell' | 'user'; // 아이콘 타입
  size?: 'large' | 'small'; // 아이콘 크기 (옵션)
  color?: 'black' | 'white'; // 아이콘 색상 (옵션)
  onClick?: () => void; // 클릭 이벤트 핸들러 (옵션)
}

// Icon 컴포넌트 정의
const Icon: React.FC<IconProps> = ({ type, size = 'small', color = 'black', onClick }) => {
  const iconClass = `icon icon-${size} icon-${color}`; // 아이콘 클래스 설정

  // 아이콘 렌더링 함수
  const renderIcon = () => {
    switch (type) {
      case 'home':
        return <FaHome className={iconClass} />; // 'home' 타입 아이콘 렌더링
      case 'bell':
        return <FaBell className={iconClass} />; // 'bell' 타입 아이콘 렌더링
      case 'user':
        return <FaUser className={iconClass} />; // 'user' 타입 아이콘 렌더링
      default:
        return null; // 기본값 (null 반환)
    }
  };

  return (
    <button className="transparent-button" onClick={onClick}> 
      {renderIcon()} 
    </button>
  );
};

export default Icon; // Icon 컴포넌트 내보내기