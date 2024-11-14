// src/components/Scholarship/ScholarshipList.tsx
import React, { useState, useEffect } from "react";
import { ScholarshipCard } from "@/components/Ui/Card";
import { Scholarship } from "../../utils/api/api";  
import './ScholarshipList.css';

interface ScholarshipListProps {
  scholarships: Scholarship[];
  onAdd: (change: number) => void; // 장학금의 maxPoint 전달하는 함수
}

export default function ScholarshipList({ scholarships, onAdd }: ScholarshipListProps) {
  const [addedItems, setAddedItems] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // 로컬 스토리지에서 담김 상태 불러오기
    const savedState = localStorage.getItem("addedItems");
    if (savedState) {
      setAddedItems(JSON.parse(savedState));
    }
  }, []);

  const handleAddToggle = (id: string, maxPoint: number) => {
    setAddedItems((prev) => {
      const newAddedItems = { ...prev, [id]: !prev[id] };
      localStorage.setItem("addedItems", JSON.stringify(newAddedItems)); 
      onAdd(prev[id] ? -maxPoint : maxPoint); 
      return newAddedItems;
    });
  };

  return (
    <div className="block-scholarship">
      <div className="title-container">
        <p>장학금 리스트</p>
      </div>
      <div className="sort-button-container">
        <p className="sort-date">2024.11.13기준</p>
        <button className="sort-button">최신순 ▾</button>
      </div>

      <div className="list-container">
        {scholarships.map((scholarship, index) => (
          <ScholarshipCard
            key={index}
            id={scholarship.id}
            date={scholarship.date}
            title={scholarship.title}
            subtitle={scholarship.subtitle}
            amount={scholarship.amount}
            logoSrc={scholarship.logoSrc}
            isAdded={!!addedItems[scholarship.id]}
            onAddToggle={() => handleAddToggle(scholarship.id, scholarship.maxPoint)}
            onAdd={onAdd} 
            maxPoint={scholarship.maxPoint} 
          />
        ))}
      </div>
    </div>
  );
}