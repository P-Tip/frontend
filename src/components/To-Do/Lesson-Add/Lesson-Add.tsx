import React, { useState, useEffect } from "react";
import "./Lesson-Add.css";
import CourseBlock from "../../Ui/CourseBlock";
import CourseSearchPopup from "./CourseSearchPopup";
import MajorAreaPopup from "./MajorAreaPopup"; // MajorAreaPopup 다시 추가
import { fetchFilteredCourses, CourseData } from "../../../utils/api/api";
import { mapFiltersToParams } from "../../../utils/filterUtils";
import { Filters } from "../../../type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface LessonAddProps {
  onClose: () => void;
  onAddToSchedule: (course: CourseData) => void;
}

const LessonAdd: React.FC<LessonAddProps> = ({ onClose, onAddToSchedule }) => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseData[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState<"search" | "major" | null>(null); // 팝업 타입 관리
  const [activeFilter, setActiveFilter] = useState<keyof Filters>("title");
  const [searchValue, setSearchValue] = useState<string>("");

  const [filters, setFilters] = useState<Filters>({
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

  useEffect(() => {
    const params = mapFiltersToParams(filters, searchValue, activeFilter);
    console.log("Filters applied to API call:", filters);
    console.log("Mapped API parameters:", params);

    fetchFilteredCourses(params)
      .then((data) => {
        setCourses(data);
        setFilteredCourses(data);
        console.log("Fetched courses:", data);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, [filters, searchValue, activeFilter]);

  const handleSearchValueUpdate = (value: string) => {
    setSearchValue(value);
    setIsPopupVisible(false); // 팝업 닫기
  };

  const handleFilterUpdate = (filterName: keyof Filters, value: string) => {
    const updatedFilters = { ...filters };
    updatedFilters[filterName] = value;
    setFilters(updatedFilters);
    setIsPopupVisible(false); // 팝업 닫기
  };

  const handleFilterClear = (filterName: keyof Filters) => {
    const updatedFilters = { ...filters };
    updatedFilters[filterName] = "전체"; // 선택된 필터 초기화
    setFilters(updatedFilters);

    if (filterName === activeFilter) {
      setSearchValue(""); // 검색값 초기화
    }
  };

  const handleOpenPopup = (type: "search" | "major") => {
    setPopupType(type);
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setPopupType(null);
  };

  const handleSearchConditionChange = (condition: keyof Filters) => {
    setActiveFilter(condition);
  };

  return (
    <div className="lesson-add-overlay">
      <div className="lesson-add-container">
        <div className="arrow-container" onClick={onClose}>
          <div className="close-arrow">▼</div>
        </div>

        {/* 검색어 버튼 */}
        <div className="filter-container">
          <div className="filter-item" onClick={() => handleOpenPopup("search")}>
            <span className="filter-label">검색어:</span>
            <span className="filter-value">
              {searchValue !== "" ? searchValue : "없음"}
            </span>
            {searchValue !== "" && (
              <FontAwesomeIcon
                icon={faTimes}
                className="clear-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchValue(""); // 검색값 초기화
                }}
              />
            )}
          </div>
          <div className="filter-item" onClick={() => handleOpenPopup("major")}>
            <span className="filter-label">전공/영역:</span>
            <span className="filter-value">
              {filters.major !== "전체" ? filters.major : "없음"}
            </span>
            {filters.major !== "전체" && (
              <FontAwesomeIcon
                icon={faTimes}
                className="clear-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFilterClear("major");
                }}
              />
            )}
          </div>
        </div>

        {/* 팝업 */}
        {isPopupVisible && popupType === "search" && (
          <CourseSearchPopup
            onClose={handleClosePopup}
            onSearch={handleSearchValueUpdate}
            activeFilter={activeFilter}
            onConditionChange={handleSearchConditionChange}
          />
        )}
        {isPopupVisible && popupType === "major" && (
          <MajorAreaPopup
            onClose={handleClosePopup}
            onSelect={(value) => handleFilterUpdate("major", value)} // 전공 필터 업데이트
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
                onAdd={() => onAddToSchedule(course)}
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
