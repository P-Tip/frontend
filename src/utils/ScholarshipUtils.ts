// src/utils/ScholarshipUtils.ts
import { useState, useEffect } from 'react';
import { fetchScholarships, Scholarship } from './api/api';
import { transformScholarshipData } from './api/transformData';
import { searchScholarships } from './search/searchHelpers';

export const useScholarshipData = () => {
  const [searchResults, setSearchResults] = useState<Scholarship[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 전체 데이터를 불러옴
    const loadScholarships = async () => {
      const data = await fetchScholarships();
      setSearchResults(transformScholarshipData(data));
    };
    loadScholarships();
  }, []);

  const handleSearchResults = async (name?: string, minPoint?: number, department?: string) => {
    if (!name && !minPoint && !department) {
      // 검색 조건이 없을 때 전체 데이터 호출
      const data = await fetchScholarships();
      setSearchResults(transformScholarshipData(data));
    } else {
      // 조건이 있을 때 검색 호출
      const data = await searchScholarships(name, minPoint, department);
      setSearchResults(transformScholarshipData(data));
    }
    setIsSearchOpen(false);
  };

  const toggleSearchOpen = () => setIsSearchOpen(!isSearchOpen);

  return {
    searchResults,
    isSearchOpen,
    toggleSearchOpen,
    handleSearchResults,
  };
};