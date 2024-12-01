export interface ScheduleBlock {
  day: number; // 요일 (월: 1, 화: 2, ...)
  time: number; // 교시 시작 시간
  course_no: string; // 강의 번호
  title: string; // 강의명
  professor: string; // 교수명
  classroom: string; // 강의실
  course_time: string; // 수업 시간 문자열
  rowSpan: number; // 병합할 셀 수
}

export const parseCourseTime = (
  course_time: string,
  course_no: string,
  title: string,
  professor: string,
  classroom: string
): ScheduleBlock[] => {
  console.log(`[DEBUG] Starting parseCourseTime with input: "${course_time}"`);

  const days = { 월: 1, 화: 2, 수: 3, 목: 4, 금: 5 } as const; // 요일 매핑
  const scheduleBlocks: ScheduleBlock[] = [];

  const segments = course_time.split(",").map((seg) => seg.trim());
  console.log(`[DEBUG] Split course_time into segments:`, segments);

  let currentDay: number | null = null;
  let currentTimes: number[] = []; // 현재 처리 중인 요일의 시간 목록

  // 각 segment 처리
  segments.forEach((segment) => {
    const dayChar = segment[0]; // 첫 글자로 요일 추출
    const day = days[dayChar as keyof typeof days];

    if (day) {
      // 새로운 요일 발견 시 기존 요일 처리
      if (currentDay !== null && currentTimes.length > 0) {
        console.log(`[DEBUG] Processing day ${currentDay} with times:`, currentTimes);

        // 현재 요일과 시간으로 블록 생성
        createBlocksForDay(currentDay, currentTimes, course_no, title, professor, classroom, scheduleBlocks);
      }

      // 요일 갱신 및 시간 초기화
      currentDay = day;
      currentTimes = [];
      console.log(`[DEBUG] Found day "${dayChar}" mapped to day: ${day}`);
    }

    // 현재 요일에 시간 추가
    const time = parseInt(segment.replace(/[^0-9]/g, ""), 10); // 숫자만 추출
    if (!isNaN(time)) {
      currentTimes.push(time);
      console.log(`[DEBUG] Added time ${time} to day ${currentDay}`);
    }
  });

  // 마지막 요일 처리
  if (currentDay !== null && currentTimes.length > 0) {
    console.log(`[DEBUG] Processing final day ${currentDay} with times:`, currentTimes);
    createBlocksForDay(currentDay, currentTimes, course_no, title, professor, classroom, scheduleBlocks);
  }

  console.log(`[DEBUG] Final parsed scheduleBlocks:`, scheduleBlocks);
  return scheduleBlocks;
};

/**
 * 특정 요일에 대해 연속된 시간 블록 생성
 */
const createBlocksForDay = (
  day: number,
  times: number[],
  course_no: string,
  title: string,
  professor: string,
  classroom: string,
  scheduleBlocks: ScheduleBlock[]
) => {
  // 시간 정렬
  const sortedTimes = [...times].sort((a, b) => a - b);
  console.log(`[DEBUG] Sorted times for day ${day}:`, sortedTimes);

  let start = sortedTimes[0];
  let prev = sortedTimes[0];

  for (let i = 1; i < sortedTimes.length; i++) {
    if (sortedTimes[i] !== prev + 1) {
      // 연속되지 않는 경우, 현재까지의 블록 생성
      console.log(`[DEBUG] Creating block for day ${day}: ${start} to ${prev}`);
      scheduleBlocks.push({
        day,
        time: start,
        course_no,
        title,
        professor,
        classroom,
        course_time: `${start}-${prev}`, // 시간 범위 표시
        rowSpan: prev - start + 1, // 병합할 셀 수 계산
      });
      start = sortedTimes[i]; // 새로운 블록 시작
    }
    prev = sortedTimes[i];
  }

  // 마지막 블록 생성
  console.log(`[DEBUG] Creating final block for day ${day}: ${start} to ${prev}`);
  scheduleBlocks.push({
    day,
    time: start,
    course_no,
    title,
    professor,
    classroom,
    course_time: `${start}-${prev}`,
    rowSpan: prev - start + 1,
  });
};
