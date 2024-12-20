import React from 'react';
import { getIconImage } from '../../utils/IconUtils';
import './Icon.css';

interface IconProps {
  type: string;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ type, onClick }) => (
  <button className="transparent-button" onClick={onClick}>
    {getIconImage(type)}
  </button>
);

export default Icon;
