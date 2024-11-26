import { ScheduleBlock } from "../utils/parse_course_time";
// 로컬스토리지 키
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
