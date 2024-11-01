import React from "react";
import "./MemoBlock.css";
import { renderMemoSection, getThisWeekMemos, getNextWeekMemos } from "../../../utils/MainPageUtils/TodoBlockUtils/MemoBlockUtils";

const MemoBlock = () => {
    const thisWeekMemos = getThisWeekMemos();
    const nextWeekMemos = getNextWeekMemos();

    return (
        <>
            {renderMemoSection("이번주", thisWeekMemos)}
            {renderMemoSection("다음주", nextWeekMemos)}
        </>
    );
};

export default MemoBlock;
