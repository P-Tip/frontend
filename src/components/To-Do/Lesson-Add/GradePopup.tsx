import React from "react";

interface GradePopupProps {
  onClose: () => void;
}

const GradePopup: React.FC<GradePopupProps> = ({ onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup-header">
        <span>학년 필터</span>
        <button onClick={onClose}>닫기</button>
      </div>
      <div className="popup-content">
        <p>학년 필터링 옵션을 추가하세요.</p>
      </div>
    </div>
  );
};

export default GradePopup;
