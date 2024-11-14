// src/components/Scholarship/PointsCard.tsx
import React from 'react';
import { renderGaugeBar } from '../../utils/GaugeBarUtils';
import './PointsCard.css';

interface PointsCardProps {
  currentScore: number;
}

const PointsCard: React.FC<PointsCardProps> = ({ currentScore }) => {
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
};

export default PointsCard;