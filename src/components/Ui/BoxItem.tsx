import React from "react";
import "./BoxItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface BoxItemProps {
  label: string;
  onClick: () => void;
  isSelected?: boolean; // 선택 상태
  hasSubcategories?: boolean; // 하위 카테고리 여부
}

const BoxItem: React.FC<BoxItemProps> = ({
  label,
  onClick,
  isSelected = false,
  hasSubcategories = false, // 기본값 false로 설정
}) => {
  return (
    <div
      className={`box-item ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <span>{label}</span>
      {hasSubcategories && ( // 하위 카테고리가 있을 때만 아이콘 표시
        <FontAwesomeIcon icon={faChevronRight} className="chevron-icon" />
      )}
    </div>
  );
};

export default BoxItem;
