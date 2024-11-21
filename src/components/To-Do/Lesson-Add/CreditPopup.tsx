import React, { useState } from "react";
import "./CreditPopup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import BoxItem from "../../Ui/BoxItem"; // BoxItem 컴포넌트 불러오기

interface CreditPopupProps {
  onClose: () => void;
  onApply: (credit: string) => void; // 선택된 학점 전달
}

const credits = [
  { label: "0학점", value: "0" },
  { label: "1학점", value: "1" },
  { label: "2학점", value: "2" },
  { label: "3학점", value: "3" },
  { label: "4학점 이상", value: "4+" },
];

const CreditPopup: React.FC<CreditPopupProps> = ({ onClose, onApply }) => {
  const [selectedCredit, setSelectedCredit] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelectedCredit(value); // 선택된 학점 업데이트
  };

  const handleApply = () => {
    if (selectedCredit) {
      onApply(selectedCredit); // 부모 컴포넌트로 전달
      onClose(); // 팝업 닫기
    } else {
      alert("학점을 선택하세요.");
    }
  };

  return (
    <div className="credit-popup-overlay" onClick={onClose}>
      <div
        className="credit-popup-container"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 팝업 닫기 방지
      >
        {/* 헤더 */}
        <div className="credit-popup-header">
          <FontAwesomeIcon icon={faArrowLeft} className="back-icon" onClick={onClose} />
          <h1 className="popup-title">학점</h1>
          <button className="apply-button" onClick={handleApply}>
            적용
          </button>
        </div>

        {/* 학점 리스트 */}
        <div className="credit-popup-content">
          {credits.map((credit, index) => (
            <BoxItem
              key={index}
              label={credit.label}
              onClick={() => handleSelect(credit.value)} // value를 선택
              isSelected={selectedCredit === credit.value} // 선택 상태 전달
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreditPopup;
