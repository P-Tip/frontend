// PointBlockUtils.ts
import React, { Fragment } from 'react';

export const MAX_SCORE = 700000;

export const calculateGaugeValues = (currentScore: number) => {
  const percentage = (currentScore / MAX_SCORE) * 100;
  const mainScore = Math.floor(currentScore / 10000).toString().slice(0, 2);
  return { percentage, mainScore };
};

interface GaugeBarStyles {
  gaugeBarClass: string;
  gaugeBarFillClass: string;
  gaugeBarScoreClass: string;
}

export const renderGaugeBar = (
  currentScore: number,
  styles: GaugeBarStyles,
  showTotalScore: boolean = false
) => {
  const { percentage, mainScore } = calculateGaugeValues(currentScore);

  return (
    <Fragment>
      <p className={styles.gaugeBarScoreClass}>
        <span style={{ color: 'green', fontWeight: 'bold' }}>{mainScore}</span>
        만점 {showTotalScore && <span className="total-score">/70만점</span>}
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