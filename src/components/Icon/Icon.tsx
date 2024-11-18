import React from 'react';
import { getIconImage } from '../../utils/IconUtils';

interface IconProps {
  type: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ type, isSelected = false, onClick }) => (
  <button className="transparent-button" onClick={onClick}>
    {getIconImage(type, isSelected)}
  </button>
);

export default Icon;
