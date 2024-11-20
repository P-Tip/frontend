import React from "react";

interface CourseTimePopupProps {
  onClose: () => void;
}

const CourseTimePopup: React.FC<CourseTimePopupProps> = ({ onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup-header">
        <span>시간 필터</span>
        <button onClick={onClose}>닫기</button>
      </div>
      <div className="popup-content">
        <p>시간 필터링 옵션을 추가하세요.</p>
      </div>
    </div>
  );
};

export default CourseTimePopup;
