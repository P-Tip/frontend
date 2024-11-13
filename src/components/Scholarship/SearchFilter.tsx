import React, { useState, useEffect } from 'react';
import "./ScholarshipSearch.css";
import "./SearchFilter.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons'; 
import { Search } from "lucide-react";
import { addRecentSearch, getRecentSearches, removeRecentSearch } from "../../utils/recentSearch"; 

interface SearchFilterProps {
  onClose: () => void;
  onSearch: (name: string, minPoint?: number, department?: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onClose, onSearch }) => {
  const [name, setName] = useState("");
  const [minPoint, setMinPoint] = useState<number | undefined>(undefined);
  const [department, setDepartment] = useState<string | undefined>(undefined);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 최근 검색어 목록을 가져오기
    setRecentSearches(getRecentSearches());
  }, []);

  const handleSearch = () => {
    if (name.trim()) {
      onSearch(name, minPoint, department);
      addRecentSearch(name); // 최근 검색어 추가
      setRecentSearches(getRecentSearches()); // 업데이트된 최근 검색어 목록 가져오기
      setName(""); // 검색 후 입력란 초기화
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
            onKeyPress={handleKeyPress} // 엔터키 입력시 검색 실행
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