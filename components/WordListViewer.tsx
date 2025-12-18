
import React from 'react';
import { Word } from '../types';
import { playPronunciation } from '../geminiService';

interface WordListViewerProps {
  title: string;
  words: (Word | Omit<Word, 'id' | 'difficulty' | 'categoryId'>)[];
  onBack: () => void;
}

const WordListViewer: React.FC<WordListViewerProps> = ({ title, words, onBack }) => {
  return (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-bottom duration-300">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        </div>
        <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">
          {words.length} 词
        </span>
      </header>

      <div className="flex-grow overflow-y-auto px-6 py-4 space-y-4 scrollbar-hide">
        {words.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <i className="fa-solid fa-box-open text-4xl mb-4"></i>
            <p>暂无单词记录</p>
          </div>
        ) : (
          words.map((w: any, idx) => (
            <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group">
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-slate-900">{w.word}</h3>
                  <div className="flex gap-2">
                    <span className="text-[10px] text-indigo-400 font-mono">/{w.phonetic_us}/</span>
                    <span className="text-[10px] text-rose-400 font-mono">/{w.phonetic_uk}/</span>
                  </div>
                </div>
                <p className="text-slate-600 text-sm font-medium">{w.definition}</p>
              </div>
              <button 
                onClick={() => playPronunciation(w.word)}
                className="w-10 h-10 rounded-full bg-white text-indigo-500 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <i className="fa-solid fa-volume-high"></i>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WordListViewer;
