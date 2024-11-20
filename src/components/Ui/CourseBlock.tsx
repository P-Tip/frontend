import React from "react";
import "./CourseBlock.css";

interface CourseBlockProps {
  course_no: string;
  title: string;
  course_type: string;
  credit: number;
  grade: number;
  course_time: string;
  classroom: string;
  professor: string;
  onAdd: (course: {
    course_no: string;
    title: string;
    course_time: string;
    classroom: string;
    professor: string;
  }) => void;
}

const CourseBlock: React.FC<CourseBlockProps> = ({
  course_no,
  title,
  course_type,
  credit,
  grade,
  course_time,
  classroom,
  professor,
  onAdd,
}) => {
  return (
    <div className="course-block">
      <div className="course-info">
        <h3 className="course-title">{title}</h3>
        <p className="course-professor">{professor}</p>
        <p className="course-time">{`${course_time} -> ${classroom}`}</p>
        <p className="course-details">
          {grade} 학년 / {course_type} / {credit}학점 / 학수번호: {course_no}
        </p>
      </div>
      <button
        className="add-button-time"
        onClick={() =>
          onAdd({
            course_no,
            title,
            course_time,
            classroom,
            professor,
          })
        }
      >
        시간표에 추가
      </button>
    </div>
  );
};

export default CourseBlock;
