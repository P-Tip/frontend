import React, { useState } from "react";
import "./MemoAdd.css";
import { addMemoToCourse } from "../../../utils/memo_utils";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";

const MemoAdd = ({
  onClose,
  schedule,
  updateMemos,
}: {
  onClose: () => void;
  schedule: {
    course_no: string;
    title: string;
    professor: string;
    course_time: string;
    classroom: string;
  }[];
  updateMemos: () => void;
}) => {
  const [selectedCourse, setSelectedCourse] = useState<string>(""); // 선택된 수업
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null); // 선택된 날짜
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null); // 선택된 시간
  const [memoContent, setMemoContent] = useState(""); // 메모 내용

  // 드롭다운 상태 관리
  const [isDropdownOpen, setIsDropdownOpen] = useState<{
    course: boolean;
    date: boolean;
    time: boolean;
    memo: boolean;
  }>({
    course: false,
    date: false,
    time: false,
    memo: false,
  });

  // 드롭다운 토글 함수
  const toggleDropdown = (key: keyof typeof isDropdownOpen) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [key]: !prev[key], // 기존 키의 값을 토글
    }));
  };

  // 메모 추가 처리 함수
  const handleAddMemo = () => {
    if (selectedCourse && selectedDate && selectedTime && memoContent) {
      const newMemo = {
        date: selectedDate.format("YYYY-MM-DD"),
        time: selectedTime.format("HH:mm"),
        title: memoContent,
        content: memoContent,
      };

      addMemoToCourse(selectedCourse, newMemo); // 유틸리티 함수 호출로 메모 추가

      updateMemos(); // 메모 리스트 업데이트
      onClose(); // 모달 닫기
    } else {
      alert("모든 필드를 채워주세요."); // 필수 입력 필드 확인
    }
  };

  return (
    <div className="memo-add-overlay">
      <div className="memo-add-container">
        {/* 상단 닫기 버튼 */}
        <div className="memo-add-header">
          <div className="arrow-container" onClick={onClose}>
            <div className="close-arrow">▼</div>
          </div>
        </div>

        {/* 완료 버튼 */}
        <div className="memo-add-complete">
          <button onClick={handleAddMemo} className="add-memo-button">
            완료
          </button>
        </div>

        {/* 드롭다운 카테고리 */}
        <div className="dropdown-categories">
          {/* 수업 드롭다운 */}
          <div className="dropdown-category">
            <div
              className="dropdown-header"
              onClick={() => toggleDropdown("course")}
            >
              <div className="dropdown-header-text">수업</div>
              <div className="dropdown-selected-item">
                {selectedCourse || ""}
              </div>
              <div className="dropdown-icon">▼</div>
            </div>
            {isDropdownOpen.course && (
              <div className="dropdown-options">
                {schedule.length > 0 ? (
                  schedule.map((course, index) => (
                    <div
                      key={index}
                      className="dropdown-item"
                      onClick={() => {
                        setSelectedCourse(course.title);
                        toggleDropdown("course");
                      }}
                    >
                      <div className="dropdown-item-header">
                        {course.title} <span>{course.professor}</span>
                      </div>
                      <div className="dropdown-item-details">
                        {course.course_time} → {course.classroom}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="dropdown-no-data">
                    시간표에 추가된 수업이 없습니다.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 날짜 드롭다운 */}
          <div className="dropdown-category">
            <div
              className="dropdown-header"
              onClick={() => toggleDropdown("date")}
            >
              <div className="dropdown-header-text">날짜</div>
              <div className="dropdown-selected-item">
                {selectedDate
                  ? selectedDate.format("YYYY-MM-DD")
                  : ""}
              </div>
              <div className="dropdown-icon">▼</div>
            </div>
            {isDropdownOpen.date && (
              <div className="dropdown-options">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                  />
                </LocalizationProvider>
              </div>
            )}
          </div>

          {/* 시간 드롭다운 */}
          <div className="dropdown-category">
            <div
              className="dropdown-header"
              onClick={() => toggleDropdown("time")}
            >
              <div className="dropdown-header-text">시간</div>
              <div className="dropdown-selected-item">
                {selectedTime ? selectedTime.format("HH:mm") : ""}
              </div>
              <div className="dropdown-icon">▼</div>
            </div>
            {isDropdownOpen.time && (
              <div className="dropdown-options">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    value={selectedTime}
                    onChange={(newValue) => setSelectedTime(newValue)}
                  />
                </LocalizationProvider>
              </div>
            )}
          </div>

          {/* 메모 드롭다운 */}
          <div className="dropdown-category">
            <div
              className="dropdown-header"
              onClick={() => toggleDropdown("memo")}
            >
              <div className="dropdown-header-text">메모 내용</div>
              <div className="dropdown-selected-item">
                {memoContent || ""}
              </div>
              <div className="dropdown-icon">▼</div>
            </div>
            {isDropdownOpen.memo && (
              <div className="dropdown-options">
                <textarea
                  value={memoContent}
                  onChange={(e) => setMemoContent(e.target.value)}
                  placeholder="메모 내용을 입력하세요"
                  rows={4}
                  className="memo-textarea"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoAdd;
