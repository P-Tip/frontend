export interface ScheduleBlock {
    day: number; // 요일 (월: 1, 화: 2, ...)
    time: number; // 교시
    course_no: string; // 강의 번호
    title: string; // 강의명
    professor: string; // 교수명
    classroom: string; // 강의실
    course_time: string; // 수업 시간 문자열
    rowSpan?: number;
  }
export const parseCourseTime = (
    course_time: string,
    course_no: string,
    title: string,
    professor: string,
    classroom: string
  ): ScheduleBlock[] => {
    console.log(`Starting parseCourseTime with input: "${course_time}"`);
  
    const days = { 월: 1, 화: 2, 수: 3, 목: 4, 금: 5 } as const; // 요일 매핑
    const scheduleBlocks: ScheduleBlock[] = [];
  
    const segments = course_time.split(",").map((seg) => seg.trim());
    console.log(`Split course_time into segments: ${JSON.stringify(segments)}`);
  
    let currentDay: number | null = null;
  
    segments.forEach((segment, index) => {
      console.log(`Processing segment [${index}]: "${segment}"`);
  
      const dayChar = segment[0];
      const day = days[dayChar as keyof typeof days];
  
      if (day) {
        currentDay = day; // 현재 요일을 업데이트
        console.log(`Extracted day: "${dayChar}" -> ${day}`);
      } else if (!currentDay) {
        console.error(`Invalid day in segment: "${segment}"`);
        return;
      }
  
      const times = (day ? segment.slice(1) : segment) // 요일이 있는 경우 이후 시간만 추출
        .split(",")
        .map((time) => parseInt(time.trim(), 10))
        .filter((time) => !isNaN(time));
  
      console.log(`Extracted times for day ${currentDay}: ${JSON.stringify(times)}`);
  
      times.forEach((time) => {
        console.log(`Adding block - day: ${currentDay}, time: ${time}`);
        scheduleBlocks.push({
          day: currentDay!,
          time,
          course_no, // 강의 번호
          title, // 강의명
          professor, // 교수명
          classroom, // 강의실
          course_time, 
        });
      });
    });
  
    console.log(`Final parsed scheduleBlocks: ${JSON.stringify(scheduleBlocks)}`);
    return scheduleBlocks;
  };
  