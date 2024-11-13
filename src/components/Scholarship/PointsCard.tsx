// PointsCard.tsx
import React from 'react';
import { renderGaugeBar } from '../../utils/PointBlockUtils';
import './PointsCard.css';

export default function PointsCard() {
  const currentScore = 350000;

  return (
    <div className="block-point">
      <p className="Pointblock-text2">솔선수범 포인트</p>
      {renderGaugeBar(currentScore, {
        gaugeBarClass: "points-gauge-bar",
        gaugeBarFillClass: "points-gauge-bar-fill",
        gaugeBarScoreClass: "points-gauge-bar-score"
      }, true)}
    </div>
  );
}