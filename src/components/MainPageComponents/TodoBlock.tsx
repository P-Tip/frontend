import React from 'react';
import './BaseBlock.css';
import './TodoBlock.css';
import { todoBlockData } from '../../utils/MainPageUtils/TodoBlockUtils';

const TodoBlock: React.FC = () => (
  <div className="block-rectangle">
    {todoBlockData.map((line, index) => (
      <p key={index} className="Todoblock-text">
        {line}
      </p>
    ))}
  </div>
);

export default TodoBlock;
