import React from "react";

// 메모 데이터 타입 정의
export type MemoData = {
    subject: string;
    content: string;
    dueDate: string;
};

// 이번주 메모 데이터 반환 함수
export const getThisWeekMemos = (): MemoData[] => [
    { subject: "과목1", content: "메모 내용1", dueDate: "기한1" },
    { subject: "과목2", content: "메모 내용2", dueDate: "기한2" },
    { subject: "과목3", content: "메모 내용3", dueDate: "기한3" },
];

// 다음주 메모 데이터 반환 함수
export const getNextWeekMemos = (): MemoData[] => [
    { subject: "과목A", content: "메모 내용A", dueDate: "기한A" },
    { subject: "과목B", content: "메모 내용B", dueDate: "기한B" },
];

// 메모 섹션 렌더링 함수
export const renderMemoSection = (title: string, memos: MemoData[]) => (
    <div className="memo-section">
        <div className="memo-header">
            <h3>{title}</h3>
            <div className="line"></div>
        </div>
        {memos.map((memo, index) => (
            <div key={index} className="memo-item">
                <span>{memo.subject}</span>
                <span>{memo.content}</span>
                <span>{memo.dueDate}</span>
            </div>
        ))}
    </div>
);