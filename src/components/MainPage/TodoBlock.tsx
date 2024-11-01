import React from 'react';
import './BaseBlock.css';
import './TodoBlock.css';
import { LessonBlock } from './TodoBlock/LessonBlock';
import MemoBlock from './TodoBlock/MemoBlock'; 

const TodoBlock: React.FC = () => (
  <div className="block-rectangle">
    <p className="todoblock-text">
      To Do
    </p>
    <div className="lesson-container">
      <div className="lesson-left">
        <LessonBlock theme="dark" />
        <LessonBlock theme="white" />
        <LessonBlock theme="dark" />
        <LessonBlock theme="white" />
        <LessonBlock theme="dark" />
      </div>
      <div className="lesson-right">
        <LessonBlock theme="dark" />
        <LessonBlock theme="white" />
      </div>
    </div>
    <div className="memo-container">
      <MemoBlock /> 
    </div>
  </div>
);

export default TodoBlock;
