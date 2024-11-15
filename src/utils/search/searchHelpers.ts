// src/utils/search/searchHelpers.ts
import { fetchScholarships } from '../api/api';
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

// 초성에 따른 부서 목록 필터링 함수
export const fetchDepartmentsByConsonant = async (consonant: string) => {
  try {
    const response = await fetchScholarships({ consonant });
    return response.map((item: any) => ({
      departmentName: item.departmentName || "Unnamed Department",
    }));
  } catch (error) {
    console.error("Error fetching departments by consonant:", error);
    return [];
  }
};

// 검색 실행 함수 - 검색어를 저장하고 최근 검색어 목록을 업데이트
export const executeSearch = (
  name: string,
  minPoint: number | undefined,
  department: string | undefined,
  onSearch: (name: string, minPoint?: number, department?: string) => void,
  setRecentSearches: React.Dispatch<React.SetStateAction<string[]>>
) => {
  if (name.trim()) {
    onSearch(name, minPoint, department);
    addRecentSearch(name);
    setRecentSearches(getRecentSearches());
  }
};

// 최근 검색어 삭제 함수 - 최근 검색어에서 특정 검색어를 삭제하고 목록을 업데이트
export const handleRemoveSearch = (
  query: string,
  setRecentSearches: React.Dispatch<React.SetStateAction<string[]>>
) => {
  removeRecentSearch(query);
  setRecentSearches(getRecentSearches());
};
