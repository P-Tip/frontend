// src/utils/search/searchHelpers.ts

import { fetchScholarships, fetchDepartments } from '../api/api';
import { getRecentSearches, addRecentSearch, removeRecentSearch } from "./recentSearch";

// 장학금 검색 함수
export const searchScholarships = async (name?: string, minPoint?: number, department?: string) => {
  try {
    const data = await fetchScholarships({ name, minPoint, department });
    return data;
  } catch (error) {
    console.error("Error searching scholarships:", error);
    return [];
  }
};

// 모든 부서 목록 로드 함수
export const fetchAllDepartments = async () => {
  try {
    const data = await fetchDepartments(""); // 초성 없이 호출하여 모든 부서를 가져옴
    return data;
  } catch (error) {
    console.error("Error fetching all departments:", error);
    return [];
  }
};

// 초성에 따른 부서 목록 필터링 및 기본 부서 로드
export const fetchDepartmentsByConsonant = async (consonant: string | null) => {
  try {
    if (!consonant) {
      // 초성이 null인 경우 모든 부서 로드
      return await fetchAllDepartments();
    }
    // 초성이 있는 경우 해당 초성으로 필터링
    const data = await fetchDepartments(consonant); 
    return data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
};

// 검색 실행 함수 - 검색어를 저장하고 최근 검색어 목록을 업데이트
export const executeSearch = (
  name: string,
  minPoint: number | undefined,
  department: string | undefined,
  onSearch: (name: string, minPoint?: number, department?: string) => void,
  setRecentSearches: React.Dispatch<React.SetStateAction<string[]>>,
  storageKey: string // 새로운 storageKey 인자 추가
) => {
  if (name.trim()) {
    onSearch(name, minPoint, department);
    addRecentSearch(name, storageKey); // 특정 키로 저장
    setRecentSearches(getRecentSearches(storageKey)); // 특정 키로 최근 검색어 로드
  }
};

// 최근 검색어 삭제 함수 - 최근 검색어에서 특정 검색어를 삭제하고 목록을 업데이트
export const handleRemoveSearch = (
  query: string,
  setRecentSearches: React.Dispatch<React.SetStateAction<string[]>>,
  storageKey: string // 새로운 storageKey 인자 추가
) => {
  removeRecentSearch(query, storageKey); // 특정 키로 삭제
  setRecentSearches(getRecentSearches(storageKey)); // 특정 키로 최근 검색어 로드
};
