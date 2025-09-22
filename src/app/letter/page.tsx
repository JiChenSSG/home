'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';

export default function LetterPage() {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !letterRef.current || !envelopeRef.current || !paperRef.current) return;

    // 创建完整的信件打开动画序列
    const tl = gsap.timeline();

    // 设置初始状态
    gsap.set(contentRef.current, {
      opacity: 0
    });

    gsap.set(letterRef.current, {
      scale: 1.5,
      x: '50vw',
      y: '50vh',
      xPercent: -50,
      yPercent: -50,
    });

    gsap.set(paperRef.current, {
      y: 0,
      opacity: 0,
      scale: 1
    });

    gsap.set(envelopeRef.current, {
      y: 0,
      opacity: 1
    });

    // 动画序列
    tl
      // 1. 暂停展示信件
      .to({}, { duration: 0.5 })
      
      // 2. 信纸从信封中抽出
      .to(paperRef.current, {
        y: -40,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      })
      
      // 3. 信封向下移动
      .to(envelopeRef.current, {
        y: 60,
        opacity: 0.6,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.4')
      
      // 4. 信纸继续向上移动并放大
      .to(paperRef.current, {
        y: -100,
        scale: 1.5,
        duration: 0.6,
        ease: 'power2.out'
      })
      
      // 5. 信纸变换为页面内容
      .to(paperRef.current, {
        scale: 8,
        y: -150,
        opacity: 0.3,
        duration: 0.8,
        ease: 'power2.inOut'
      })
      
      // 6. 同时淡入真实页面内容
      .to(contentRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.6')
      
      // 7. 隐藏信件动画
      .to(letterRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      }, '-=0.3');

  }, []);

  const handleBackClick = () => {
    if (!contentRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => router.push('/')
    });

    tl.to(contentRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.3,
      ease: 'power1.in'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-100 relative">
      {/* 信件动画层 */}
      <div 
        ref={letterRef}
        className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
      >
        {/* 信封 */}
        <div ref={envelopeRef} className="absolute">
          <svg
            width="120"
            height="96"
            viewBox="0 0 80 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-2xl"
          >
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
            <path
              d="M4 14 L40 36 L76 14"
              stroke="#ec4899"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M4 12 L40 34 L76 12 L76 14 L40 36 L4 14 Z"
              fill="url(#pinkGradientDark)"
              stroke="#ec4899"
              strokeWidth="1.5"
            />
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
            <path
              d="M57 20.5 C57 19.5 57.8 18.8 58.5 18.8 C59.2 18.8 60 19.5 60 20.5 C60 19.5 60.8 18.8 61.5 18.8 C62.2 18.8 63 19.5 63 20.5 C63 21.5 60 24 60 24 S57 21.5 57 20.5"
              fill="#ffffff"
              opacity="0.7"
            />
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

        {/* 信纸 */}
        <div ref={paperRef} className="absolute">
          <svg
            width="120"
            height="96"
            viewBox="0 0 80 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-xl"
          >
            <rect
              x="8"
              y="4"
              width="64"
              height="56"
              rx="2"
              fill="#ffffff"
              stroke="#f3f4f6"
              strokeWidth="1"
            />
            <line x1="14" y1="12" x2="66" y2="12" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="14" y1="18" x2="62" y2="18" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="14" y1="24" x2="64" y2="24" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="14" y1="30" x2="58" y2="30" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="14" y1="36" x2="60" y2="36" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="14" y1="42" x2="56" y2="42" stroke="#e5e7eb" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* 页面内容 */}
      <div 
        ref={contentRef}
        className="container mx-auto px-6 py-12 max-w-4xl"
      >
        {/* 返回按钮 */}
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
          <span className="font-medium">返回主页</span>
        </button>

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
                    来自远方的问候
                  </h1>
                  <p className="text-pink-600 font-medium">2025年9月19日</p>
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

          {/* 信件正文 */}
          <div className="prose prose-lg prose-pink max-w-none">
            <p className="text-xl leading-relaxed text-gray-700 mb-6 font-medium">
              亲爱的朋友，
            </p>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              感谢你打开这封特别的信件。这里是一个充满创意和想象的空间，
              每一个像素都承载着对美好的向往。在这个数字世界里，我们用心雕琢每一个细节。
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              在这个数字化的时代，我们用代码编织梦想，用设计传递情感。
              这封粉色的信件不仅仅是一个简单的动画，更是一份对细节的执着，
              对用户体验的用心雕琢。每一个交互都蕴含着创作者的温度。
            </p>

            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6 mb-6 border-l-4 border-pink-300">
              <p className="text-pink-800 italic text-lg leading-relaxed">
                "设计不只是外观和感觉，设计是如何工作的。每一次点击，每一个过渡，
                都应该让人感受到关怀和温暖。"
              </p>
              <footer className="text-pink-600 text-sm mt-3 font-medium">— 致每一位追求美好体验的创作者</footer>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              希望这个小小的交互能给你带来一丝惊喜和温暖。
              愿你的每一天都像这封信一样，充满色彩和美好。
              在快节奏的生活中，不要忘记停下来欣赏那些精心设计的小美好。
            </p>

            <div className="text-right mt-8">
              <p className="text-gray-500 mb-2 italic">此致</p>
              <p className="text-pink-600 font-semibold text-xl">敬礼</p>
              <p className="text-gray-400 text-sm mt-2">来自代码世界的温暖问候</p>
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

        {/* 底部操作按钮 */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-medium hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-200 shadow-lg">
            分享这封信
          </button>
          <button className="px-8 py-3 bg-white text-pink-600 border-2 border-pink-300 rounded-full font-medium hover:bg-pink-50 transform hover:scale-105 transition-all duration-200">
            收藏到心愿单
          </button>
        </div>
      </div>
    </div>
  );
}