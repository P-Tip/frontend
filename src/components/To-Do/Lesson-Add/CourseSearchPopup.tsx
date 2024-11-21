import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Search } from "lucide-react";
import "./CourseSearchPopup.css";
import { Filters } from "../../../type"; // Filters 타입 가져오기

interface CourseSearchPopupProps {
  onClose: () => void;
  onSearch: (value: string) => void;
  activeFilter: keyof Filters; // 동일한 Filters 타입 참조
  onConditionChange: (condition: keyof Filters) => void;
}

const CourseSearchPopup: React.FC<CourseSearchPopupProps> = ({
  onClose,
  onSearch,
  activeFilter,
  onConditionChange,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }

    console.log(`Executing search with filter: ${activeFilter}, term: ${searchTerm}`);
    onSearch(searchTerm.trim());
    onClose();
  };

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <FontAwesomeIcon
            icon={faTimes}
            onClick={onClose}
            className="close-icon"
          />
          <input
            type="text"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Enter ${activeFilter}...`}
          />
          <Search className="search-icon" onClick={handleSearch} />
        </div>

        {/* 라디오 버튼 */}
        <div className="search-type-container">
          <label>
            <input
              type="radio"
              value="title"
              checked={activeFilter === "title"}
              onChange={() => onConditionChange("title")}
            />
            과목명
          </label>
          <label>
            <input
              type="radio"
              value="professor"
              checked={activeFilter === "professor"}
              onChange={() => onConditionChange("professor")}
            />
            교수명
          </label>
          <label>
            <input
              type="radio"
              value="courseNo"
              checked={activeFilter === "courseNo"}
              onChange={() => onConditionChange("courseNo")}
            />
            과목코드
          </label>
          <label>
            <input
              type="radio"
              value="classroom"
              checked={activeFilter === "classroom"}
              onChange={() => onConditionChange("classroom")}
            />
            장소
          </label>
        </div>
      </div>
    </div>
  );
};

export default CourseSearchPopup;
