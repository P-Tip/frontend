// src/components/Scholarship/ScholarshipList.tsx
import React from "react";
import { ScholarshipCard } from "@/components/Ui/Card";
import { Scholarship } from "../../utils/api";  // 여기서 api.ts의 Scholarship 타입을 가져옴
import './ScholarshipList.css';

interface ScholarshipListProps {
  scholarships: Scholarship[];
}

export default function ScholarshipList({ scholarships }: ScholarshipListProps) {
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
            date={scholarship.date}
            title={scholarship.title}
            subtitle={scholarship.subtitle}
            amount={scholarship.amount}
            logoSrc={scholarship.logoSrc}
          />
        ))}
      </div>
    </div>
  );
}