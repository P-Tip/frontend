import React, { useState, useEffect } from "react";
import "./MemoBlock.css";
import {
  filterWeeklyMemosIncludingToday,
  getTodayDate,
} from "../../../utils/memo_utils";

const MemoBlock = () => {
  const [thisWeekMemos, setThisWeekMemos] = useState<
    { course: string; title: string; date: string; time: string }[]
  >([]);
  const [nextWeekMemos, setNextWeekMemos] = useState<
    { course: string; title: string; date: string; time: string }[]
  >([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const today = new Date(getTodayDate());
    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(today.getDate() - today.getDay());
    const thisWeekEnd = new Date(thisWeekStart);
    thisWeekEnd.setDate(thisWeekStart.getDate() + 6);

    const nextWeekStart = new Date(thisWeekEnd);
    nextWeekStart.setDate(thisWeekEnd.getDate() + 1);
    const nextWeekEnd = new Date(nextWeekStart);
    nextWeekEnd.setDate(nextWeekStart.getDate() + 6);

    const formatDate = (date: Date) =>
      date.toISOString().split("T")[0];

    const allWeeklyMemos = filterWeeklyMemosIncludingToday(
      formatDate(thisWeekStart),
      formatDate(thisWeekEnd),
      formatDate(nextWeekStart),
      formatDate(nextWeekEnd)
    );

    setThisWeekMemos(
      allWeeklyMemos.filter((memo) => memo.date <= formatDate(thisWeekEnd))
    );
    setNextWeekMemos(
      allWeeklyMemos.filter((memo) => memo.date >= formatDate(nextWeekStart))
    );
  }, []);

  return (
    <div className="main-memo-section">
      {/* 이번 주 메모 */}
      <div className="main-memo-header">
        <h3>이번주</h3>
        <div className="line"></div>
      </div>
      <ul className="main-memo-items">
        {thisWeekMemos.length > 0 ? (
          thisWeekMemos.map((memo, index) => (
            <li key={index} className="main-memo-item">
              <span className="main-memo-item-left">{memo.course}</span>
              <span className="main-memo-item-center">{memo.title}</span>
              <span className="main-memo-item-right">
                {memo.date} {memo.time}
              </span>
            </li>
          ))
        ) : (
          <li className="main-memo-item">
            <span>이번 주 메모가 없습니다.</span>
          </li>
        )}
      </ul>

      {/* 다음 주 메모 */}
      <div className="main-memo-header">
        <h3>다음주</h3>
        <div className="line"></div>
      </div>
      <ul className="main-memo-items">
        {nextWeekMemos.length > 0 ? (
          nextWeekMemos.map((memo, index) => (
            <li key={index} className="main-memo-item">
              <span className="main-memo-item-left">{memo.course}</span>
              <span className="main-memo-item-center">{memo.title}</span>
              <span className="main-memo-item-right">
                {memo.date} {memo.time}
              </span>
            </li>
          ))
        ) : (
          <li className="main-memo-item">
            <span>다음 주 메모가 없습니다.</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default MemoBlock;
