// utils/recentSearch.js

const RECENT_SEARCH_KEY = "recentSearches";

// 최근 검색어를 로컬 스토리지에 추가
export function addRecentSearch(query) {
  if (!query) return;

  let recentSearches = getRecentSearches();

  // 중복 검색어 제거 및 최신 검색어 맨 앞에 추가
  recentSearches = [query, ...recentSearches.filter(item => item !== query)];

  // 최대 10개의 최근 검색어 저장
  if (recentSearches.length > 10) {
    recentSearches = recentSearches.slice(0, 10);
  }

  localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(recentSearches));
}

// 최근 검색어 목록 가져오기
export function getRecentSearches() {
  const storedSearches = localStorage.getItem(RECENT_SEARCH_KEY);
  return storedSearches ? JSON.parse(storedSearches) : [];
}

// 최근 검색어 목록에서 검색어 제거
export function removeRecentSearch(query) {
  let recentSearches = getRecentSearches();
  recentSearches = recentSearches.filter(item => item !== query);
  localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(recentSearches));
}
