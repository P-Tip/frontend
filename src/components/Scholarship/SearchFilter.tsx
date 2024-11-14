// src/components/Scholarship/SearchFilter.tsx
import React, { useState, useEffect } from 'react';
import "./ScholarshipSearch.css";
import "./SearchFilter.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons'; 
import { Search } from "lucide-react";
import { addRecentSearch, getRecentSearches, removeRecentSearch } from "../../utils/search/recentSearch";

interface SearchFilterProps {
  onClose: () => void;
  onSearch: (name: string | undefined, minPoint?: number, department?: string) => void; // name을 string | undefined로 설정
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onClose, onSearch }) => {
  const [name, setName] = useState<string>(""); // 초기값을 빈 문자열로 설정
  const [minPoint, setMinPoint] = useState<number | undefined>(undefined);
  const [department, setDepartment] = useState<string | undefined>(undefined);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  const handleSearch = async () => {
    onSearch(name.trim() || undefined, minPoint, department); // name이 비어있으면 undefined 전달
    if (name.trim()) {
      addRecentSearch(name);
      setRecentSearches(getRecentSearches());
      setName("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(); // Enter 키를 누르면 검색 실행
    }
  };

  const handleRemoveRecentSearch = (query: string) => {
    removeRecentSearch(query);
    setRecentSearches(getRecentSearches());
  };

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-panel" onClick={(e) => e.stopPropagation()}>
        <div className="search-header">
          <FontAwesomeIcon 
            icon={faArrowLeft} 
            className="back-icon" 
            onClick={onClose} 
            style={{ cursor: 'pointer', fontSize: '24px', color: 'black', marginRight: '8px' }}
          />
          
          <input
            type="text"
            placeholder="검색어"
            className="search-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyPress} // onKeyPress 대신 onKeyDown 사용
          />
          <Search className="search-icon" onClick={handleSearch} />
        </div>

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

        <div className="search-content">
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

          <div className="departments">
            <div className="department-list">
             <input
                type="text"
                placeholder="부서"
                value={department ?? ""}
                onChange={(e) => setDepartment(e.target.value || undefined)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;