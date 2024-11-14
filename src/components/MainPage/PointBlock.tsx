import React, { useState, useEffect } from 'react';
import '../Layout/BaseBlock.css';
import './PointBlock.css';
import { renderGaugeBar, saveScoreToLocalStorage, loadScoreFromLocalStorage } from '../../utils/GaugeBarUtils';
import { useScholarshipData } from '../../utils/ScholarshipUtils';

const PointBlock: React.FC = () => {
  const [currentScore, setCurrentScore] = useState(() => loadScoreFromLocalStorage());
  const { searchResults } = useScholarshipData();

  useEffect(() => {
    saveScoreToLocalStorage(currentScore);
  }, [currentScore]);

  const handleAddScore = (maxPoint: number) => {
    setCurrentScore((prevScore) => prevScore + maxPoint);
  };

  return (
    <div className="block-square">
      <p className="Pointblock-text">솔선수범 포인트</p>
      {renderGaugeBar(currentScore, {
        gaugeBarClass: "gauge-bar",
        gaugeBarFillClass: "gauge-bar-fill",
        gaugeBarScoreClass: "gauge-bar-score"
      }, true)}
    </div>
  );
};

export default PointBlock;