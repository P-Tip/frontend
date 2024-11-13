import React from "react";
import { Search } from "lucide-react";
import "./ScholarshipSearch.css";

interface ScholarshipSearchProps {
  onSearchClick: () => void;
}

export default function ScholarshipSearch({ onSearchClick }: ScholarshipSearchProps) {
  return (
    <div className="scholarship-search">
      <div className="block-search">
        <input
          type="search"
          placeholder="검색"
          className="search-input"
          onFocus={onSearchClick}
        />
        <Search className="search-icon" onClick={onSearchClick} />
      </div>
    </div>
  );
}