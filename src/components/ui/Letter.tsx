'use client';

import React from 'react';
import { EnvelopeSvg, PaperSvg } from '../icons';

interface LetterProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  showPaper?: boolean;
}

const Letter: React.FC<LetterProps> = ({ onClick, className = "", showPaper = true }) => {
  return (
    <div 
      className={`inline-block cursor-pointer transform transition-transform hover:scale-105 ${className}`}
      onClick={onClick}
    >
      <div className="relative">
        {/* 信封 */}
        <EnvelopeSvg width={80} height={64} />
        
        {/* 信纸 - 从信封中探出 */}
        {showPaper && (
          <div className="absolute top-[-16px] left-[5px]">
            <PaperSvg width={70} height={90} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Letter;