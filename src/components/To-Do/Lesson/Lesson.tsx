import React from "react";
import "./Lesson.css";

const Lesson = () => {
  return (
    <div className="lesson-page">
      <div className="lesson-list">
        {/* 헤더 */}
        <div className="lesson-header">
          <h2>To Do</h2>
          <button className="add-button">+</button>
        </div>

        {/* 시간표 컨테이너 */}
        <div className="schedule-container">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((row) => (
            <React.Fragment key={`row-${row}`}>
              {/* 시간 열 */}
              <div className="time-column">{row}</div>

              {/* 각 셀 */}
              {[1, 2, 3, 4, 5].map((col) => (
                <div key={`cell-${row}-${col}`} className="cell empty-cell"></div>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* 메모 컨테이너 */}
        <div className="memo-container">
          {/* 오늘 */}
          <div className="today-memo">
            <h3>오늘</h3>
            <ul className="memo-list">
              {/* 메모 내용 비어 있음 */}
            </ul>
          </div>

          {/* 메모 액션 버튼 */}
          <div className="memo-actions">
            <button className="add-memo">+ 메모 추가</button>
            <button className="view-all-memos">전체 메모</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
