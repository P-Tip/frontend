import React from 'react';
import './BaseBlock.css';
import './MenuBlock.css';
import { menuBlockData } from '../../utils/MainPageUtils/MenuBlockUtils';

const MenuBlock: React.FC = () => (
  <div className="block-square">
    {menuBlockData.map((line, index) => (
      <p key={index} className={`Menublock-text ${index === 0 ? 'first-text' : ''}`}>
        {line}
      </p>
    ))}
  </div>
);

export default MenuBlock;

