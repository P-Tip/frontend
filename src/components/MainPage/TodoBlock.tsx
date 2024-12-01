import React from "react";
import "./TodoBlock.css";
import MemoBlock from "./TodoBlock/MemoBlock";
import { ScheduleBlock } from "../../utils/parse_course_time";
import { renderMainTimetable } from "../../utils/lesson_render_utils"; // 새로운 유틸리티 함수 import


// TodoBlock에 schedule props 타입 추가
interface TodoBlockProps {
  schedule?: ScheduleBlock[]; // schedule을 선택적으로 받아옴
}

const TodoBlock: React.FC<TodoBlockProps> = ({ schedule = [] }) => {
  console.log("[DEBUG] Rendering TodoBlock with schedule:", schedule);

  return (
    <div className="block-ToDo">
      <p className="todoblock-text">To Do</p>

      {/* renderMainTimetable 사용 */}
      {renderMainTimetable(schedule)}

      <div className="main-memo-container">
        <MemoBlock />
      </div>
    </div>
  );
};

export default TodoBlock;
