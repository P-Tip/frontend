import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainPage from '../pages/MainPage'; // MainPage 컴포넌트를 불러옴

test('메인 페이지가 제대로 렌더링된다', () => {
  render(<MainPage />);
  
  // 각 위젯에 들어갈 텍스트 확인
  const firstWidgetText = screen.getByText('솔선수범 장학금'); // 첫 번째 위젯 텍스트로 수정
  const secondWidgetText = screen.getByText('학식 메뉴'); // 두 번째 위젯 텍스트로 수정
  const thirdWidgetText = screen.getByText('시간표'); // 세 번째 위젯 텍스트로 수정

  expect(firstWidgetText).toBeInTheDocument(); // 첫 번째 위젯 텍스트 확인
  expect(secondWidgetText).toBeInTheDocument(); // 두 번째 위젯 텍스트 확인
  expect(thirdWidgetText).toBeInTheDocument(); // 세 번째 위젯 텍스트 확인
});

test('왼쪽에 있는 큰 아이콘이 렌더링된다', () => {
    render(<MainPage />);
    const largeIcon = screen.getByTestId('large-icon');
    expect(largeIcon).toBeInTheDocument();
  });
  
  test('오른쪽에 있는 두 개의 작은 아이콘이 렌더링된다', () => {
    render(<MainPage />);
    const smallIcons = screen.getAllByTestId('small-icon');
    expect(smallIcons).toHaveLength(2);
    smallIcons.forEach(icon => {
      expect(icon).toBeInTheDocument();
    });
  });

test('네비게이션 바가 포함되어 있다', () => {
  render(<MainPage />); // MainPage 컴포넌트 렌더링
  const footerElement = screen.getByText(/네비게이션 바/i); // 네비게이션 바 텍스트 확인
  expect(footerElement).toBeInTheDocument(); // 네비게이션 바가 DOM에 있는지 확인
});
