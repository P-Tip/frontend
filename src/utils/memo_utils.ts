// utils/memo_utils.ts

// 로컬 스토리지 키
const MEMO_STORAGE_KEY = "memoData";

/**
 * 디버깅 로그 출력 (환경에 따라 활성화/비활성화)
 * @param message 로그 메시지
 * @param data 관련 데이터 (선택사항)
 */
const debugLog = (message: string, data?: any) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[DEBUG] ${message}`, data);
  }
};

/**
 * 현재 날짜 가져오기 (YYYY-MM-DD)
 * @returns 오늘 날짜 (타임존 보정 포함)
 */
export const getTodayDate = (): string => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000; // 타임존 오프셋 계산
  const localDate = new Date(now.getTime() - offset); // 로컬 시간으로 조정
  return localDate.toISOString().split("T")[0];
};

/**
 * 전체 메모 가져오기
 * @returns 로컬스토리지에서 가져온 전체 메모 데이터
 */
export const getAllMemos = (): Record<string, { date: string; time: string; title: string; content: string }[]> => {
  const memoData = localStorage.getItem(MEMO_STORAGE_KEY);
  return memoData ? JSON.parse(memoData) : {};
};

/**
 * 전체 메모 저장하기
 * @param memos 업데이트된 전체 메모 데이터
 */
export const saveMemos = (
  memos: Record<string, { date: string; time: string; title: string; content: string }[]>
): void => {
  localStorage.setItem(MEMO_STORAGE_KEY, JSON.stringify(memos));
};

/**
 * 전체 메모에서 날짜 필터링
 * @param filterFn 필터링 조건 함수
 * @returns 필터링된 메모 데이터
 */
const filterMemos = (
  filterFn: (memo: { date: string; time: string; title: string; content: string }) => boolean
): { title: string; day: string; time: string }[] => {
  const allMemos = getAllMemos();
  const filteredMemos: { title: string; day: string; time: string }[] = [];

  Object.values(allMemos).forEach((courseMemos) => {
    courseMemos.forEach((memo) => {
      const memoDueDateTime = new Date(`${memo.date}T${memo.time}:00`);
      if (filterFn(memo) && !isNaN(memoDueDateTime.getTime())) {
        const day = memoDueDateTime.toLocaleDateString("ko-KR", { weekday: "long" });
        filteredMemos.push({ title: memo.title, day, time: memo.time });
      }
    });
  });

  return filteredMemos;
};


/**
 * 전체 메모 중 오늘 날짜의 메모 필터링
 * @returns 오늘 날짜의 메모 제목, 시간 리스트
 */
export const filterTodayAllMemos = (): { title: string; day: string; time: string }[] => {
  const today = getTodayDate();
  debugLog("오늘 날짜", today);

  const filteredMemos = filterMemos((memo) => memo.date === today);
  debugLog("필터링된 오늘의 메모", filteredMemos);

  return filteredMemos;
};

/**
 * 전체 메모에서 이번 주 또는 다음 주 메모 필터링
 * 오늘 날짜의 메모는 제외
 * @param startDate 주 시작 날짜 (YYYY-MM-DD 형식)
 * @param endDate 주 종료 날짜 (YYYY-MM-DD 형식)
 * @returns 해당 주의 메모 제목, 요일, 시간 리스트
 */
export const filterMemosByWeekAll = (
  startDate: string,
  endDate: string
): { title: string; day: string; time: string }[] => {
  const today = getTodayDate();
  const filteredMemos = filterMemos(
    (memo) => memo.date >= startDate && memo.date <= endDate && memo.date !== today
  );

  debugLog(`주간 메모 (${startDate} ~ ${endDate})`, filteredMemos);

  return filteredMemos;
};

/**
 * 수업별로 메모 추가하기
 * @param courseId 수업 ID
 * @param newMemo 추가할 메모 객체 (날짜, 시간, 제목, 내용)
 */
export const addMemoToCourse = (
  courseId: string,
  newMemo: { date: string; time: string; title: string; content: string }
): void => {
  const allMemos = getAllMemos();
  const courseMemos = allMemos[courseId] || [];
  const updatedMemos = [...courseMemos, newMemo];
  allMemos[courseId] = updatedMemos;

  debugLog("메모 추가", { courseId, newMemo, updatedMemos });

  saveMemos(allMemos);
};
/**
 * 이번 주와 다음 주의 메모 필터링
 * @param thisWeekStart 이번 주 시작 날짜 (YYYY-MM-DD 형식)
 * @param thisWeekEnd 이번 주 종료 날짜 (YYYY-MM-DD 형식)
 * @param nextWeekStart 다음 주 시작 날짜 (YYYY-MM-DD 형식)
 * @param nextWeekEnd 다음 주 종료 날짜 (YYYY-MM-DD 형식)
 * @returns 수업 이름 - 메모 제목 - 시간 리스트
 */
export const filterWeeklyMemos = (
  thisWeekStart: string,
  thisWeekEnd: string,
  nextWeekStart: string,
  nextWeekEnd: string
): { course: string; title: string; time: string }[] => {
  const today = getTodayDate();
  const allMemos = getAllMemos();
  const weeklyMemos: { course: string; title: string; time: string }[] = [];

  Object.entries(allMemos).forEach(([courseId, courseMemos]) => {
    courseMemos.forEach((memo) => {
      if (
        (memo.date >= thisWeekStart && memo.date <= thisWeekEnd && memo.date !== today) ||
        (memo.date >= nextWeekStart && memo.date <= nextWeekEnd)
      ) {
        weeklyMemos.push({ course: courseId, title: memo.title, time: memo.time });
      }
    });
  });

  debugLog(`주간 메모 필터링 (${thisWeekStart} ~ ${thisWeekEnd}, ${nextWeekStart} ~ ${nextWeekEnd})`, weeklyMemos);

  return weeklyMemos;
};
/**
 * 모든 수업의 기한이 지난 메모를 삭제
 */
/**
 * 기한이 지난 메모 삭제
 */
export const removeExpiredMemos = (): void => {
  const allMemos = getAllMemos(); // 로컬스토리지에서 메모 데이터 가져오기
  const now = new Date(); // 현재 시간 (Date 객체)

  Object.keys(allMemos).forEach((courseId) => {
    const courseMemos = allMemos[courseId] || [];
    const validMemos = courseMemos.filter((memo) => {
      // 메모의 날짜와 시간을 ISO 형식으로 변환
      const memoDueDateTime = new Date(`${memo.date}T${memo.time}:00`);

      // 현재 시간과 비교
      return memoDueDateTime > now;
    });

    // 유효한 메모만 저장
    if (validMemos.length !== courseMemos.length) {
      allMemos[courseId] = validMemos;
    }
  });

  saveMemos(allMemos); // 필터링된 메모 저장
  debugLog("[DEBUG] 기한 지난 메모 삭제 완료", { allMemos });
};

/**
 * 이번 주와 다음 주 메모 필터링 (오늘 포함)
 * @param thisWeekStart 이번 주 시작 날짜 (YYYY-MM-DD 형식)
 * @param thisWeekEnd 이번 주 종료 날짜 (YYYY-MM-DD 형식)
 * @param nextWeekStart 다음 주 시작 날짜 (YYYY-MM-DD 형식)
 * @param nextWeekEnd 다음 주 종료 날짜 (YYYY-MM-DD 형식)
 * @returns 수업 이름 - 메모 제목 - 날짜 - 시간 리스트
 */
export const filterWeeklyMemosIncludingToday = (
  thisWeekStart: string,
  thisWeekEnd: string,
  nextWeekStart: string,
  nextWeekEnd: string
): { course: string; title: string; date: string; time: string }[] => {
  const allMemos = getAllMemos();
  const weeklyMemos: { course: string; title: string; date: string; time: string }[] = [];

  Object.entries(allMemos).forEach(([courseId, courseMemos]) => {
    courseMemos.forEach((memo) => {
      if (
        (memo.date >= thisWeekStart && memo.date <= thisWeekEnd) ||
        (memo.date >= nextWeekStart && memo.date <= nextWeekEnd)
      ) {
        weeklyMemos.push({
          course: courseId,
          title: memo.title,
          date: memo.date,
          time: memo.time,
        });
      }
    });
  });

  debugLog(
    `주간 메모 필터링 (오늘 포함, ${thisWeekStart} ~ ${thisWeekEnd}, ${nextWeekStart} ~ ${nextWeekEnd})`,
    weeklyMemos
  );

  return weeklyMemos;
};
