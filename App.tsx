
import React, { useState, useEffect, useMemo } from 'react';
import { AppTab, WordPack, UserStats, Word, Category } from './types';
import Dashboard from './components/Dashboard';
import StudySession from './components/StudySession';
import CategoryManager from './components/CategoryManager';
import WordListViewer from './components/WordListViewer';
import { TOEIC_VOCABULARY } from './toeicWords';

const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-toeic', name: '托业商务', icon: 'fa-briefcase', color: 'bg-amber-500' },
  { id: 'cat-daily', name: '职场日常', icon: 'fa-mug-hot', color: 'bg-indigo-500' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [activePack, setActivePack] = useState<WordPack | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  
  const [listType, setListType] = useState<'learned' | 'favorite' | 'toeic' | null>(null);
  
  // 状态管理
  const [learnedWords, setLearnedWords] = useState<Word[]>([]);
  const [favoriteWords, setFavoriteWords] = useState<Word[]>([]);
  
  const [showIosInstall, setShowIosInstall] = useState(false);
  const [stats, setStats] = useState<UserStats>({ wordsLearned: 0, streak: 7, totalTime: 7200 });

  useEffect(() => {
    const savedLearned = localStorage.getItem('lingogem_learned_words');
    if (savedLearned) {
      const parsed = JSON.parse(savedLearned);
      setLearnedWords(parsed);
      setStats(s => ({ ...s, wordsLearned: parsed.length }));
    }

    const savedFav = localStorage.getItem('lingogem_favorite_words');
    if (savedFav) {
      setFavoriteWords(JSON.parse(savedFav));
    }

    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    if (isIos && !isStandalone) {
      const lastPrompt = localStorage.getItem('lingogem_install_prompt');
      if (!lastPrompt || Date.now() - parseInt(lastPrompt) > 24 * 60 * 60 * 1000) setShowIosInstall(true);
    }
  }, []);

  const handleStartStudy = (category: Category) => {
    setIsGenerating(true);
    setLoadingMsg(`正在为您筛选核心词汇...`);
    
    setTimeout(() => {
      // 排除已学习的
      const learnedSet = new Set(learnedWords.map(w => w.word.toLowerCase()));
      const pool = TOEIC_VOCABULARY.filter(w => !learnedSet.has(w.word.toLowerCase()));
      
      const shuffled = [...(pool.length > 0 ? pool : TOEIC_VOCABULARY)].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 10).map(w => ({
        ...w,
        id: Math.random().toString(36).substr(2, 9),
        difficulty: 'medium' as const,
        categoryId: category.id,
        srs: {
          lastReview: Date.now(),
          interval: 1,
          easeFactor: 2.5,
          repetitions: 0,
          nextReview: Date.now() + 86400000
        }
      }));

      const sessionPack: WordPack = {
        id: `session-${Date.now()}`,
        title: category.name,
        description: '随机抽取的 10 个单词学习计划',
        words: selected as Word[],
        createdAt: Date.now(),
      };
      
      setActivePack(sessionPack);
      setIsGenerating(false);
    }, 800);
  };

  const handleWordAction = (id: string, action: 'learned' | 'favorite') => {
    if (!activePack) return;
    const word = activePack.words.find(w => w.id === id);
    if (!word) return;

    if (action === 'learned') {
      setLearnedWords(prev => {
        if (prev.find(w => w.word.toLowerCase() === word.word.toLowerCase())) return prev;
        const newList = [...prev, word];
        localStorage.setItem('lingogem_learned_words', JSON.stringify(newList));
        return newList;
      });
      setStats(s => ({ ...s, wordsLearned: s.wordsLearned + 1 }));
    } else if (action === 'favorite') {
      setFavoriteWords(prev => {
        if (prev.find(w => w.word.toLowerCase() === word.word.toLowerCase())) return prev;
        const newList = [...prev, word];
        localStorage.setItem('lingogem_favorite_words', JSON.stringify(newList));
        return newList;
      });
    }
  };

  const renderContent = () => {
    if (activePack) {
      return (
        <StudySession 
          pack={activePack} 
          onFinish={() => setActivePack(null)}
          onWordAction={handleWordAction}
        />
      );
    }

    if (activeTab === AppTab.WORD_LIST && listType) {
      let title = "";
      let wordsToShow: any[] = [];
      
      if (listType === 'learned') {
        title = "已学习单词";
        wordsToShow = learnedWords;
      } else if (listType === 'favorite') {
        title = "我的收藏";
        wordsToShow = favoriteWords;
      } else {
        title = "托业核心词书";
        wordsToShow = TOEIC_VOCABULARY;
      }

      return (
        <WordListViewer 
          title={title} 
          words={wordsToShow} 
          onBack={() => {
            setActiveTab(AppTab.DASHBOARD);
            setListType(null);
          }} 
        />
      );
    }

    switch (activeTab) {
      case AppTab.DASHBOARD:
        return (
          <Dashboard 
            stats={stats} 
            categories={categories}
            reviewCount={0} // 简化暂不展示复习
            learnedCount={learnedWords.length}
            favoriteCount={favoriteWords.length}
            totalCount={TOEIC_VOCABULARY.length}
            onSelectCategory={handleStartStudy}
            onNavigate={setActiveTab} 
            onViewWordList={(type) => {
              setListType(type);
              setActiveTab(AppTab.WORD_LIST);
            }}
            onStartReview={() => {}}
          />
        );
      case AppTab.CATEGORIES:
        return (
          <CategoryManager 
            categories={categories}
            onBack={() => setActiveTab(AppTab.DASHBOARD)}
            onAdd={(name) => setCategories([...categories, { id: Date.now().toString(), name, icon: 'fa-folder', color: 'bg-indigo-400' }])}
            onDelete={(id) => setCategories(categories.filter(c => c.id !== id))}
            onEdit={(id, name) => setCategories(categories.map(c => c.id === id ? { ...c, name } : c))}
          />
        );
      default: return null;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
      <div className="sticky top-0 z-20 h-4 bg-slate-50/80 backdrop-blur-md"></div>
      
      {isGenerating && (
        <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-indigo-100 rounded-full animate-spin border-t-indigo-600"></div>
            <div className="absolute inset-0 flex items-center justify-center text-indigo-600 text-2xl">
              <i className="fa-solid fa-book-open animate-bounce"></i>
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">正在准备词卡...</h3>
          <p className="text-slate-500 leading-relaxed">{loadingMsg}</p>
        </div>
      )}

      <main className="flex-grow px-6 pb-10">{renderContent()}</main>
    </div>
  );
};

export default App;
