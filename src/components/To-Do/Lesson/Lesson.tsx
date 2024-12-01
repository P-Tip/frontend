import React, { useState, useEffect } from "react";
import "./Lesson.css";
import LessonAdd from "../Lesson-Add/Lesson-Add";
import AllMemos from "../Memo/AllMemos";
import MemoAdd from "../Memo/MemoAdd";
import { parseCourseTime, ScheduleBlock } from "../../../utils/parse_course_time";
import {
  filterTodayAllMemos,
  removeExpiredMemos,
} from "../../../utils/memo_utils";
import {
  getScheduleFromStorage,
  saveScheduleToStorage,
  removeBlockFromStorage,
} from "../../../utils/schedule_utils";
import { renderTimetable } from "../../../utils/lesson_render_utils";

const Lesson = () => {
  const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);
  const [isMemoAddVisible, setIsMemoAddVisible] = useState(false);
  const [isAllMemosPage, setIsAllMemosPage] = useState(false);
  const [todayMemos, setTodayMemos] = useState<{ title: string; time: string }[]>([]);
  const [schedule, setSchedule] = useState<ScheduleBlock[]>([]);

  // Today memos 업데이트
  const updateTodayMemos = () => {
    const filteredMemos = filterTodayAllMemos();
    console.log("[DEBUG] Filtered today memos:", filteredMemos);
    setTodayMemos(filteredMemos);
  };

  // 초기 데이터 로드
  useEffect(() => {
    console.log("[DEBUG] useEffect triggered - Initial data loading");

    // 메모 업데이트
    updateTodayMemos();

    // 스케줄 데이터 로드
    const storedSchedule = getScheduleFromStorage();
    console.log("[DEBUG] Stored schedule loaded from localStorage:", storedSchedule);
    setSchedule(storedSchedule);

    // 만료된 메모 제거
    const intervalId = setInterval(() => {
      removeExpiredMemos();
      updateTodayMemos();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  // 스케줄 추가 팝업 열기/닫기
  const openAddPopup = () => {
    console.log("[DEBUG] Add popup opened");
    setIsAddPopupVisible(true);
  };
  const closeAddPopup = () => {
    console.log("[DEBUG] Add popup closed");
    setIsAddPopupVisible(false);
  };

  // 메모 추가 팝업 열기/닫기
  const openMemoAdd = () => {
    console.log("[DEBUG] Memo add popup opened");
    setIsMemoAddVisible(true);
  };
  const closeMemoAdd = () => {
    console.log("[DEBUG] Memo add popup closed");
    setIsMemoAddVisible(false);
    updateTodayMemos();
  };

  // 전체 메모 페이지 열기
  const openAllMemosPage = () => {
    console.log("[DEBUG] All memos page opened");
    setIsAllMemosPage(true);
  };

  // 스케줄에 강의 추가
  const handleAddToSchedule = (course: {
    course_no: string;
    title: string;
    professor: string;
    course_time: string;
    classroom: string;
  }) => {
    const newBlocks = parseCourseTime(
      course.course_time,
      course.course_no,
      course.title,
      course.professor,
      course.classroom
    );
    console.log("[DEBUG] New course blocks parsed:", newBlocks);

    setSchedule((prev) => {
      const updatedSchedule = [...prev, ...newBlocks];
      console.log("[DEBUG] Updated schedule to save:", updatedSchedule);
      saveScheduleToStorage(updatedSchedule);
      return updatedSchedule;
    });
  };

  // 스케줄에서 블록 삭제
  const handleBlockDoubleClick = (block: ScheduleBlock) => {
    console.log("[DEBUG] Block double-clicked for deletion:", block);

    setSchedule((prev) => {
      const updatedSchedule = prev.filter(
        (b) =>
          b.course_no !== block.course_no ||
          b.day !== block.day ||
          b.time !== block.time
      );
      console.log("[DEBUG] Updated schedule after deletion:", updatedSchedule);
      removeBlockFromStorage(block);
      return updatedSchedule;
    });
  };

  // 전체 메모 페이지 렌더링
  if (isAllMemosPage) {
    console.log("[DEBUG] Rendering AllMemos page");
    return <AllMemos schedule={schedule} onClose={() => setIsAllMemosPage(false)} />;
  }

  // Lesson 페이지 렌더링
  console.log("[DEBUG] Rendering Lesson page with schedule:", schedule);

  return (
    <div className="lesson-page">
      <div className="lesson-list">
        <div className="lesson-header">
          <h2>To Do</h2>
          <button className="add-button" onClick={openAddPopup}>
            +
          </button>
        </div>
        <div className="schedule-container">
          {renderTimetable(schedule, handleBlockDoubleClick)}
        </div>

        <div className="memo-container">
          <h3>오늘</h3>
          <ul className="memo-list">
            {todayMemos.length > 0 ? (
              todayMemos.map((memo, index) => (
                <li key={index} className="memo-item">
                  <span className="memo-item-title">{memo.title}</span>
                  <span className="memo-item-time">{memo.time}</span>
                </li>
              ))
            ) : (
              <li className="no-memo">오늘의 메모가 없습니다.</li>
            )}
          </ul>
          <div className="memo-buttons">
            <button className="lesson-add-memo-button" onClick={openMemoAdd}>
              메모 추가
            </button>
            <button className="view-all-memo-button" onClick={openAllMemosPage}>
              전체 메모
            </button>
          </div>
        </div>
      </div>

      {isAddPopupVisible && (
        <LessonAdd onClose={closeAddPopup} onAddToSchedule={handleAddToSchedule} />
      )}
      {isMemoAddVisible && (
        <MemoAdd onClose={closeMemoAdd} schedule={schedule} updateMemos={updateTodayMemos} />
      )}
    </div>
  );
};

export default Lesson;
