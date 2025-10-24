import React from 'react';

interface HeartSvgProps {
  width?: number;
  height?: number;
  className?: string;
  filled?: boolean;
}

const HeartSvg: React.FC<HeartSvgProps> = ({ 
  width = 24, 
  height = 24, 
  className = "",
  filled = false
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 21.35C11.82 21.35 11.65 21.28 11.53 21.16C8.55 18.45 1 11.27 1 6.5C1 3.42 3.42 1 6.5 1C8.24 1 9.91 1.81 11 3.09C12.09 1.81 13.76 1 15.5 1C18.58 1 21 3.42 21 6.5C21 11.27 13.45 18.45 10.47 21.16C10.35 21.28 10.18 21.35 10 21.35H12Z"
        fill={filled ? "url(#heartGradient)" : "none"}
        stroke="url(#heartGradient)"
        strokeWidth={filled ? "0" : "1.5"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* 渐变定义 */}
      <defs>
        <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f9a8d4" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#be185d" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default HeartSvg;