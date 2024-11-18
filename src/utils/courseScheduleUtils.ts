import axios from 'axios';

interface CourseData {
  course_no: string;
  title: string;
  course_type: string;
  credit: number;
  pass: string;
  grade: number;
  course_time: string;
  classroom: string;
  major: string | null;
  professor: string;
}

interface GroupedCourses {
  [timeSlot: string]: CourseData[];
}

// API에서 강의 데이터를 가져오는 함수
export const fetchCourseData = async (): Promise<CourseData[]> => {
  try {
    const response = await axios.get('/api/courses'); // API 엔드포인트
    return response.data as CourseData[];
  } catch (error) {
    console.error('Error fetching course data:', error);
    return [];
  }
};

// 시간대를 기준으로 데이터를 그룹화하는 함수
export const groupCoursesByTimeSlot = (courses: CourseData[]): GroupedCourses => {
  return courses.reduce<GroupedCourses>((acc, course) => {
    const timeSlot = course.course_time.split(' ')[1]; // "목 5"에서 5 추출
    if (!acc[timeSlot]) {
      acc[timeSlot] = [];
    }
    acc[timeSlot].push(course);
    return acc;
  }, {});
};

// 데이터를 가공하여 시간표 형식으로 반환하는 함수
export const processCourseData = async (): Promise<GroupedCourses> => {
  const courses = await fetchCourseData();
  return groupCoursesByTimeSlot(courses);
};
