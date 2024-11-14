// src/utils/search/recentSearch.ts
export const addRecentSearch = (query: string) => {
    const recentSearches = getRecentSearches();
    if (!recentSearches.includes(query)) {
      recentSearches.unshift(query);
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches.slice(0, 10)));
    }
  };
  
  export const getRecentSearches = (): string[] => {
    return JSON.parse(localStorage.getItem('recentSearches') || '[]');
  };
  
  export const removeRecentSearch = (query: string) => {
    const recentSearches = getRecentSearches().filter(item => item !== query);
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  };  