// src/utils/search/searchHelpers.ts
import { fetchScholarships } from '../api/api';

export const searchScholarships = async (name?: string, minPoint?: number, department?: string) => {
  const data = await fetchScholarships({ name, minPoint, department });
  return data;
};

// 기존에 추가된 함수들
import { getRecentSearches, addRecentSearch, removeRecentSearch } from "./recentSearch";

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

export const handleRemoveSearch = (
  query: string,
  setRecentSearches: React.Dispatch<React.SetStateAction<string[]>>
) => {
  removeRecentSearch(query);
  setRecentSearches(getRecentSearches());
};