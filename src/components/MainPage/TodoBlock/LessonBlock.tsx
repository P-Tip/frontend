import React from 'react';
import './LessonBlock.css';
import { getLessonBlockClass, lessonData } from '../../../utils/MainPageUtils/TodoBlockUtils/LessonBlockUtils';

interface LessonBlockProps {
  theme: 'dark' | 'white';
}

export const LessonBlock: React.FC<LessonBlockProps> = ({ theme }) => {
  const blockClassName = getLessonBlockClass(theme);

  return (
    <div className={blockClassName}>
      <p className="lesson-text lesson-name">{lessonData.name}</p>
      <br></br>
      <p className="lesson-text lesson-time">{lessonData.time}</p>
      <p className="lesson-text lesson-place">{lessonData.place}</p>
    </div>
  );
};

