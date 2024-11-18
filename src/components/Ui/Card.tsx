// src/components/Ui/Card.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./Card.css";

// Card 컴포넌트를 import하여 사용할 수 있도록 추가합니다.
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return <div className={`card-container ${className}`}>{children}</div>;
}

// ScholarshipCard 컴포넌트의 props 정의
interface ScholarshipCardProps {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  amount: string;
  logoSrc?: string;
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
  logoSrc = "/placeholder.svg",
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
    console.log(`Button clicked for ID: ${id}, isAdded: ${isAdded}`); // 클릭 확인 로그 추가
  
    const updatedAddedItems = JSON.parse(localStorage.getItem("addedItems") || "{}");
  
    if (isAdded) {
      console.log(`Removing scholarship ${id}: -${maxPoint}`); // 제거 로그
      onAdd(-maxPoint);
      delete updatedAddedItems[id];
    } else {
      console.log(`Adding scholarship ${id}: +${maxPoint}`); // 추가 로그
      onAdd(maxPoint);
      updatedAddedItems[id] = true;
    }
  
    localStorage.setItem("addedItems", JSON.stringify(updatedAddedItems));
    setIsAdded(!isAdded);
  };

  return (
    <Card className="scholarship-card">
      <div className="scholarship-header">
        <div className="scholarship-logo">
          <Image src={logoSrc} alt={`${title} 로고`} width={40} height={40} className="logo-image" />
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
    </Card>
  );
}