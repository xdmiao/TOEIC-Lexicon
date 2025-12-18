
import React, { useState } from 'react';
import { WordPack, Word } from '../types';
import WordCard from './WordCard';

interface StudySessionProps {
  pack: WordPack;
  onFinish: () => void;
  onWordAction: (id: string, action: 'learned' | 'favorite') => void;
}

const StudySession: React.FC<StudySessionProps> = ({ pack, onFinish, onWordAction }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentWord = pack.words[currentIndex];

  const handleNext = () => {
    if (currentIndex < pack.words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinish();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleLearned = (id: string) => {
    onWordAction(id, 'learned');
    handleNext();
  };

  const handleFavorite = (id: string) => {
    onWordAction(id, 'favorite');
    handleNext();
  };

  const progress = ((currentIndex + 1) / pack.words.length) * 100;

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="flex items-center justify-between pt-4">
        <button 
          onClick={onFinish}
          className="w-10 h-10 rounded-full bg-white text-slate-400 border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="flex flex-col items-center">
          <span className="font-bold text-slate-800 text-sm">{pack.title}</span>
          <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full mt-1">
            {currentIndex + 1} / {pack.words.length}
          </span>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Main Content - Card */}
      <div className="flex-grow flex items-stretch">
        <WordCard 
          word={currentWord} 
          onLearned={handleLearned}
          onFavorite={handleFavorite}
        />
      </div>

      {/* Manual Navigation Hooks */}
      <div className="flex justify-between items-center px-2 pb-2">
        <button 
          disabled={currentIndex === 0}
          onClick={handlePrev}
          className={`text-sm font-bold flex items-center gap-2 transition-all ${
            currentIndex === 0 ? 'text-slate-200' : 'text-slate-400 hover:text-indigo-600'
          }`}
        >
          <i className="fa-solid fa-chevron-left"></i> 上一个
        </button>
        <span className="text-xs text-slate-300 font-medium">点击底部按钮进行分类</span>
        <button 
          onClick={handleNext}
          className="text-sm font-bold flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all"
        >
          跳过 <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default StudySession;
