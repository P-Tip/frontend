import React, { useEffect, useState } from 'react';
import PointBlock from '../components/MainPage/PointBlock';
import MenuBlock from '../components/MainPage/MenuBlock';
import TodoBlock from '../components/MainPage/TodoBlock';
import './MainPage.css';
import { ScheduleBlock } from '../utils/parse_course_time';
import { getScheduleFromStorage } from '../utils/schedule_utils';

const MainPage: React.FC = () => {
  // `schedule` 상태 추가
  const [schedule, setSchedule] = useState<ScheduleBlock[]>([]);

  // `useEffect`로 데이터 로드
  useEffect(() => {
    console.log("[DEBUG] Loading schedule data in MainPage");
    const storedSchedule = getScheduleFromStorage();
    console.log("[DEBUG] Schedule loaded:", storedSchedule);
    setSchedule(storedSchedule);
  }, []);

  return (
    <div className="container">
      {/* 한줄 문장 */}
      <p className="main-text">영차영차q(≧▽≦q)체육대회</p>

      {/* 정사각형 위젯 */}
      <div className="widget-container">
        <PointBlock />
        <MenuBlock />
      </div>
      <div className="widget-gap"></div>

      {/* 직사각형 위젯 */}
      <TodoBlock schedule={schedule} /> 
    </div>
  );
};

export default MainPage;
