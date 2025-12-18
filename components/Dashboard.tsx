
import React from 'react';
import { UserStats, AppTab, Category } from '../types';

interface DashboardProps {
  stats: UserStats;
  categories: Category[];
  reviewCount: number;
  learnedCount: number;
  favoriteCount: number;
  totalCount: number;
  onSelectCategory: (cat: Category) => void;
  onNavigate: (tab: AppTab) => void;
  onViewWordList: (type: 'learned' | 'favorite' | 'toeic') => void;
  onStartReview: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  stats, 
  categories, 
  reviewCount, 
  learnedCount,
  favoriteCount,
  totalCount,
  onSelectCategory, 
  onNavigate, 
  onViewWordList,
  onStartReview 
}) => {
  return (
    <div className="space-y-8 pb-10">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">欢迎回来！ 👋</h1>
          <p className="text-slate-500">掌握托业核心词汇，助力职场进阶。</p>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
          <div className="text-3xl font-bold text-indigo-600 mb-1">{stats.wordsLearned}</div>
          <div className="text-xs text-slate-400 font-bold uppercase tracking-tight">已学单词</div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
          <div className="text-3xl font-bold text-orange-500 mb-1">{stats.streak}</div>
          <div className="text-xs text-slate-400 font-bold uppercase tracking-tight">连续天数</div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
          <div className="text-3xl font-bold text-emerald-500 mb-1">{Math.floor(stats.totalTime / 60)}分</div>
          <div className="text-xs text-slate-400 font-bold uppercase tracking-tight">学习时长</div>
        </div>
      </div>

      {/* Review Banner */}
      {reviewCount > 0 && (
        <div 
          onClick={onStartReview}
          className="bg-rose-50 border border-rose-100 p-5 rounded-3xl flex items-center justify-between cursor-pointer hover:bg-rose-100 transition-colors shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-500 text-white rounded-2xl flex items-center justify-center text-xl">
              <i className="fa-solid fa-clock-rotate-left"></i>
            </div>
            <div>
              <h4 className="font-bold text-rose-900">{reviewCount} 个单词待复习</h4>
              <p className="text-sm text-rose-600">根据智能计划今日需复习</p>
            </div>
          </div>
          <i className="fa-solid fa-chevron-right text-rose-300"></i>
        </div>
      )}

      {/* Word Books Section */}
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-4">我的词书</h3>
        <div className="grid grid-cols-1 gap-4">
          <div 
            onClick={() => onViewWordList('toeic')}
            className="bg-amber-500 p-6 rounded-[32px] text-white shadow-lg shadow-amber-200 cursor-pointer active:scale-[0.98] transition-all relative overflow-hidden group"
          >
            <div className="relative z-10">
              <span className="text-xs font-bold opacity-80 uppercase tracking-widest block mb-1">Essential Library</span>
              <h4 className="text-2xl font-black mb-1">托业核心词书</h4>
              <p className="text-sm opacity-90">收录新东方托业 3500+ 高频词汇</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">{totalCount} 词</span>
                <span className="text-xs font-medium">点击查看完整列表</span>
              </div>
            </div>
            <i className="fa-solid fa-book-open absolute -bottom-4 -right-4 text-8xl opacity-10 group-hover:scale-110 transition-transform"></i>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div 
              onClick={() => onViewWordList('learned')}
              className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm cursor-pointer hover:border-emerald-200 transition-colors group"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <i className="fa-solid fa-check-double"></i>
              </div>
              <h5 className="font-bold text-slate-800">已学习</h5>
              <p className="text-2xl font-black text-emerald-600">{learnedCount}</p>
            </div>
            <div 
              onClick={() => onViewWordList('favorite')}
              className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm cursor-pointer hover:border-amber-200 transition-colors group"
            >
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <i className="fa-solid fa-star"></i>
              </div>
              <h5 className="font-bold text-slate-800">我的收藏</h5>
              <p className="text-2xl font-black text-amber-600">{favoriteCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Categories */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-slate-800">开始学习</h3>
          <button onClick={() => onNavigate(AppTab.CATEGORIES)} className="text-indigo-600 font-semibold text-sm">分类管理</button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {categories.map(cat => (
            <div 
              key={cat.id} 
              onClick={() => onSelectCategory(cat)}
              className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 cursor-pointer hover:border-indigo-300 transition-colors active:scale-95 group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl ${cat.color} shadow-lg shadow-amber-200/50`}>
                <i className={`fa-solid ${cat.icon}`}></i>
              </div>
              <div className="flex-grow">
                <span className="text-lg font-bold text-slate-800 block">{cat.name}</span>
                <span className="text-sm text-slate-400">点击开始 10 词速记模式</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                <i className="fa-solid fa-play"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
