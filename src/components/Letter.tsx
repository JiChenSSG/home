'use client';

import React from 'react';

interface LetterProps {
  className?: string;
  onClick?: () => void;
  showPaper?: boolean;
}

const Letter: React.FC<LetterProps> = ({ className, onClick, showPaper = false }) => {
  return (
    <div 
      className={`cursor-pointer transform hover:scale-105 transition-transform relative ${className}`}
      onClick={onClick}
    >
      {/* 信纸 - 在信封后面 */}
      {showPaper && (
        <div className="letter-paper absolute inset-0 z-10">
          <svg
            width="80"
            height="64"
            viewBox="0 0 80 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-xl"
          >
            {/* 信纸背景 */}
            <rect
              x="8"
              y="4"
              width="64"
              height="56"
              rx="2"
              fill="url(#paperGradient)"
              stroke="#f3f4f6"
              strokeWidth="1"
            />
            
            {/* 信纸内容 */}
            <line x1="14" y1="12" x2="66" y2="12" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="14" y1="18" x2="62" y2="18" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="14" y1="24" x2="64" y2="24" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="14" y1="30" x2="58" y2="30" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="14" y1="36" x2="60" y2="36" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="14" y1="42" x2="56" y2="42" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="14" y1="48" x2="62" y2="48" stroke="#e5e7eb" strokeWidth="1" />
            
            {/* 手写文字模拟 */}
            <path d="M14 14 Q18 16 22 14 T30 14" stroke="#4b5563" strokeWidth="1.5" fill="none" />
            <path d="M32 14 Q36 16 40 14 T48 14" stroke="#4b5563" strokeWidth="1.5" fill="none" />
            
            <path d="M14 20 Q20 22 26 20 T38 20" stroke="#4b5563" strokeWidth="1.5" fill="none" />
            <path d="M40 20 Q44 22 48 20 T56 20" stroke="#4b5563" strokeWidth="1.5" fill="none" />
            
            {/* 更多内容线条 */}
            <circle cx="16" cy="26" r="1" fill="#f59e0b" />
            <path d="M20 26 Q24 28 28 26 T36 26" stroke="#4b5563" strokeWidth="1.5" fill="none" />
            
            <defs>
              <linearGradient id="paperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#fefefe" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
      
      {/* 信封 */}
      <div className="letter-envelope relative z-20">
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
    </div>
  );
};

export default Letter;