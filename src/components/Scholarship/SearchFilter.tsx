import React, { useState, useEffect } from 'react';
import "./ScholarshipSearch.css";
import "./SearchFilter.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons'; 
import { Search } from "lucide-react";
import { getRecentSearches, addRecentSearch, removeRecentSearch } from "../../utils/search/recentSearch";
import { fetchDepartmentsByConsonant, fetchAllDepartments } from "../../utils/search/searchHelpers";

interface SearchFilterProps {
  onClose: () => void;
  onSearch: (name: string | undefined, minPoint?: number, department?: string) => void;
}

const consonants = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

const SearchFilter: React.FC<SearchFilterProps> = ({ onClose, onSearch }) => {
  const [name, setName] = useState<string>(""); // 검색어 상태
  const [minPoint, setMinPoint] = useState<number | undefined>(undefined);
  const [department, setDepartment] = useState<string | undefined>(undefined);
  const [recentSearches, setRecentSearches] = useState<string[]>([]); // 최근 검색어 목록
  const [selectedConsonant, setSelectedConsonant] = useState<string | null>(null); 
  const [departments, setDepartments] = useState<{ departmentName: string }[]>([]); 
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false); // 편집 상태 관리
  const storageKey = 'recentSearchesScholarship'; // 장학금 검색 고유 키

   // 최근 검색어 로드
   useEffect(() => {
    setRecentSearches(getRecentSearches(storageKey)); // 고유 키로 데이터 로드
  }, [storageKey]);

  // 부서 선택 처리
  const handleDepartmentSelect = (dept: string) => {
    setSelectedDepartment(dept); 
    setDepartment(dept);        
  };

  // 초성 버튼 클릭 처리
  const handleConsonantClick = (consonant: string) => {
    setSelectedConsonant((prev) => (prev === consonant ? null : consonant));
  };

  // 초성 또는 전체 부서 데이터 로드
  useEffect(() => {
    if (!selectedConsonant) {
      fetchAllDepartments().then(setDepartments);
    } else {
      fetchDepartmentsByConsonant(selectedConsonant).then(setDepartments);
    }
  }, [selectedConsonant]);

  // 검색 실행 처리
  const handleSearch = () => {
    onSearch(name.trim() || undefined, minPoint, department);
    if (name.trim()) {
      addRecentSearch(name.trim(), storageKey); // 고유 키로 저장
      setRecentSearches(getRecentSearches(storageKey)); // 목록 갱신
      setName(""); // 검색어 초기화
    }
  };

  // Enter 키 입력 처리
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 최근 검색어 삭제 처리
  const handleRemoveRecentSearch = (query: string) => {
    removeRecentSearch(query, storageKey); // 고유 키로 삭제
    setRecentSearches(getRecentSearches(storageKey)); // 목록 갱신
  };

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-panel" onClick={(e) => e.stopPropagation()}>
        {/* 검색 헤더 */}
        <div className="search-header">
          <FontAwesomeIcon 
            icon={faArrowLeft} 
            className="back-arrow-icon" 
            onClick={onClose} 
          />
          <input
            type="text"
            placeholder="검색어"
            className="search-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Search className="search-icon" onClick={handleSearch} />
        </div>

        {/* 최근 검색어 */}
        <div className="recent-searches">
          <span>최근 검색어</span>
          <div className="tags">
            {recentSearches.map((search, index) => (
              <div key={index} className="tag">
                <span>{search}</span>
                <FontAwesomeIcon 
                  icon={faTimes} 
                  onClick={() => handleRemoveRecentSearch(search)} 
                  style={{ cursor: 'pointer', marginLeft: '5px' }} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* 검색 내용 */}
        <div className="search-content">
          {/* 최소 포인트 입력 */}
          <div className="price-range">
            <div className="price-title">
              <p>최소 금액 범위</p>
            </div>
            <div className="price-min">
              <p>최소</p>
              {isEditing ? (
                <input
                  type="number"
                  value={minPoint ?? ""}
                  autoFocus
                  onBlur={() => setIsEditing(false)} // 입력 필드에서 포커스 해제 시 텍스트로 전환
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setIsEditing(false); // 엔터키를 누르면 편집 상태 종료
                    }
                  }}
                  onChange={(e) => setMinPoint(e.target.value ? parseInt(e.target.value) : undefined)}
                  style={{ width: `${(minPoint?.toString().length || 1) * 1.2+1.5}ch` }}
                />
              ) : (
                <span
                  onClick={() => setIsEditing(true)} // "0점" 클릭 시 입력 필드로 전환
                  style={{ cursor: "pointer" }}
                >
                  {minPoint ?? 0}점
                </span>
              )}
            </div>
          </div>

          {/* 부서 선택 */}
          <div className="departments">
            <div className="department-title">
              <p>부서</p>
            </div>
            <div className="consonant-list">
              {consonants.map((consonant, index) => (
                <button 
                  key={index} 
                  className={`consonant-button ${selectedConsonant === consonant ? 'selected' : ''}`}
                  onClick={() => handleConsonantClick(consonant)} // 수정된 로직 적용
                >
                  {consonant}
                </button>
              ))}
            </div>
            <div className="department-list">
              {departments.map((dept, index) => (
                <div 
                  key={index} 
                  className={`department-item ${selectedDepartment === dept.departmentName ? 'selected' : ''}`} 
                  onClick={() => handleDepartmentSelect(dept.departmentName)}
                >
                  {dept.departmentName}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
