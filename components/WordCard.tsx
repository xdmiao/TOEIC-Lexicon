
import React from 'react';
import { Word } from '../types';
import { playPronunciation } from '../geminiService';

interface WordCardProps {
  word: Word;
  onLearned?: (id: string) => void;
  onFavorite?: (id: string) => void;
}

const WordCard: React.FC<WordCardProps> = ({ word, onLearned, onFavorite }) => {
  const handleSpeech = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPronunciation(word.word);
  };

  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 p-8 flex flex-col h-full">
        {/* Top Section: Word and Pronunciation */}
        <div className="text-center mb-6">
          <h2 className="text-5xl font-bold text-slate-900 mb-6">{word.word}</h2>
          
          <div className="flex flex-col gap-3 items-center justify-center">
            {/* US Phonetic */}
            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full">
              <span className="text-xs font-bold text-indigo-500 w-6">US</span>
              <span className="text-md text-slate-600 font-mono">/{word.phonetic_us}/</span>
              <button 
                onClick={handleSpeech}
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
                title="播放美式发音"
              >
                <i className="fa-solid fa-volume-high"></i>
              </button>
            </div>
            
            {/* UK Phonetic */}
            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full">
              <span className="text-xs font-bold text-rose-500 w-6">UK</span>
              <span className="text-md text-slate-600 font-mono">/{word.phonetic_uk}/</span>
              <button 
                onClick={handleSpeech}
                className="text-rose-600 hover:text-rose-800 transition-colors"
                title="播放英式发音"
              >
                <i className="fa-solid fa-volume-high"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Middle Section: Definition */}
        <div className="bg-slate-50 rounded-2xl p-5 mb-6 text-center">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-tight mb-2">中文释义</h3>
          <p className="text-xl font-bold text-slate-800">{word.definition}</p>
        </div>

        {/* Example Section */}
        <div className="space-y-3 flex-grow overflow-y-auto mb-6">
          <div className="p-5 border border-slate-100 rounded-2xl bg-indigo-50/30">
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-tight mb-2 flex items-center gap-2">
              <i className="fa-solid fa-quote-left"></i> 场景例句
            </h3>
            <p className="text-slate-800 font-medium leading-relaxed mb-2 text-lg">
              {word.example_en}
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              {word.example_zh}
            </p>
          </div>
        </div>

        {/* Bottom Section: Action Buttons */}
        <div className="flex gap-4 pt-4 border-t border-slate-50">
          <button
            onClick={() => onLearned?.(word.id)}
            className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 hover:bg-emerald-600 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-check"></i> 已学习
          </button>
          <button
            onClick={() => onFavorite?.(word.id)}
            className="flex-1 py-4 bg-amber-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-amber-200 hover:bg-amber-600 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-star"></i> 收藏
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordCard;
