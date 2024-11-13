// src/utils/ScholarshipUtils.ts
import { useState, useEffect } from 'react';
import { fetchScholarships, Scholarship } from './api';

// 데이터 변환 함수
const transformScholarshipData = (data: any[]): Scholarship[] => {
  return data.map((item) => ({
    date: "", // 필요한 경우 기본값 설정
    title: item.programName,
    subtitle: item.department_name,
    amount: `${item.minpoint} ~ ${item.maxpoint}`,
    logoSrc: "/placeholder.svg", // 기본 로고 설정 (필요 시 수정 가능)
  }));
};

// 커스텀 훅으로 데이터 관리
export const useScholarshipData = () => {
  const [searchResults, setSearchResults] = useState<Scholarship[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    // 모든 장학금 데이터를 로드
    const loadScholarships = async () => {
      const data = await fetchScholarships();
      setSearchResults(transformScholarshipData(data));
    };
    loadScholarships();
  }, []);

  // 검색 조건에 따라 장학금 데이터를 필터링
  const handleSearchResults = async (name?: string, minPoint?: number, department?: string) => {
    const data = await fetchScholarships({ name, minPoint, department });
    setSearchResults(transformScholarshipData(data));
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