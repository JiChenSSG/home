'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useRouter, useSearchParams } from 'next/navigation';
import { LetterTemplate, PaperSvg, EnvelopeSvg, LetterPagination } from '@/components';
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
					<EnvelopeSvg 
						width={140} 
						height={100} 
						className="drop-shadow-2xl" 
					/>
				</div>

        {/* 信纸 */}
        <div ref={paperRef} className="absolute">
					<PaperSvg 
						width={140} 
						height={180} 
						className="drop-shadow-2xl" 
					/>
				</div>
				
			</div>

      <div ref={contentRef}>
        <LetterTemplate
          title="祝我宝宝生日快乐"
          date="2025年9月19日"
          sender="朱亦宇"
          onBackClick={handleBackClick}
					end='(ꈍᴗꈍ)ε｀*)~'
        >
          {/* 使用分页组件 */}
          <LetterPagination
            pages={[
              // 第一页
              <>
                <p className="letter-header">
                  早上好苏天译，
                </p>
                
                <p className="letter-text">
                  想了很久这里写什么，如果光是一些生日祝福的话感觉写不了多少，白费我写了这么多代码，那就把我想对你说的话都写在这里吧。
                </p>

                <p className="letter-text">
                  首先，祝你生日快乐！希望你在新的一岁里，能够开开心心，健健康康，万事顺意。
                </p>
              </>,
              
              // 第二页
              <>
                <p className="letter-text">
                  认识你这么久，看着你一点一点成长，真的很高兴。你总是那么努力，那么坚强，遇到困难也从不轻易放弃。
                </p>

                <div className="letter-quote">
                  <p>
                    &ldquo;愿你三冬暖，愿你春不寒。愿你天黑有灯，下雨有伞。愿你路上有良人相伴。&rdquo;
                  </p>
                  <footer>—— 送给最特别的你</footer>
                </div>

                <p className="letter-text">
                  希望你能一直保持这份初心，继续勇敢地追求自己的梦想。
                </p>
              </>,
              
              // 第三页
              <>
                <p className="letter-text">
                  未来的日子里，不管遇到什么，记得还有我一直在你身边支持你。虽然我可能做得不够好，但我会一直努力。
                </p>

                <p className="letter-text">
                  最后，再次祝你生日快乐！愿所有美好都如期而至，愿你被这个世界温柔以待。
                </p>

                <div className="letter-quote-highlight">
                  <p>
                    愿你永远年轻，永远热泪盈眶，永远相信美好。
                  </p>
                </div>
              </>
            ]}
          />
        </LetterTemplate>
      </div>
    </div>
  );
}