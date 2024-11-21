import React, { useState } from "react";
import "./MajorAreaPopup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import BoxItem from "../../Ui/BoxItem"; // UI 컴포넌트 불러오기

interface MajorAreaPopupProps {
  onClose: () => void;
  onSelect: (value: string) => void; // 필터에 반영할 값 전달
}

const categories = [
  { label: "교양", hasSubcategories: true },
  { label: "전공 - IT공과대학", hasSubcategories: true },
  { label: "전공 - 국제물류대학", hasSubcategories: true },
  { label: "전공 - 사회서비스대학", hasSubcategories: true },
  { label: "전공 - 문화예술대학", hasSubcategories: true },
  { label: "전공 - 피어선칼리지", hasSubcategories: true },
  { label: "융복합전공", hasSubcategories: true },
];

const subcategories: Record<string, { label: string; hasSubcategories: boolean }[]> = {
  "교양": [
    { label: "대교", hasSubcategories: false },
    { label: "P교", hasSubcategories: true },
    { label: "교선", hasSubcategories: true },
    { label: "전교", hasSubcategories: false },
  ],
  "P교": [
    { label: "제1영역 (심 성격적인성)", hasSubcategories: false },
    { label: "제2영역 (협 공동체적협업)", hasSubcategories: false },
    { label: "제3영역 (창 창의적도전)", hasSubcategories: false },
  ],
  "교선": [
    { label: "제1영역 (인문학과예술)", hasSubcategories: false },
    { label: "제2영역 (사회와문화)", hasSubcategories: false },
    { label: "제3영역 (자연과기술)", hasSubcategories: false },
    { label: "제4영역 (외국어와의사소통)", hasSubcategories: false },
    { label: "제5영역 (진로설계와 취.창업)", hasSubcategories: false },
  ],
  "전공 - IT공과대학": [
    { label: "스마트자동차학과", hasSubcategories: false },
    { label: "융합소프트웨어학과", hasSubcategories: false },
    { label: "정보통신학과", hasSubcategories: false },
    { label: "데이터정보학과", hasSubcategories: false },
    { label: "반도체디스플레이장비운영학과", hasSubcategories: false },
    { label: "ICT융합학부", hasSubcategories: true },
  ],
  "ICT융합학부": [
    { label: "스마트모빌리티학과", hasSubcategories: false },
    { label: "미디어디자인전공", hasSubcategories: false },
    { label: "스마트콘텐츠전공", hasSubcategories: false },
    { label: "ICT환경융합전공", hasSubcategories: false },
    { label: "미디어디자인학과", hasSubcategories: false },
    { label: "스마트콘텐츠학과", hasSubcategories: false },
    { label: "ICT환경융합학과", hasSubcategories: false },
  ],
  "전공 - 국제물류대학": [
    { label: "국제물류학과", hasSubcategories: false },
    { label: "국제무역행정학과", hasSubcategories: false },
    { label: "도시계획부동산학과", hasSubcategories: false },
    { label: "경영학과", hasSubcategories: false },
    { label: "국제도시부동산학과", hasSubcategories: false },
    { label: "국제지역학부", hasSubcategories: true },
  ],
  "국제지역학부": [
    { label: "미국학전공", hasSubcategories: false },
    { label: "중국학전공", hasSubcategories: false },
    { label: "일본학전공", hasSubcategories: false },
  ],
  "전공 - 사회서비스대학": [
    { label: "사회복지학과", hasSubcategories: false },
    { label: "재활상담학과", hasSubcategories: false },
    { label: "간호학과", hasSubcategories: false },
    { label: "신학과", hasSubcategories: false },
    { label: "광고홍보학과", hasSubcategories: false },
    { label: "아동.청소년교육상담학과", hasSubcategories: false },
  ],
  "전공 - 문화예술대학": [
    { label: "커뮤니케이션디자인학과", hasSubcategories: false },
    { label: "패션디자인및브랜딩학과", hasSubcategories: false },
    { label: "공연영상콘텐츠학과", hasSubcategories: false },
    { label: "실용음악학과", hasSubcategories: false },
    { label: "음악학과", hasSubcategories: false },
    { label: "연극영화과", hasSubcategories: false },
  ],
  "전공 - 피어선칼리지": [
    { label: "창업융복합전공", hasSubcategories: false },
    { label: "다문화한국어교육융복합전공", hasSubcategories: false },
    { label: "스마트반도체시스템융복합전공", hasSubcategories: false },
    { label: "산업ioT융복합전공", hasSubcategories: false },
  ],
  "융복합전공": [
    { label: "다문화한국어교육융복합전공", hasSubcategories: false },
    { label: "산업ioT융복합전공", hasSubcategories: false },
    { label: "스마트반도체시스템융복합전공", hasSubcategories: false },
    { label: "창업융복합전공", hasSubcategories: false },
  ],
};

const MajorAreaPopup: React.FC<MajorAreaPopupProps> = ({ onClose, onSelect }) => {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    onSelect(value); // 부모로 선택 값 전달
    onClose(); // 팝업 닫기
  };

  const displayedItems = currentCategory
    ? subcategories[currentCategory] || []
    : categories;

  const handleBack = () => {
    if (currentCategory) setCurrentCategory(null);
    else onClose();
  };

  return (
    <div className="major-area-popup-overlay" onClick={onClose}>
      <div
        className="major-area-popup-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="major-area-popup-header">
          <FontAwesomeIcon icon={faArrowLeft} className="back-icon" onClick={handleBack} />
          <h1 className="popup-title">{currentCategory || "전공/영역"}</h1>
        </div>

        {/* 리스트 */}
        <div className="major-area-popup-content">
          {displayedItems.map((item, index) => (
            <BoxItem
              key={index}
              label={item.label}
              onClick={() =>
                item.hasSubcategories
                  ? setCurrentCategory(item.label) // 하위 카테고리로 이동
                  : handleSelect(item.label) // 바로 필터에 반영
              }
              hasSubcategories={item.hasSubcategories} // 하위 카테고리 여부 전달
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MajorAreaPopup;
