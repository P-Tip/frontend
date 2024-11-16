// src/utils/GaugeBarUtils.ts
import React, { Fragment } from 'react';

export const MAX_SCORE = 700000;

// 게이지 바 값 계산 함수
export const calculateGaugeValues = (currentScore: number, maxPoint: number = MAX_SCORE) => {
  if (isNaN(currentScore)) currentScore = 0; // NaN 처리
  const percentage = (currentScore / maxPoint) * 100;
  const mainScore = Math.max(0, Math.floor(currentScore / 10000)).toString().slice(0, 2);

  return { percentage, mainScore };
};

interface GaugeBarStyles {
  gaugeBarClass: string;
  gaugeBarFillClass: string;
  gaugeBarScoreClass: string;
}

// 로컬 스토리지에 스코어 저장 함수
export const saveScoreToLocalStorage = (score: number) => {
  localStorage.setItem('currentScore', score.toString());
};

// 로컬 스토리지에서 스코어 불러오기 함수
export const loadScoreFromLocalStorage = (): number => {
  if (typeof window !== "undefined") { 
    const savedScore = localStorage.getItem('currentScore');
    return savedScore ? parseInt(savedScore, 10) : 0;
  }
  return 0;
};

// 게이지 바 렌더링 함수
export const renderGaugeBar = (
  currentScore: number,
  styles: GaugeBarStyles,
  showTotalScore: boolean = false
) => {
  const { percentage, mainScore } = calculateGaugeValues(currentScore, MAX_SCORE);

  return (
    <Fragment>
      <p className={styles.gaugeBarScoreClass}>
        <span style={{ color: 'green', fontWeight: 'bold' }}>{mainScore}</span>
        만점 {showTotalScore && <span className="total-score">/{Math.floor(MAX_SCORE / 10000)}만점</span>}
      </p>
      <div className={styles.gaugeBarClass}>
        <div
          className={styles.gaugeBarFillClass}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </Fragment>
  );
};