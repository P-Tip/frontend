module.exports = {
  preset: 'ts-jest', // TypeScript를 사용할 경우 필요
  testEnvironment: 'jsdom', // DOM API가 필요할 경우 jsdom 환경 설정
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // TypeScript 파일을 처리하기 위한 설정
  },
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'], // 테스트 파일의 패턴
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  }
};