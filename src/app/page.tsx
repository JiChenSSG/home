'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import FallingLetters from "../components/FallingLetters";

export default function Home() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLetterClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    // 直接跳转，不等待动画
    router.push('/letter');
  };

  const handleAnimationComplete = () => {
    // 动画完成的回调（现在几乎立即触发）
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* 飘落的信件动画 */}
      <FallingLetters 
        onLetterClick={handleLetterClick}
        onAnimationComplete={handleAnimationComplete}
      />
    </div>
  );
}