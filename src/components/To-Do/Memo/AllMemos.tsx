import React, { useEffect, useState } from "react";
import "./AllMemos.css";
import MemoAdd from "./MemoAdd";
import {
  filterTodayAllMemos,
  filterMemosByWeekAll,
  removeExpiredMemos,
} from "../../../utils/memo_utils";

interface Memo {
  title: string;
  day: string;
  time: string;
}

interface AllMemosProps {
  schedule: {
    course_no: string;
    title: string;
    professor: string;
    course_time: string;
    classroom: string;
  }[];
  onClose: () => void; // Lesson 화면으로 돌아가는 함수
}

const AllMemos = ({ schedule, onClose }: AllMemosProps) => {
  const [todayMemos, setTodayMemos] = useState<Memo[]>([]);
  const [thisWeekMemos, setThisWeekMemos] = useState<Memo[]>([]);
  const [nextWeekMemos, setNextWeekMemos] = useState<Memo[]>([]);
  const [isAddMemoVisible, setIsAddMemoVisible] = useState(false);

  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const getWeekDates = (offset: number) => {
    const today = new Date();
    const startDate = new Date(
      today.setDate(today.getDate() - today.getDay() + offset * 7)
    )
      .toISOString()
      .split("T")[0];
    const endDate = new Date(today.setDate(today.getDate() + 6))
      .toISOString()
      .split("T")[0];
    return { startDate, endDate };
  };

  const updateMemos = () => {
    const today = getTodayDate();
    const thisWeek = getWeekDates(0);
    const nextWeek = getWeekDates(1);

    setTodayMemos(filterTodayAllMemos(today));
    setThisWeekMemos(filterMemosByWeekAll(thisWeek.startDate, thisWeek.endDate));
    setNextWeekMemos(filterMemosByWeekAll(nextWeek.startDate, nextWeek.endDate));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      removeExpiredMemos();
      updateMemos();
    }, 60000);

    updateMemos();

    return () => clearInterval(intervalId);
  }, []);

  const openAddMemo = () => setIsAddMemoVisible(true);
  const closeAddMemo = () => {
    setIsAddMemoVisible(false);
    updateMemos();
  };

  const renderMemos = (memos: Memo[]) =>
    memos.map((memo, index) => (
      <li key={index} className="memo-item">
        <label className="memo-checkbox">
          <input type="checkbox" />
          <span className="memo-title">{memo.title}</span>
        </label>
        <span className="memo-time">
          {memo.day} {memo.time}
        </span>
      </li>
    ));

  return (
    <div className="all-memos-page">
      <div className="all-memos-header">
        <h3 className="header-left">To Do</h3>
        <button className="complete-button" onClick={onClose}>
          완료
        </button>
      </div>

      <div className="all-memos-section">
        <h4>오늘</h4>
        <ul className="memo-list">
          {todayMemos.length > 0 ? renderMemos(todayMemos) : <p>오늘의 메모가 없습니다.</p>}
        </ul>
      </div>

      <div className="all-memos-section">
        <h4>이번 주</h4>
        <ul className="memo-list">
          {thisWeekMemos.length > 0
            ? renderMemos(thisWeekMemos)
            : <p>이번 주의 메모가 없습니다.</p>}
        </ul>
      </div>

      <div className="all-memos-section">
        <h4>다음 주</h4>
        <ul className="memo-list">
          {nextWeekMemos.length > 0
            ? renderMemos(nextWeekMemos)
            : <p>다음 주의 메모가 없습니다.</p>}
        </ul>
      </div>

      <div className="add-memo-section">
        <button className="add-memo-button" onClick={openAddMemo}>
          메모 추가
        </button>
      </div>

      {isAddMemoVisible && (
        <MemoAdd onClose={closeAddMemo} schedule={schedule} updateMemos={updateMemos} />
      )}
    </div>
  );
};

export default AllMemos;
