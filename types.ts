
export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface ReviewData {
  lastReview: number;
  interval: number; // in days
  easeFactor: number;
  repetitions: number;
  nextReview: number;
}

export interface Word {
  id: string;
  word: string;
  phonetic_us: string;
  phonetic_uk: string;
  definition: string;
  example_en: string;
  example_zh: string;
  categoryId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isFavorite?: boolean;
  isLearned?: boolean;
  srs?: ReviewData;
}

export interface WordPack {
  id: string;
  title: string;
  description: string;
  words: Word[];
  createdAt: number;
  categoryId?: string;
}

export enum AppTab {
  DASHBOARD = 'dashboard',
  STUDY = 'study',
  QUIZ = 'quiz',
  CATEGORIES = 'categories',
  SETTINGS = 'settings',
  WORD_LIST = 'word_list'
}

export interface ReminderSettings {
  enabled: boolean;
  frequency: 'daily' | 'weekly';
  preferredTime: string; // HH:mm
}

export interface UserStats {
  wordsLearned: number;
  streak: number;
  totalTime: number;
}
