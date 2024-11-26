import React, { useState, useEffect } from "react";
import "./Lesson.css";
import LessonAdd from "../Lesson-Add/Lesson-Add";
import AllMemos from "../Memo/AllMemos";
import MemoAdd from "../Memo/MemoAdd";
import { parseCourseTime, ScheduleBlock } from "../../../utils/parse_course_time";
import { filterTodayAllMemos, removeExpiredMemos } from "../../../utils/memo_utils"; // 삭제 함수 추가
import { getScheduleFromStorage, saveScheduleToStorage } from "../../../utils/schedule_utils";

const Lesson = () => {
  const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);
  const [isMemoAddVisible, setIsMemoAddVisible] = useState(false);
  const [isAllMemosPage, setIsAllMemosPage] = useState(false); // 전체 메모 페이지 상태
  const [todayMemos, setTodayMemos] = useState<{ title: string; time: string }[]>([]);
  const [schedule, setSchedule] = useState<ScheduleBlock[]>([]);

  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const updateTodayMemos = () => {
    const today = getTodayDate();
    const filteredMemos = filterTodayAllMemos();
    setTodayMemos(filteredMemos);
  };

  useEffect(() => {
    updateTodayMemos();
    const storedSchedule = getScheduleFromStorage();
    setSchedule(storedSchedule);

    // 1분마다 기한이 지난 메모 삭제
    const intervalId = setInterval(() => {
      removeExpiredMemos(); // 삭제 함수 실행
      updateTodayMemos(); // 메모 상태 업데이트
    }, 60000); // 1분 간격 실행

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 클리어
  }, []);

  const openAddPopup = () => setIsAddPopupVisible(true);
  const closeAddPopup = () => setIsAddPopupVisible(false);

  const openMemoAdd = () => setIsMemoAddVisible(true);
  const closeMemoAdd = () => {
    setIsMemoAddVisible(false);
    updateTodayMemos();
  };

  const openAllMemosPage = () => setIsAllMemosPage(true); // 전체 메모 페이지로 이동

  const handleAddToSchedule = (course: {
    course_no: string;
    title: string;
    professor: string;
    course_time: string;
    classroom: string;
  }) => {
    const blocks = parseCourseTime(
      course.course_time,
      course.course_no,
      course.title,
      course.professor,
      course.classroom
    );

    setSchedule((prev) => {
      const updatedSchedule = [...prev];
      blocks.forEach((newBlock) => {
        const exists = updatedSchedule.some(
          (b) => b.day === newBlock.day && b.time === newBlock.time
        );
        if (!exists) {
          updatedSchedule.push(newBlock);
        }
      });

      saveScheduleToStorage(updatedSchedule);
      return updatedSchedule;
    });
  };

  const renderCellContent = (row: number, col: number) => {
    const block = schedule.find((b) => b.day === col && b.time === row);

    if (block) {
      const relatedBlocks = schedule.filter(
        (b) => b.day === col && b.course_no === block.course_no
      );
      const rowSpan = relatedBlocks.length;

      if (block.time === row) {
        return (
          <div
            className="block-content"
            style={{ gridRow: `span ${rowSpan}`, backgroundColor: "#a3d3c3" }}
          >
            <h3>{block.title}</h3>
            <p>{block.professor}</p>
            <p>{block.course_time}</p>
            <p>{block.classroom}</p>
          </div>
        );
      }
      return <div className="block-placeholder" style={{ gridRow: `span 1` }} />;
    }

    return <div className="empty-cell"></div>;
  };

  // 전체 메모 페이지 상태일 경우 AllMemos 컴포넌트 렌더링
  if (isAllMemosPage) {
    return <AllMemos schedule={schedule} onClose={() => setIsAllMemosPage(false)} />;
  }
  

  // 기본 Lesson UI 렌더링
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((row) => (
            <React.Fragment key={`row-${row}`}>
              <div className="time-column">{row}</div>
              {[1, 2, 3, 4, 5].map((col) => (
                <div key={`cell-${row}-${col}`} className="cell">
                  {renderCellContent(row, col)}
                </div>
              ))}
            </React.Fragment>
          ))}
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
