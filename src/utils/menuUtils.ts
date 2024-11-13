interface CafeteriaMenuItem {
  date: string;
  haksik_type: string;
  haksik_items: string | string[]; // haksik_items의 타입을 string 또는 string[]로 지정
}

// 시간에 따라 현재 보여줄 메뉴를 필터링하는 함수
interface CafeteriaMenuItem {
  date: string;
  haksik_type: string;
  haksik_items: string | string[]; // haksik_items의 타입을 string 또는 string[]로 지정
}

export const getFilteredMenu = (menuData: CafeteriaMenuItem[], currentTime: Date) => {
  const hour = currentTime.getHours();
  const minute = currentTime.getMinutes();
  const todayDate = currentTime.toISOString().split('T')[0];

  // 현재 보여줄 학식 정보와 옆으로 넘길 학식 정보를 저장할 변수
  let mainMenu: CafeteriaMenuItem | null = null;
  let sideMenu: CafeteriaMenuItem | null = null;

  // 오늘과 내일의 날짜 문자열 생성
  const tomorrowDate = new Date(currentTime);
  tomorrowDate.setDate(currentTime.getDate() + 1);
  const tomorrowDateString = tomorrowDate.toISOString().split('T')[0];

  // 시간 조건에 따른 메뉴 필터링
  if (hour < 9 || (hour === 9 && minute < 30)) {
    // 아침 9시 30분 이전: 오늘의 아침 (기본), 점심 (옆으로 넘김)
    mainMenu = menuData.find(item => item.date === todayDate && item.haksik_type === 'breakfast') || null;
    sideMenu = menuData.find(item => item.date === todayDate && item.haksik_type === 'lunch') || null;
  } else if (hour < 14) {
    // 아침 9시 30분 이후, 점심 2시 이전: 오늘의 점심 (기본)
    mainMenu = menuData.find(item => item.date === todayDate && item.haksik_type === 'lunch') || null;
    sideMenu = null;
  } else {
    // 점심 2시 이후 ~ 다음 날 아침 9시 30분 이전: 내일의 아침 (기본), 점심 (옆으로 넘김)
    mainMenu = menuData.find(item => item.date === tomorrowDateString && item.haksik_type === 'breakfast') || null;
    sideMenu = menuData.find(item => item.date === tomorrowDateString && item.haksik_type === 'lunch') || null;
  }

  console.log("Main Menu Data:", mainMenu);
  console.log("Side Menu Data:", sideMenu);

  return { mainMenu, sideMenu };
};

export const formatMenuText = (menuData: CafeteriaMenuItem[]): string[] => {
  if (menuData.length === 0) return ["오늘의 학식은 없습니다"];

  const item = menuData[0];
  const typeLabel = item.haksik_type === 'breakfast' ? '아침' : '점심';
  const dateLabel = `${item.date.split('-')[1]}월${item.date.split('-')[2]}일 ${typeLabel} 🌞`; // 날짜와 아침/점심 라벨

  // haksik_items가 문자열인지 배열인지 확인하고 처리하여 줄바꿈 형태로 배열 생성
  const itemsTextArray = typeof item.haksik_items === 'string'
    ? item.haksik_items.split(', ').map(text => text.trim())
    : item.haksik_items;

  return [dateLabel, ...itemsTextArray];
};