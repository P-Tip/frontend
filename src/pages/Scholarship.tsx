// src/pages/Scholarship.tsx
import React from "react";
import ScholarshipSearch from "../components/Scholarship/ScholarshipSearch";
import PointsCard from "../components/Scholarship/PointsCard";
import ScholarshipList from "../components/Scholarship/ScholarshipList";
import SearchFilter from "../components/Scholarship/SearchFilter";
import { useScholarshipData } from "../utils/ScholarshipUtils";
import "./Scholarship.css";

export default function Scholarship() {
  // 커스텀 훅을 통해 데이터와 상태를 관리
  const { searchResults, isSearchOpen, toggleSearchOpen, handleSearchResults } = useScholarshipData();

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
        <PointsCard />
        <ScholarshipList scholarships={searchResults} />
      </div>
    </div>
  );
}
