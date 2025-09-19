'use client';

import React from 'react';

interface LetterProps {
  className?: string;
  onClick?: () => void;
}

const Letter: React.FC<LetterProps> = ({ className, onClick }) => {
  return (
    <div 
      className={`cursor-pointer transform hover:scale-105 transition-transform ${className}`}
      onClick={onClick}
    >
      <svg
        width="80"
        height="64"
        viewBox="0 0 80 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl"
      >
        {/* 信封主体 - 粉色渐变 */}
        <rect
          x="4"
          y="12"
          width="72"
          height="48"
          rx="3"
          fill="url(#pinkGradient)"
          stroke="#ec4899"
          strokeWidth="1.5"
        />
        
        {/* 信封顶部折叠 */}
        <path
          d="M4 14 L40 36 L76 14"
          stroke="#ec4899"
          strokeWidth="1.5"
          fill="none"
        />
        
        {/* 信封封口 - 深粉色 */}
        <path
          d="M4 12 L40 34 L76 12 L76 14 L40 36 L4 14 Z"
          fill="url(#pinkGradientDark)"
          stroke="#ec4899"
          strokeWidth="1.5"
        />
        
        {/* 信件内容线条 - 粉色系 */}
        <line x1="12" y1="22" x2="68" y2="22" stroke="#f9a8d4" strokeWidth="1.2" />
        <line x1="12" y1="28" x2="60" y2="28" stroke="#f9a8d4" strokeWidth="1.2" />
        <line x1="12" y1="34" x2="64" y2="34" stroke="#f9a8d4" strokeWidth="1.2" />
        <line x1="12" y1="40" x2="56" y2="40" stroke="#f9a8d4" strokeWidth="1.2" />
        
        {/* 邮票 - 粉色主题 */}
        <rect
          x="52"
          y="16"
          width="18"
          height="12"
          rx="1.5"
          fill="url(#stampGradient)"
          stroke="#be185d"
          strokeWidth="0.8"
        />
        <circle cx="61" cy="22" r="2.5" fill="#ffffff" opacity="0.9" />
        
        {/* 爱心装饰 */}
        <path
          d="M57 20.5 C57 19.5 57.8 18.8 58.5 18.8 C59.2 18.8 60 19.5 60 20.5 C60 19.5 60.8 18.8 61.5 18.8 C62.2 18.8 63 19.5 63 20.5 C63 21.5 60 24 60 24 S57 21.5 57 20.5"
          fill="#ffffff"
          opacity="0.7"
        />
        
        {/* 渐变定义 */}
        <defs>
          <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fdf2f8" />
            <stop offset="50%" stopColor="#fce7f3" />
            <stop offset="100%" stopColor="#fbcfe8" />
          </linearGradient>
          <linearGradient id="pinkGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f9a8d4" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="stampGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#be185d" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Letter;