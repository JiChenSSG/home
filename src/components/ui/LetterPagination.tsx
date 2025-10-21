'use client';

import React, { useState, ReactNode } from 'react';
import { gsap } from 'gsap';

interface LetterPaginationProps {
  pages: ReactNode[];
  className?: string;
}

const LetterPagination: React.FC<LetterPaginationProps> = ({ 
  pages,
  className = ""
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalPages = pages.length;

  const handleNextPage = () => {
    if (currentPage < totalPages - 1 && !isAnimating) {
      animatePageTransition(currentPage + 1, 'next');
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0 && !isAnimating) {
      animatePageTransition(currentPage - 1, 'prev');
    }
  };

  const handlePageClick = (pageIndex: number) => {
    if (pageIndex !== currentPage && !isAnimating) {
      const direction = pageIndex > currentPage ? 'next' : 'prev';
      animatePageTransition(pageIndex, direction);
    }
  };

  const animatePageTransition = (newPage: number, direction: 'next' | 'prev') => {
    setIsAnimating(true);
    
    const currentContent = document.querySelector(`[data-page="${currentPage}"]`);
    const nextContent = document.querySelector(`[data-page="${newPage}"]`);
    
    if (!currentContent || !nextContent) {
      setCurrentPage(newPage);
      setIsAnimating(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentPage(newPage);
        setIsAnimating(false);
      }
    });

    // 根据方向设置不同的动画效果
    const exitX = direction === 'next' ? -20 : 20;
    const enterX = direction === 'next' ? 20 : -20;

    tl
      .to(currentContent, {
        opacity: 0,
        x: exitX,
        duration: 0.3,
        ease: 'power2.in'
      })
      .set(nextContent, {
        opacity: 0,
        x: enterX
      })
      .to(nextContent, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
  };

  return (
    <div className={`relative ${className}`}>
      {/* 页面内容 */}
      <div className="relative min-h-[400px]">
        {pages.map((page, index) => (
          <div
            key={index}
            data-page={index}
            className={`${
              index === currentPage ? 'relative' : 'absolute inset-0 opacity-0 pointer-events-none'
            }`}
          >
            {page}
          </div>
        ))}
      </div>

      {/* 分页控制 */}
      <div className="mt-8 flex items-center justify-between">
        {/* 上一页按钮 */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0 || isAnimating}
          className={`
            group flex items-center space-x-2 px-4 py-2 rounded-lg
            transition-all duration-200
            ${currentPage === 0 || isAnimating
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-pink-600 hover:text-pink-800 hover:bg-pink-50'
            }
          `}
        >
          <svg 
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
          <span className="font-medium">上一页</span>
        </button>

        {/* 页码指示器 */}
        <div className="flex items-center space-x-2">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index)}
              disabled={isAnimating}
              className={`
                w-2.5 h-2.5 rounded-full transition-all duration-300
                ${index === currentPage 
                  ? 'w-8 bg-gradient-to-r from-pink-400 to-rose-500' 
                  : 'bg-pink-200 hover:bg-pink-300'
                }
                ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
              aria-label={`第 ${index + 1} 页`}
            />
          ))}
        </div>

        {/* 下一页按钮 */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1 || isAnimating}
          className={`
            group flex items-center space-x-2 px-4 py-2 rounded-lg
            transition-all duration-200
            ${currentPage === totalPages - 1 || isAnimating
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-pink-600 hover:text-pink-800 hover:bg-pink-50'
            }
          `}
        >
          <span className="font-medium">下一页</span>
          <svg 
            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </button>
      </div>

      {/* 页码文本 */}
      <div className="text-center mt-4 text-sm text-gray-500">
        第 {currentPage + 1} 页 / 共 {totalPages} 页
      </div>
    </div>
  );
};

export default LetterPagination;
