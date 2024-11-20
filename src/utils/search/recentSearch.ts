// src/utils/search/recentSearch.ts
export const addRecentSearch = (query: string, storageKey: string) => {
  const recentSearches = getRecentSearches(storageKey);
  if (!recentSearches.includes(query)) {
      recentSearches.unshift(query); // 새로운 검색어 추가
      localStorage.setItem(storageKey, JSON.stringify(recentSearches.slice(0, 10))); // 최신 10개 검색어 저장
  }
};

export const getRecentSearches = (storageKey: string): string[] => {
  return JSON.parse(localStorage.getItem(storageKey) || '[]'); // storageKey에 맞는 최근 검색어 불러오기
};

export const removeRecentSearch = (query: string, storageKey: string) => {
  const recentSearches = getRecentSearches(storageKey).filter(item => item !== query);
  localStorage.setItem(storageKey, JSON.stringify(recentSearches)); // 해당 키에서 검색어 삭제
};
