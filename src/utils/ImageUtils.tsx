// src/utils/ImageUtils.ts
import React from 'react';

const logoData = [
  { type: 'main', src: '/assets/images/로고/피팁.png' },
  { type: 'university', src: '/assets/images/로고/평택대학교.png' },
];

export const getLogoImage = (type: string, alt: string = 'Logo') => {
  const logo = logoData.find((logo) => logo.type === type);
  if (!logo) return null;

  return <img key={type} src={logo.src} alt={alt} className="logo-image" />;
};