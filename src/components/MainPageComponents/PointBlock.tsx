import React from 'react';
import './BaseBlock.css';
import './PointBlock.css';
import { pointBlockData, renderGaugeBar } from '../../utils/MainPageUtils/PointBlockUtils';

const PointBlock: React.FC = () => {
  const currentScore = 350000; 

  return (
    <div className="block-square">
      {pointBlockData.map((line, index) => (
        <p key={index} className="Pointblock-text">
          {line}
        </p>
      ))}
      {/* utils에서 게이지 바 렌더링 */}
      {renderGaugeBar(currentScore)}
    </div>
  );
};

export default PointBlock;

