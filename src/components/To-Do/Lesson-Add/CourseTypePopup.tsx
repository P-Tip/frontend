import React from "react";

interface CourseTypePopupProps {
  onClose: () => void;
}

const CourseTypePopup: React.FC<CourseTypePopupProps> = ({ onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup-header">
        <span>구분 필터</span>
        <button onClick={onClose}>닫기</button>
      </div>
      <div className="popup-content">
        <p>구분 필터링 옵션을 추가하세요.</p>
      </div>
    </div>
  );
};

export default CourseTypePopup;
