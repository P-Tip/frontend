import React from 'react';
import './Block.css';

interface BlockProps {
  content: string; 
  isSquare?: boolean; 
}

const Block: React.FC<BlockProps> = ({ content, isSquare = false }) => {
  return (
    <div className={isSquare ? 'block-square' : 'block-rectangle'}>
      {content}
    </div>
  );
};

export default Block;
