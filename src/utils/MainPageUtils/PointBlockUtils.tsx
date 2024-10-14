import React, { useState, useEffect, Fragment } from 'react';

export const pointBlockData = ["솔선수범 포인트"];

// 최대 점수를 상수로 정의
const MAX_SCORE = 700000;

// 현재 점수를 받아 퍼센트 값과 포맷된 점수를 반환하는 함수
export const calculateGaugeValues = (currentScore: number) => {
  const percentage = (currentScore / MAX_SCORE) * 100; // 퍼센트 계산

  // 점수에서 앞 두 자리만 추출
  const mainScore = Math.floor(currentScore / 10000).toString().slice(0, 2);

  return { percentage, mainScore }; // 두 자리를 반환
};

// 게이지 바의 HTML 반환 함수
export const renderGaugeBar = (currentScore: number) => {
  const { percentage, mainScore } = calculateGaugeValues(currentScore); // 계산된 값 사용
  const [width, setWidth] = useState(0); // 초기 width를 0으로 설정

  // 컴포넌트가 마운트된 후 실제 퍼센트 값으로 업데이트
  useEffect(() => {
    setTimeout(() => {
      setWidth(percentage);
    }, 100); // 약간의 딜레이
  }, [percentage]);

  return (
    <Fragment>
      <p className="gauge-bar-score">
        <span style={{ color: 'green', fontWeight: 'bold' }}>{mainScore}</span>
        만점
      </p>
      <div className="gauge-bar">
        <div
          className="gauge-bar-fill"
          style={{ width: `${width}%`, transition: 'width 1.3s ease' }} // width와 transition 적용
        >
        </div>
      </div>
    </Fragment>
  );
};
