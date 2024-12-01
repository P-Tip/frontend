import React from "react";
import { ScheduleBlock } from "./parse_course_time";

export const renderTimetable = (
  schedule: ScheduleBlock[],
  handleBlockDoubleClick: (block: ScheduleBlock) => void
) => {
  const rows = 9;
  const cols = 5;

  return Array.from({ length: rows }, (_, rowIndex) => (
    <React.Fragment key={`row-${rowIndex + 1}`}>
      {/* 시간 표시 열 */}
      <div className="time-column">{rowIndex + 1}</div>
      {Array.from({ length: cols }, (_, colIndex) => {
        const col = colIndex + 1;

        // 병합된 셀 확인
        const block = schedule.find(
          (b) =>
            b.day === col &&
            rowIndex + 1 >= b.time && // 현재 셀이 블록의 시작 혹은 포함된 시간인지 확인
            rowIndex + 1 < b.time + b.rowSpan
        );

        // 병합된 블록의 첫 번째 셀만 렌더링
        if (block && block.time === rowIndex + 1) {
          return (
            <div
              key={`cell-${rowIndex + 1}-${col}`}
              className="block-wrapper" // 추가된 wrapper
              style={{
                gridRow: `span ${block.rowSpan}`, // 병합된 블록 높이 설정
              }}
            >
              <div
                className="block-content"
                onDoubleClick={() => handleBlockDoubleClick(block)}
              >
                {/* 헤더 섹션: 과목명과 교수명 */}
                <div className="block-header">
                  <h3 className="block-title">{block.title}</h3>
                  <p className="block-professor">{block.professor}</p>
                </div>

                {/* 하단 섹션: 시간과 강의실 */}
                <div className="block-footer">
                  <span className="block-time">{block.course_time}</span>
                  <span className="block-classroom">{block.classroom}</span>
                </div>
              </div>
            </div>
          );
        }

        // 병합된 블록의 나머지 셀은 무시
        if (block) {
          return null; // 렌더링 스킵
        }

        // 블록이 없는 빈 셀 렌더링
        return <div key={`cell-${rowIndex + 1}-${col}`} className="empty-cell"></div>;
      })}
    </React.Fragment>
  ));
};
 

export const renderMainTimetable = (schedule: ScheduleBlock[]) => {
  console.log("[DEBUG] Rendering Main Timetable with schedule:", schedule);

  const days = ["월", "화", "수", "목", "금"]; // 요일 배열

  return (
    <div className="main-timetable-container">
      {days.map((day, dayIndex) => {
        // 현재 요일에 해당하는 블록 필터링
        const daySchedule = schedule.filter((block) => block.day === dayIndex + 1);
        console.log(`[DEBUG] Filtered schedule for ${day}:`, daySchedule);

        return (
          <div className="main-day-column" key={dayIndex}>
            {/* 필터된 블록만 렌더링 */}
            {daySchedule.slice(0, 3).map((block, blockIndex) => (
              <div className="main-lesson-block" key={`filled-${dayIndex}-${blockIndex}`}>
                <p className="main-block-title">{block.title}</p>
                <p className="main-block-time">{block.course_time}</p>
                <p className="main-block-classroom">{block.classroom}</p>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
