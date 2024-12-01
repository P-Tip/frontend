import { ScheduleBlock } from "../utils/parse_course_time";

const SCHEDULE_STORAGE_KEY = "scheduleData";

/**
 * 로컬스토리지에서 스케줄 가져오기
 */
export const getScheduleFromStorage = (): ScheduleBlock[] => {
  const scheduleData = localStorage.getItem(SCHEDULE_STORAGE_KEY);
  return scheduleData ? JSON.parse(scheduleData) : [];
};

/**
 * 로컬스토리지에 스케줄 저장
 */
export const saveScheduleToStorage = (schedule: ScheduleBlock[]): void => {
  localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(schedule));
};

/**
 * 로컬스토리지에서 특정 블록 삭제
 */
export const removeBlockFromStorage = (block: ScheduleBlock): void => {
  const schedule = getScheduleFromStorage();
  const updatedSchedule = schedule.filter(
    (b) => b.course_no !== block.course_no || b.day !== block.day || b.time !== block.time
  );
  saveScheduleToStorage(updatedSchedule);
  console.log("[DEBUG] Removed block from storage:", block);
};
