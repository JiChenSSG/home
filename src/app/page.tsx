'use client';

import { useRouter } from "next/navigation";
import FallingLetters from "../components/FallingLetters";

export default function Home() {
  const router = useRouter();

  const handleLetterClick = () => {
		router.push("/test");
	};

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* 飘落的信件动画 */}
      <FallingLetters onLetterClick={handleLetterClick} />
    </div>
  );
}