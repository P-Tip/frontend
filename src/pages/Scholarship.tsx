// src/pages/Scholarship.tsx
import React, { useState, useEffect } from "react";
import ScholarshipSearch from "../components/Scholarship/ScholarshipSearch";
import PointsCard from "../components/Scholarship/PointsCard";
import ScholarshipList from "../components/Scholarship/ScholarshipList";
import SearchFilter from "../components/Scholarship/SearchFilter";
import { useScholarshipData } from "../utils/ScholarshipUtils";
import { saveScoreToLocalStorage, loadScoreFromLocalStorage } from "../utils/GaugeBarUtils";
import "./Scholarship.css";

export default function Scholarship() {
  // 초기 값은 서버 렌더링과 클라이언트 첫 렌더링에서 일관성을 위해 0으로 설정
  const [currentScore, setCurrentScore] = useState(0);
  const { searchResults, isSearchOpen, toggleSearchOpen, handleSearchResults } = useScholarshipData();

  // 클라이언트 측에서 로컬 스토리지 값을 불러오기
  useEffect(() => {
    const savedScore = loadScoreFromLocalStorage();
    setCurrentScore(savedScore); // 클라이언트 측에서만 로컬 스토리지의 값을 사용
  }, []);

  // currentScore가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    saveScoreToLocalStorage(currentScore);
  }, [currentScore]);

  const handleAddScore = (change: number | string) => {
    setCurrentScore((prevScore) => {
      const newScore = Math.max(0, prevScore + Number(change)); 
      return newScore;
    });
  };

  return (
    <div className="scholarship-container">
      <div className="content-wrapper">
        {/* 검색 필터 열기 */}
        <ScholarshipSearch onSearchClick={toggleSearchOpen} />

        {/* 검색 필터 컴포넌트 */}
        {isSearchOpen && (
          <SearchFilter
            onClose={toggleSearchOpen}
            onSearch={handleSearchResults}
          />
        )}

        {/* 포인트 카드와 장학금 리스트 */}
        <PointsCard currentScore={currentScore} />
        <ScholarshipList scholarships={searchResults} onAdd={handleAddScore} />
      </div>
    </div>
  );
}