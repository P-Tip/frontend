import React, { useState, useEffect } from "react";
import "./Lesson-Add.css";
import CourseBlock from "../../Ui/CourseBlock";
import CourseSearchPopup from "./CourseSearchPopup";
import MajorAreaPopup from "./MajorAreaPopup";
import GradePopup from "./GradePopup";
import CourseTypePopup from "./CourseTypePopup";
import CourseTimePopup from "./CourseTimePopup";
import CreditPopup from "./CreditPopup"; // 학점 팝업 추가
import { fetchFilteredCourses, CourseData } from "../../../utils/api/api";
import { mapFiltersToParams, Filters, initializeFilters } from "../../../utils/filterUtils";
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
  const [popupType, setPopupType] = useState<"search" | "major" | "grade" | "courseTypeFilter" | "time" | "credit" | null>(
    null
  ); // 학점 필터 추가
  const [activeFilter, setActiveFilter] = useState<keyof Filters>("title");
  const [searchValue, setSearchValue] = useState<string>("");

  const [filters, setFilters] = useState<Filters>(initializeFilters());

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
    setIsPopupVisible(false);
  };

  const handleFilterUpdate = (filterName: keyof Filters, value: string) => {
    const updatedFilters = { ...filters };
    updatedFilters[filterName] = value;
    setFilters(updatedFilters);
    setIsPopupVisible(false);
  };

  const handleFilterClear = (filterName: keyof Filters) => {
    const updatedFilters = { ...filters };
    updatedFilters[filterName] = "전체";
    setFilters(updatedFilters);

    if (filterName === activeFilter) {
      setSearchValue("");
    }
  };

  const handleOpenPopup = (
    type: "search" | "major" | "grade" | "courseTypeFilter" | "time" | "credit"
  ) => {
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

        {/* 필터 버튼들 */}
        <div className="filter-container">
          <div className="filter-item" onClick={() => handleOpenPopup("search")}>
            <span className="filter-label">검색어:</span>
            <span className="filter-value">{searchValue || "없음"}</span>
            {searchValue && (
              <FontAwesomeIcon
                icon={faTimes}
                className="clear-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchValue("");
                }}
              />
            )}
          </div>
          <div className="filter-item" onClick={() => handleOpenPopup("major")}>
            <span className="filter-label">전공/영역:</span>
            <span className="filter-value">{filters.major || "없음"}</span>
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
          <div className="filter-item" onClick={() => handleOpenPopup("grade")}>
            <span className="filter-label">학년:</span>
            <span className="filter-value">{filters.grade || "없음"}</span>
            {filters.grade !== "전체" && (
              <FontAwesomeIcon
                icon={faTimes}
                className="clear-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFilterClear("grade");
                }}
              />
            )}
          </div>
          <div className="filter-item" onClick={() => handleOpenPopup("time")}>
            <span className="filter-label">시간:</span>
            <span className="filter-value">{filters.times || "없음"}</span>
            {filters.times !== "전체" && (
              <FontAwesomeIcon
                icon={faTimes}
                className="clear-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFilterClear("times");
                }}
              />
            )}
          </div>
          <div className="filter-item" onClick={() => handleOpenPopup("courseTypeFilter")}>
            <span className="filter-label">구분:</span>
            <span className="filter-value">{filters.courseTypeFilter || "없음"}</span>
            {filters.courseTypeFilter !== "전체" && (
              <FontAwesomeIcon
                icon={faTimes}
                className="clear-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFilterClear("courseTypeFilter");
                }}
              />
            )}
          </div>
          <div className="filter-item" onClick={() => handleOpenPopup("credit")}>
            <span className="filter-label">학점:</span>
            <span className="filter-value">{filters.credit || "없음"}</span>
            {filters.credit !== "전체" && (
              <FontAwesomeIcon
                icon={faTimes}
                className="clear-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFilterClear("credit");
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
            onSelect={(value) => handleFilterUpdate("major", value)}
          />
        )}
        {isPopupVisible && popupType === "grade" && (
          <GradePopup
            onClose={handleClosePopup}
            onSelect={(value) => handleFilterUpdate("grade", value)}
          />
        )}
        {isPopupVisible && popupType === "courseTypeFilter" && (
          <CourseTypePopup
            onClose={handleClosePopup}
            onApply={(value) => handleFilterUpdate("courseTypeFilter", value)}
          />
        )}
        {isPopupVisible && popupType === "time" && (
          <CourseTimePopup
            onClose={handleClosePopup}
            onApply={(value) => handleFilterUpdate("times", value)}
          />
        )}
        {isPopupVisible && popupType === "credit" && (
          <CreditPopup
            onClose={handleClosePopup}
            onApply={(value) => handleFilterUpdate("credit", value)}
          />
        )}

        {/* 강의 리스트 */}
        <div className="course-list">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseBlock
                key={course.course_no}
                {...course}
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
