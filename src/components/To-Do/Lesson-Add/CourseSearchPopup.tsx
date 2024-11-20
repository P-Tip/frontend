import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Search } from "lucide-react";
import "./CourseSearchPopup.css";

interface CourseSearchPopupProps {
  onClose: () => void;
  onSearch: (params: { [key: string]: string }) => void;
  storageKey: string;
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

const CourseSearchPopup: React.FC<CourseSearchPopupProps> = ({ onClose, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSearchType, setSelectedSearchType] = useState<keyof Filters>("title");

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }

    const queryParams = {
      [selectedSearchType]: searchTerm.trim(),
    };

    onSearch(queryParams);
    onClose();
  };

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <FontAwesomeIcon icon={faTimes} onClick={onClose} className="close-icon" />
          <input
            type="text"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="검색어를 입력하세요"
          />
          <Search className="search-icon" onClick={handleSearch} />
        </div>

        {/* 라디오 버튼 */}
        <div className="search-type-container">
          <label>
            <input
              type="radio"
              value="title"
              checked={selectedSearchType === "title"}
              onChange={() => setSelectedSearchType("title")}
            />
            과목명
          </label>
          <label>
            <input
              type="radio"
              value="professor"
              checked={selectedSearchType === "professor"}
              onChange={() => setSelectedSearchType("professor")}
            />
            교수명
          </label>
          <label>
            <input
              type="radio"
              value="courseNo"
              checked={selectedSearchType === "courseNo"}
              onChange={() => setSelectedSearchType("courseNo")}
            />
            과목코드
          </label>
          <label>
            <input
              type="radio"
              value="classroom"
              checked={selectedSearchType === "classroom"}
              onChange={() => setSelectedSearchType("classroom")}
            />
            장소
          </label>
        </div>
      </div>
    </div>
  );
};

export default CourseSearchPopup;
