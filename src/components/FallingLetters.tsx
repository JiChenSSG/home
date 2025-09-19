'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Letter from './Letter';

interface FallingLettersProps {
  onLetterClick?: () => void;
}

const FallingLetters: React.FC<FallingLettersProps> = ({ onLetterClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const letter = containerRef.current.querySelector('.falling-letter');
    
    if (!letter) return;

    // 设置信件初始位置在屏幕中央上方
    const centerX = (window.innerWidth - 80) / 2; // 80是信件宽度
    const finalY = window.innerHeight - 120; // 距离底部120px

    gsap.set(letter, {
      x: centerX,
      y: -100,
      rotation: -5,
      opacity: 0.9,
    });

    // 创建飘落动画
    const tl = gsap.timeline();

    // 第一阶段：从上方飘落，带有轻微摇摆
    tl.to(letter, {
      y: finalY,
      duration: 3,
      ease: 'power2.out',
    })
    .to(letter, {
      x: centerX + 15,
      duration: 1.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: 1,
    }, 0)
    .to(letter, {
      rotation: 5,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: 1,
    }, 0)
    // 第二阶段：到达底部后的轻微弹跳
    .to(letter, {
      y: finalY - 10,
      duration: 0.3,
      ease: 'bounce.out',
    })
    .to(letter, {
      y: finalY,
      duration: 0.2,
      ease: 'power2.out',
    })
    // 第三阶段：停住后的轻微摇摆表示可点击
    .to(letter, {
      rotation: -2,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })
    .to(letter, {
      scale: 1.02,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    }, '-=2');

    // 窗口大小调整时重新定位
    const handleResize = () => {
      const newCenterX = (window.innerWidth - 80) / 2;
      const newFinalY = window.innerHeight - 120;
      
      gsap.set(letter, {
        x: newCenterX,
        y: newFinalY,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      gsap.killTweensOf(letter);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ overflow: 'hidden' }}
    >
      <div className="falling-letter absolute pointer-events-auto">
        <Letter 
          onClick={onLetterClick}
          className="transform-gpu hover:scale-110 transition-transform duration-300"
        />
      </div>
    </div>
  );
};

export default FallingLetters;