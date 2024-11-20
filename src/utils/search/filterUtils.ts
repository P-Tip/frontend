export const updateFilters = (
  filterName: keyof Filters | undefined, // undefined 가능성을 포함
  value: string
): Filters => {
  if (!filterName) {
    throw new Error("Filter name is undefined."); // 키가 없는 경우 처리
  }
  return {
    [filterName]: value, // 특정 키에 값을 업데이트
  } as Filters;
};
type Filters = {
  title: string;       // 과목명
  professor: string;   // 교수명
  courseNo: string;    // 과목코드
  classroom: string;   // 장소
  department: string;
  grade: string;
  time: string;
  type: string;
  credit: string;
};

// filters의 타입을 Filters로 지정
export const mapFiltersToParams = (filters: Filters): { [key: string]: string } => {
  const keyMapping: { [key in keyof Filters]?: string } = {
    title: "title",
    professor: "professor",
    courseNo: "courseNo",
    classroom: "classroom",
    department: "major",
    grade: "grade",
    time: "times",
    type: "courseTypes",
    credit: "credits",
  };

  const params: { [key: string]: string } = {};
  for (const [key, value] of Object.entries(filters)) {
    if (value !== "전체" && keyMapping[key as keyof Filters]) {
      params[keyMapping[key as keyof Filters]!] = value;
    }
  }
  return params;
};
// 팝업 상태를 관리하는 함수
export const managePopupState = (
  filterName: keyof Filters | null,
  setActiveFilter: React.Dispatch<React.SetStateAction<keyof Filters | null>>,
  setIsPopupVisible: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  setActiveFilter(filterName);
  setIsPopupVisible(Boolean(filterName));
};
