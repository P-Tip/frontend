import React, { useState, useEffect } from "react";
import { getLogoImage } from "../../utils/ImageUtils"; // 유틸 import
import "./Card.css";

// ScholarshipCard 컴포넌트의 props 정의
interface ScholarshipCardProps {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  amount: string;
  isAdded: boolean;
  onAddToggle: () => void;
  onAdd: (change: number) => void;
  maxPoint: number;
}

export function ScholarshipCard({
  id,
  date,
  title,
  subtitle,
  amount,
  onAdd,
  maxPoint
}: ScholarshipCardProps) {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const savedAddedItems = JSON.parse(localStorage.getItem("addedItems") || "{}");
    if (savedAddedItems[id]) {
      setIsAdded(true);
    }
  }, [id]);

  const handleButtonClick = () => {
    const updatedAddedItems = JSON.parse(localStorage.getItem("addedItems") || "{}");

    if (isAdded) {
      console.log(`Removing scholarship ${id} from department: ${subtitle}`);
      onAdd(-maxPoint);
      delete updatedAddedItems[id];
    } else {
      console.log(`Adding scholarship ${id} from department: ${subtitle}`);
      onAdd(maxPoint);
      updatedAddedItems[id] = true;
    }

    localStorage.setItem("addedItems", JSON.stringify(updatedAddedItems));
    setIsAdded(!isAdded);
  };

  console.log(`Rendering ScholarshipCard for department: ${subtitle}`);

  return (
    <div className="scholarship-card">
      <div className="scholarship-header">
        <div className="scholarship-logo">
          {/* 평택대학교 로고 렌더링 */}
          {getLogoImage('university', '평택대학교 로고')}
        </div>
        <div>
          <div className="scholarship-date">{date}</div>
          <h3 className="scholarship-title">{title}</h3>
          <div className="scholarship-subtitle">{subtitle}</div>
          <div className="scholarship-amount">{amount}점</div>
        </div>
      </div>
      <button 
        className={`scholarship-button ${isAdded ? "added" : ""}`} 
        onClick={handleButtonClick}
      >
        {isAdded ? "✓ 담김" : "담기"}
      </button>
    </div>
  );
}
