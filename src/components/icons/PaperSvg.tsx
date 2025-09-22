import React from 'react';

interface PaperSvgProps {
  width?: number;
  height?: number;
  className?: string;
}

const PaperSvg: React.FC<PaperSvgProps> = ({ 
  width = 70, 
  height = 90, 
  className = "" 
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 70 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 信纸主体 - 米白色 */}
      <rect
        x="2"
        y="2"
        width="66"
        height="86"
        rx="3"
        fill="#fefefe"
        stroke="#f3f4f6"
        strokeWidth="1"
      />
      
      {/* 信纸装饰线 */}
      <line x1="8" y1="12" x2="62" y2="12" stroke="#fce7f3" strokeWidth="1" />
      <line x1="8" y1="20" x2="58" y2="20" stroke="#fce7f3" strokeWidth="0.8" />
      <line x1="8" y1="28" x2="60" y2="28" stroke="#fce7f3" strokeWidth="0.8" />
      <line x1="8" y1="36" x2="55" y2="36" stroke="#fce7f3" strokeWidth="0.8" />
      <line x1="8" y1="44" x2="62" y2="44" stroke="#fce7f3" strokeWidth="0.8" />
      <line x1="8" y1="52" x2="57" y2="52" stroke="#fce7f3" strokeWidth="0.8" />
      <line x1="8" y1="60" x2="59" y2="60" stroke="#fce7f3" strokeWidth="0.8" />
      
      {/* 左边距线 */}
      <line x1="10" y1="8" x2="10" y2="82" stroke="#fdf2f8" strokeWidth="1.5" />
      
      {/* 页面顶部装饰 */}
      <rect x="8" y="6" width="54" height="2" rx="1" fill="url(#paperHeaderGradient)" />
      
      {/* 小装饰花纹 */}
      <circle cx="15" cy="75" r="1.5" fill="#fce7f3" />
      <circle cx="25" cy="78" r="1" fill="#fce7f3" />
      <circle cx="35" cy="76" r="1.2" fill="#fce7f3" />
      
      {/* 渐变定义 */}
      <defs>
        <linearGradient id="paperHeaderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fce7f3" />
          <stop offset="50%" stopColor="#f9a8d4" />
          <stop offset="100%" stopColor="#fce7f3" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default PaperSvg;