import React from "react";

interface CreditPopupProps {
  onClose: () => void;
}

const CreditPopup: React.FC<CreditPopupProps> = ({ onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup-header">
        <span>학점 필터</span>
        <button onClick={onClose}>닫기</button>
      </div>
      <div className="popup-content">
        <p>학점 필터링 옵션을 추가하세요.</p>
      </div>
    </div>
  );
};

export default CreditPopup;
