// NotificationPopup.tsx
import React from "react";
import "./NotificationPopup.css"; // 스타일 파일

interface NotificationPopupProps {
  onClose: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ onClose }) => {
  return (
    <div className="notification-popup">
      <div className="popup-overlay" onClick={onClose}></div>
      <div className="popup-content">
        <div className="popup-header">
          <h2>Notifications</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="popup-body">
          <p>알림1.</p>
          <p>알림1.</p>
          <p>알림1.</p>
          <p>알림1.</p>
          <p>알림1.</p>
          <p>알림1.</p>
          <p>알림1.</p>
          <p>알림1.</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;
