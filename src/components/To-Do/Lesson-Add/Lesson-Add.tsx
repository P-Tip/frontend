import React, { useState, useEffect } from "react";
import "./Lesson-Add.css";
import CourseBlock from "../../Ui/CourseBlock";
import { fetchFilteredCourses, CourseData } from "../../../utils/api/api";
import { managePopupState, updateFilters, mapFiltersToParams } from "../../../utils/search/filterUtils";
import CourseSearchPopup from "./CourseSearchPopup";

interface LessonAddProps {
  onClose: () => void;
  onAddToSchedule: (course: CourseData) => void;
}

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


const LessonAdd: React.FC<LessonAddProps> = ({ onClose, onAddToSchedule }) => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseData[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<keyof Filters | null>(null);

  const [filters, setFilters] = useState<Filters>({
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

  // API 호출
  useEffect(() => {
    const params = mapFiltersToParams(filters);
    fetchFilteredCourses(params)
      .then((data) => {
        setCourses(data);
        setFilteredCourses(data);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, [filters]);

  // 검색어를 기반으로 필터 업데이트
  const handleFilterUpdate = (filterName: keyof Filters, value: string) => {
    const updatedFilters = { ...filters };

    // 선택된 필터만 업데이트하고 나머지는 초기화
    Object.keys(filters).forEach((key) => {
      updatedFilters[key as keyof Filters] = key === filterName ? value : "전체";
    });

    setFilters(updatedFilters);
  };

  return (
    <div className="lesson-add-overlay">
      <div className="lesson-add-container">
        <div className="arrow-container" onClick={() => setIsPopupVisible(false)}>
          <div className="close-arrow">▼</div>
        </div>

        {/* 검색어 버튼 */}
        <div className="filter-container">
          <div
            className="filter-item"
            onClick={() => managePopupState("title", setActiveFilter, setIsPopupVisible)}
          >
            <span className="filter-label">검색어:</span>
            <span className="filter-value">
              {filters.title !== "전체" ? filters.title : "없음"}
            </span>
          </div>
        </div>

        {/* 팝업 */}
        {isPopupVisible && activeFilter && (
          <CourseSearchPopup
            onClose={() => managePopupState(null, setActiveFilter, setIsPopupVisible)}
            onSearch={(params) => {
              const [key, value] = Object.entries(params)[0];
              handleFilterUpdate(key as keyof Filters, value);
            }}
            storageKey="courseSearch"
          />
        )}

        {/* 강의 리스트 */}
        <div className="course-list">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseBlock
                key={course.course_no}
                course_no={course.course_no}
                title={course.title}
                course_type={course.course_type}
                credit={course.credit}
                grade={course.grade}
                course_time={course.course_time}
                classroom={course.classroom}
                professor={course.professor}
                onAdd={() => onAddToSchedule(course)} // onAdd를 추가
              />
            ))
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonAdd;
