import React from 'react';
import './LessonBlock.css';
import { lessonData } from '../../../utils/MainPageUtils/BlockUtils/LessonBlockUtils';

const LessonBlock: React.FC = () => {
  return (
    <div className="lesson-block">
      <p className="lesson-text lesson-name">{lessonData.name}</p>
      <br />
      <p className="lesson-text lesson-time">{lessonData.time}</p>
      <p className="lesson-text lesson-place">{lessonData.place}</p>
    </div>
  );
};

export default LessonBlock;
