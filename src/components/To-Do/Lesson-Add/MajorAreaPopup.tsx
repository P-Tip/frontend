import React from "react";

interface MajorAreaPopupProps {
  onClose: () => void;
}

const MajorAreaPopup: React.FC<MajorAreaPopupProps> = ({ onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup-header">
        <span>전공/영역 필터</span>
        <button onClick={onClose}>닫기</button>
      </div>
      <div className="popup-content">
        <p>전공/영역 필터링 옵션을 추가하세요.</p>
      </div>
    </div>
  );
};

export default MajorAreaPopup;
