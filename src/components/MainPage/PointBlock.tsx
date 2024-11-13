// PointBlock.tsx
import React from 'react';
import '../Layout/BaseBlock.css';
import './PointBlock.css';
import { renderGaugeBar } from '../../utils/PointBlockUtils';

const PointBlock: React.FC = () => {
  const currentScore = 350000;

  return (
    <div className="block-square">
      <p className="Pointblock-text">솔선수범 포인트</p>
      {renderGaugeBar(currentScore, {
        gaugeBarClass: "gauge-bar",
        gaugeBarFillClass: "gauge-bar-fill",
        gaugeBarScoreClass: "gauge-bar-score"
      })} {/* 기본값 false */}
    </div>
  );
};

export default PointBlock;