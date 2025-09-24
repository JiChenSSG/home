'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useRouter, useSearchParams } from 'next/navigation';
import LetterTemplate from '../../components/templates/LetterTemplate';
import '../../styles/letter.css';

export default function LetterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contentRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);

  // 获取信件点击时的位置参数，提供默认值
  const clickX = parseFloat(searchParams.get('clickX') || '0');
  const clickY = parseFloat(searchParams.get('clickY') || '0');
  
  // 安全地获取屏幕中心位置
  const getScreenCenter = () => {
    if (typeof window !== 'undefined') {
      return {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      };
    }
    return { x: 0, y: 0 };
  };

  useEffect(() => {
    if (!contentRef.current || !letterRef.current || !envelopeRef.current || !paperRef.current) return;

    // 安全地获取屏幕中心位置
    const screenCenter = getScreenCenter();

    // 创建完整的信件打开动画序列
    const tl = gsap.timeline();

    // 设置初始状态
    gsap.set(contentRef.current, {
      opacity: 0
    });

    // 如果有传入位置参数，从该位置开始；否则从屏幕中心开始
    gsap.set(letterRef.current, {
      scale: 1,
      x: clickX || screenCenter.x,
      y: clickY || screenCenter.y, 
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
      // 1. 从传入位置移动到屏幕中心并放大
      .to(letterRef.current, {
        x: screenCenter.x,
        y: screenCenter.y,
        scale: 1.5,
        duration: 0.6,
        ease: 'power2.out'
      })
      
      // 2. 暂停展示信件
      .to({}, { duration: 0.3 })
      
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

  }, [clickX, clickY]);

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
    <div className="relative">
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

      {/* 信件内容使用简化模板 */}
      <div ref={contentRef}>
        <LetterTemplate
          title="祝我宝宝生日快乐"
          date="2025年9月19日"
          sender="朱亦宇"
          onBackClick={handleBackClick}
        >
          {/* 信件正文内容 */}
          <p className="letter-header">
            你好苏天译，
          </p>
          
          <p className="letter-text">
            感谢你打开这封特别的信件。这里是一个充满创意和想象的空间，
            每一个像素都承载着对美好的向往。在这个数字世界里，我们用心雕琢每一个细节。
          </p>

          <p className="letter-text">
            在这个数字化的时代，我们用代码编织梦想，用设计传递情感。
            这封粉色的信件不仅仅是一个简单的动画，更是一份对细节的执着，
            对用户体验的用心雕琢。每一个交互都蕴含着创作者的温度。
          </p>

          <div className="letter-quote">
            <p>
              &ldquo;设计不只是外观和感觉，设计是如何工作的。每一次点击，每一个过渡，
              都应该让人感受到关怀和温暖。&rdquo;
            </p>
            <footer>— 致每一位追求美好体验的创作者</footer>
          </div>

          <p className="letter-text">
            希望这个小小的交互能给你带来一丝惊喜和温暖。
            愿你的每一天都像这封信一样，充满色彩和美好。
            在快节奏的生活中，不要忘记停下来欣赏那些精心设计的小美好。
          </p>
        </LetterTemplate>
      </div>
    </div>
  );
}