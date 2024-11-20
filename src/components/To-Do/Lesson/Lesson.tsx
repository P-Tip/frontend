import React, { useState } from "react";
import "./Lesson.css";
import LessonAdd from "../Lesson-Add/Lesson-Add";
import { parseCourseTime, ScheduleBlock } from "../../../utils/parse_course_time";

const Lesson = () => {
  const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);  // 팝업 상태 관리
  const [schedule, setSchedule] = useState<ScheduleBlock[]>([]);

  // 팝업 열기 함수
  const openAddPopup = () => setIsAddPopupVisible(true);

  // 팝업 닫기 함수
  const closeAddPopup = () => setIsAddPopupVisible(false);

  // 스케줄에 강의 추가하기
  const handleAddToSchedule = (course: {
    course_no: string;
    title: string;
    professor: string;
    course_time: string;
    classroom: string;
  }) => {
    console.log(`Adding course: ${JSON.stringify(course)}`);
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
      return updatedSchedule;
    });
  };

  // 셀에 내용 렌더링
  const renderCellContent = (row: number, col: number) => {
    const block = schedule.find((b) => b.day === col && b.time === row);
    if (block) {
      const relatedBlocks = schedule.filter((b) => b.day === col && b.course_no === block.course_no);
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
    }
    return <div className="empty-cell"></div>;
  };

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
                <div
                  key={`cell-${row}-${col}`}
                  className="cell"
                  onDoubleClick={() =>
                    setSchedule((prev) =>
                      prev.filter((b) => !(b.day === col && b.time === row))
                    )
                  }
                >
                  {renderCellContent(row, col)}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 팝업 렌더링: 상태가 true일 때만 렌더링 */}
      {isAddPopupVisible && (
        <LessonAdd onClose={closeAddPopup} onAddToSchedule={handleAddToSchedule} />
      )}
    </div>
  );
};

export default Lesson;