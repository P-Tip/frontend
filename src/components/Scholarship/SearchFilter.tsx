// src/components/Scholarship/SearchFilter.tsx
import React, { useState, useEffect } from 'react';
import "./ScholarshipSearch.css";
import "./SearchFilter.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons'; 
import { Search } from "lucide-react";
import { getRecentSearches, addRecentSearch, removeRecentSearch } from "../../utils/search/recentSearch";
import { fetchDepartmentsByConsonant } from "../../utils/search/searchHelpers";

interface SearchFilterProps {
  onClose: () => void;
  onSearch: (name: string | undefined, minPoint?: number, department?: string) => void;
}

const consonants = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

const SearchFilter: React.FC<SearchFilterProps> = ({ onClose, onSearch }) => {
  const [name, setName] = useState<string>("");
  const [minPoint, setMinPoint] = useState<number | undefined>(undefined);
  const [department, setDepartment] = useState<string | undefined>(undefined);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedConsonant, setSelectedConsonant] = useState<string | null>(null); 
  const [departments, setDepartments] = useState<{ departmentName: string }[]>([]); 
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const handleDepartmentSelect = (dept: string) => {
    setSelectedDepartment(dept); 
    setDepartment(dept);        
  };

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  useEffect(() => {
    if (selectedConsonant) {
      fetchDepartmentsByConsonant(selectedConsonant).then(setDepartments);
    }
  }, [selectedConsonant]);

  const handleSearch = () => {
    onSearch(name.trim() || undefined, minPoint, department);
    if (name.trim()) {
      addRecentSearch(name);
      setRecentSearches(getRecentSearches());
      setName("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };


  const handleRemoveRecentSearch = (query: string) => {
    removeRecentSearch(query);
    setRecentSearches(getRecentSearches());
  };

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-panel" onClick={(e) => e.stopPropagation()}>
        {/* 검색 헤더 */}
        <div className="search-header">
          
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
            <div className="price-min">
              <input
                type="number"
                placeholder="최소 포인트"
                value={minPoint ?? ""}
                onChange={(e) => setMinPoint(e.target.value ? parseInt(e.target.value) : undefined)}
              />
            </div>
          </div>

          {/* 부서 선택 */}
          <div className="departments">
            {/* 부서 제목 */}
            <div className="department-title">
              <p>부서</p>
            </div>
            
            {/* 초성 리스트 */}
            <div className="consonant-list">
              {consonants.map((consonant, index) => (
                <button 
                  key={index} 
                  className={`consonant-button ${selectedConsonant === consonant ? 'selected' : ''}`}
                  onClick={() => setSelectedConsonant(consonant)}
                >
                  {consonant}
                </button>
              ))}
            </div>

            {/* 부서 리스트 */}
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