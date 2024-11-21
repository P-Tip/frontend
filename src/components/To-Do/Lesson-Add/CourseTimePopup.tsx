import React, { useState } from "react";
import "./CourseTimePopup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface CourseTimePopupProps {
  onClose: () => void;
  onApply: (times: string) => void; // 필터 적용 시 호출
}

const days = ["월", "화", "수", "목", "금"];
const periods = Array.from({ length: 9 }, (_, i) => i + 1); // 1~9교시

const CourseTimePopup: React.FC<CourseTimePopupProps> = ({ onClose, onApply }) => {
  const [selectedTimes, setSelectedTimes] = useState<boolean[][]>(
    Array.from({ length: 9 }, () => Array(5).fill(false)) // 9교시 x 5요일
  );

  // 셀 선택 토글
  const toggleCell = (row: number, col: number) => {
    const updatedTimes = [...selectedTimes];
    updatedTimes[row][col] = !updatedTimes[row][col];
    setSelectedTimes(updatedTimes);
  };

  // 선택된 데이터를 `times` 문자열로 변환
  const generateTimesString = (): string => {
    return days
      .map((day, col) => {
        const selectedPeriods = periods
          .filter((_, row) => selectedTimes[row][col]) // 선택된 교시만 필터링
          .join(""); // 연속된 교시를 하나의 문자열로 연결
        return selectedPeriods ? `${day}${selectedPeriods}` : ""; // 요일+교시 형태
      })
      .filter(Boolean)
      .join(","); // 쉼표로 구분
  };

  // 적용 버튼 클릭
  const handleApply = () => {
    const timesString = generateTimesString();
    onApply(timesString);
    onClose();
  };

  return (
    <div className="times-popup-container" onClick={onClose}>
      <div
        className="times-popup-content"
        onClick={(e) => e.stopPropagation()} // 오버레이 클릭 시 닫기 방지
      >
        {/* 헤더 */}
        <div className="times-popup-header">
          <FontAwesomeIcon icon={faArrowLeft} className="back-icon" onClick={onClose} />
          <h1 className="popup-title">시간</h1>
          <button className="apply-button" onClick={handleApply}>
            적용
          </button>
        </div>

        {/* 시간표 */}
        <div className="time-table">
          {periods.map((period, rowIndex) => (
            <div key={rowIndex} className="time-row">
              <div className="time-cell header-cell">{period}</div>
              {days.map((_, colIndex) => (
                <div
                  key={colIndex}
                  className={`time-cell ${selectedTimes[rowIndex][colIndex] ? "selected" : ""}`}
                  onClick={() => toggleCell(rowIndex, colIndex)}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseTimePopup;
