'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Letter from '../ui/Letter';

interface FallingLettersProps {
  onLetterClick?: (clickX: number, clickY: number) => void;
  onAnimationComplete?: () => void;
}

const FallingLetters: React.FC<FallingLettersProps> = ({ onLetterClick, onAnimationComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // 安全地获取窗口尺寸
  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };

    // 初始设置
    updateDimensions();

    // 监听窗口大小变化
    const handleResize = () => {
      updateDimensions();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // 设置信件初始位置在屏幕中央上方
  const centerX = (dimensions.width - 80) / 2; // 80是信件宽度
  const finalY = dimensions.height - 120; // 距离底部120px

  const handleLetterClick = () => {
    if (isOpening) return; // 防止重复点击
    
    setIsOpening(true);
    
    // 简单的点击反馈
    if (!containerRef.current) return;
    const letter = containerRef.current.querySelector('.falling-letter');
    
    if (!letter) return;

    // 获取信件当前位置
    const letterElement = letter as HTMLElement;
    const rect = letterElement.getBoundingClientRect();
    const clickX = rect.left + rect.width / 2;
    const clickY = rect.top + rect.height / 2;

    // 停止所有当前动画
    gsap.killTweensOf(letter);

    // 简单的点击反馈动画
    gsap.to(letter, {
      scale: 1.1,
      duration: 0.1,
      ease: 'power1.out',
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        // 传递点击位置信息
        onLetterClick?.(clickX, clickY);
        onAnimationComplete?.();
      }
    });
  };

  useEffect(() => {
    if (!containerRef.current || dimensions.width === 0 || dimensions.height === 0) return;

    const letter = containerRef.current.querySelector('.falling-letter');
    
    if (!letter) return;

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

    return () => {
      gsap.killTweensOf(letter);
    };
  }, [centerX, finalY, dimensions.width, dimensions.height]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ overflow: 'hidden' }}
    >
      <div className="falling-letter absolute pointer-events-auto">
        <Letter 
          onClick={handleLetterClick}
          className="transform-gpu hover:scale-110 transition-transform duration-300"
          showPaper={false}
        />
      </div>
    </div>
  );
};

export default FallingLetters;