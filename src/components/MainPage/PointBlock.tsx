import React from 'react';
import './BaseBlock.css';
import './PointBlock.css';
import { renderGaugeBar } from '../../utils/MainPageUtils/PointBlockUtils';

const PointBlock: React.FC = () => {
  const currentScore = 350000; 

  return (
    <div className="block-square">
      
        <p  className="Pointblock-text">
          솔선수범 포인트
        </p>
      {renderGaugeBar(currentScore)}
    </div>
  );
};

export default PointBlock;

