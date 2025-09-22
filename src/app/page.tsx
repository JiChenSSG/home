'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import FallingLetters from "../components/FallingLetters";

export default function Home() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLetterClick = (clickX: number, clickY: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    // 传递点击位置参数并跳转
    router.push(`/letter?clickX=${clickX}&clickY=${clickY}`);
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