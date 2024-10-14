export const blockData = {
  squareBlock1: ["솔선수범 포인트"],
  squareBlock2: ["오늘의 학식"],
  rectangleBlock: ["To Do"],
};

// 블록 키 타입을 정의
export type BlockKey = keyof typeof blockData;

// 블록 타입에 맞는 데이터를 가져오는 함수
export const getBlockContent = (blockType: BlockKey): string[] => {
  return blockData[blockType];
};
