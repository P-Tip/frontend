import { CourseSearchParams } from "../../utils/api/api";

// 필터 초기화
export const initializeFilters = () => ({
  title: "전체",
  professor: "전체",
  courseNo: "전체",
  classroom: "전체",
  department: "전체",
  grade: "전체",
  time: "전체",
  type: "전체",
  credit: "전체",
});

// 필터를 API 요청에 맞게 변환
export const mapFiltersToParams = (
  filters: { [key: string]: string }
): CourseSearchParams => {
  const params: CourseSearchParams = {
    title: filters.title !== "전체" ? filters.title : undefined,
    professor: filters.professor !== "전체" ? filters.professor : undefined,
    courseNo: filters.courseNo !== "전체" ? filters.courseNo : undefined,
    classroom: filters.classroom !== "전체" ? filters.classroom : undefined,
    major: filters.department !== "전체" ? filters.department : undefined,
    grade:
      filters.grade !== "전체" && !isNaN(Number(filters.grade))
        ? Number(filters.grade)
        : undefined,
    credits: filters.credit !== "전체" ? filters.credit : undefined,
    courseTypes: filters.type !== "전체" ? filters.type : undefined,
    times: filters.time !== "전체" ? filters.time : undefined,
  };

  console.log("Mapped Filters to Params:", params);
  return params;
};

// 필터 업데이트 로직
export const handleFilterUpdate = (
  params: { [key: string]: string },
  activeFilter: string | null,
  filters: { [key: string]: string },
  setFilters: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
) => {
  if (!activeFilter) return;

  const updatedFilters = {
    ...filters,
    [activeFilter]: params[activeFilter] ?? "전체",
  };
  console.log("Updated Filters:", updatedFilters);
  setFilters(updatedFilters);
};

// 팝업 상태 관리
export const managePopupState = (
  filter: string | null,
  setActiveFilter: React.Dispatch<React.SetStateAction<string | null>>,
  setIsPopupVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setActiveFilter(filter);
  setIsPopupVisible(!!filter);
};
