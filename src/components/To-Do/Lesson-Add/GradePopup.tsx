import React, { useState } from "react";
import "./GradePopup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import BoxItem from "../../Ui/BoxItem"; // BoxItem 컴포넌트 불러오기

interface GradePopupProps {
  onClose: () => void;
  onSelect: (value: string) => void; // 선택된 학년 전달
}

const grades = [
  { label: "1", selectable: true },
  { label: "2", selectable: true },
  { label: "3", selectable: true },
  { label: "4", selectable: true },
  { label: "기타", selectable: true },
];

const GradePopup: React.FC<GradePopupProps> = ({ onClose, onSelect }) => {
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelectedGrade(value); // 선택된 학년 업데이트
    onSelect(value); // 부모 컴포넌트에 선택 값 전달
  };

  const handleApply = () => {
    if (selectedGrade) {
      onClose(); // 팝업 닫기
    } else {
      alert("학년을 선택하세요.");
    }
  };

  return (
    <div className="grade-popup-overlay" onClick={onClose}>
      <div
        className="grade-popup-container"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 팝업 닫기 방지
      >
        {/* 헤더 */}
        <div className="grade-popup-header">
          <FontAwesomeIcon icon={faArrowLeft} className="back-icon" onClick={onClose} />
          <h1 className="popup-title">학년</h1>
        </div>

        {/* 학년 리스트 */}
        <div className="grade-popup-content">
          {grades.map((grade, index) => (
            <BoxItem
              key={index}
              label={grade.label}
              onClick={() => handleSelect(grade.label)}
              isSelected={selectedGrade === grade.label} // 선택 상태 전달
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradePopup;
