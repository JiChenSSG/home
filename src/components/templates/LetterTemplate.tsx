'use client';

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface LetterTemplateProps {
  children: ReactNode;
  title: string;
  date?: string;
  sender?: string;
  showBackButton?: boolean;
  backButtonText?: string;
  onBackClick?: () => void;
  className?: string;
}

const LetterTemplate: React.FC<LetterTemplateProps> = ({
  children,
  title,
  date = new Date().toLocaleDateString('zh-CN'),
  sender = "发件人",
  showBackButton = true,
  backButtonText = "返回主页",
  onBackClick,
  className = ""
}) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.push('/');
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-100 relative ${className}`}>
      {/* 页面内容 */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* 返回按钮 */}
        {showBackButton && (
          <button
            onClick={handleBackClick}
            className="mb-8 inline-flex items-center space-x-2 text-pink-600 hover:text-pink-800 transition-colors duration-200 group"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            <span className="font-medium">{backButtonText}</span>
          </button>
        )}

        {/* 信件内容 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12">
          {/* 信件头部 */}
          <div className="border-b border-pink-200 pb-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    {title}
                  </h1>
                  <p className="text-pink-600 font-medium">{date}</p>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-16 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded border border-pink-600 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* 信件正文内容 - 由children传入 */}
          <div className="prose prose-lg prose-pink max-w-none">
            {children}

						{/* 署名 */}
            <div className="text-right mt-8">
              <p className="text-gray-500 mb-2 italic">爱你的{sender}</p>
              <p className="text-pink-600 font-semibold text-xl">mua~</p>
            </div>
          </div>

          {/* 装饰元素 */}
          <div className="mt-12 pt-8 border-t border-pink-200">
            <div className="flex items-center justify-center space-x-6">
              <div className="w-3 h-3 bg-pink-300 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-rose-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="w-4 h-4 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="w-2 h-2 bg-rose-300 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
              <div className="w-3 h-3 bg-pink-300 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LetterTemplate;