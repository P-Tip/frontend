interface CafeteriaMenuItem {
  date: string;
  haksik_type: string;
  haksik_items: string | string[]; // haksik_items의 타입을 string 또는 string[]로 지정
}

// 시간에 따른 필터링 로직 제거
export const getFilteredMenu = (menuData: CafeteriaMenuItem[]) => {
  let mainMenu: CafeteriaMenuItem | null = null;
  let sideMenu: CafeteriaMenuItem | null = null;

  if (menuData.length > 0) {
    mainMenu = menuData[0] || null; 
    if (menuData.length > 1) {
      sideMenu = menuData[1] || null; 
    }
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