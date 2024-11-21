export type Filters = {
  title: string;       // 과목명
  professor: string;   // 교수명
  courseNo: string;    // 과목코드
  classroom: string;   // 장소
  major: string;
  grade: string;
  time: string;
  type: string;
  credit: string;
};

// Filters 상태를 초기화하는 함수
export const initializeFilters = (): Filters => ({
  title: "전체",
  professor: "전체",
  courseNo: "전체",
  classroom: "전체",
  major: "전체",
  grade: "전체",
  time: "전체",
  type: "전체",
  credit: "전체",
});

// 특정 필터 값을 업데이트하는 함수
export const updateFilterValue = (filters: Filters, filterName: keyof Filters, value: string): Filters => {
  const updatedFilters = { ...filters };

  Object.keys(filters).forEach((key) => {
    updatedFilters[key as keyof Filters] = key === filterName ? value : "전체";
  });

  return updatedFilters;
};

// 필터를 초기화하는 함수 (특정 필터를 "전체"로 설정)
export const resetFilter = (filters: Filters, filterName: keyof Filters): Filters => ({
  ...filters,
  [filterName]: "전체",
});

// Filters를 API 쿼리 파라미터로 변환
export const mapFiltersToParams = (
  filters: Filters,
  searchValue: string,
  activeFilter: keyof Filters
): { [key: string]: string } => {
  const params: { [key: string]: string } = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "전체") {
      params[key] = value;
    }
  });

  if (searchValue !== "" && activeFilter) {
    params[activeFilter] = searchValue; // 현재 검색 조건에 검색값 추가
  }

  return params;
};
