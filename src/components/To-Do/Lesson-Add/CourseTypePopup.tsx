import React, { useState } from "react";
import "./CourseTypePopup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import BoxItem from "../../Ui/BoxItem"; // BoxItem 컴포넌트 불러오기

interface CourseTypePopupProps {
  onClose: () => void;
  onApply: (courseTypes: string) => void; // 선택된 구분 전달
}

const courseTypes = [
  { label: "대교", selectable: true },
  { label: "P교", selectable: true },
  { label: "교선", selectable: true },
  { label: "전교", selectable: true },
  { label: "전필", selectable: true },
  { label: "융전", selectable: true },
];

const CourseTypePopup: React.FC<CourseTypePopupProps> = ({ onClose, onApply }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]); // 여러 선택 가능

  // 선택/해제 토글
  const toggleSelect = (value: string) => {
    setSelectedTypes((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((type) => type !== value) // 이미 선택된 경우 해제
        : [...prevSelected, value] // 선택되지 않은 경우 추가
    );
  };

  // 적용 버튼 클릭
  const handleApply = () => {
    if (selectedTypes.length > 0) {
      const selectedTypesString = selectedTypes.join(","); // 쉼표로 구분된 문자열 생성
      onApply(selectedTypesString); // 부모 컴포넌트로 전달
      onClose(); // 팝업 닫기
    } else {
      alert("구분을 하나 이상 선택하세요.");
    }
  };

  return (
    <div className="course-type-popup-overlay" onClick={onClose}>
      <div
        className="course-type-popup-container"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 팝업 닫기 방지
      >
        {/* 헤더 */}
        <div className="course-type-popup-header">
          <FontAwesomeIcon icon={faArrowLeft} className="back-icon" onClick={onClose} />
          <h1 className="popup-title">구분</h1>
          <button className="apply-button" onClick={handleApply}>
            적용
          </button>
        </div>

        {/* 구분 리스트 */}
        <div className="course-type-popup-content">
          {courseTypes.map((type, index) => (
            <BoxItem
              key={index}
              label={type.label}
              onClick={() => toggleSelect(type.label)} // 선택/해제
              isSelected={selectedTypes.includes(type.label)} // 다중 선택 상태 확인
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseTypePopup;
