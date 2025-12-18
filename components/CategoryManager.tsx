
import React, { useState } from 'react';
import { Category } from '../types';

interface CategoryManagerProps {
  categories: Category[];
  onAdd: (name: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string) => void;
  onBack: () => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ categories, onAdd, onDelete, onEdit, onBack }) => {
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onAdd(newName.trim());
      setNewName('');
    }
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditValue(cat.name);
  };

  const saveEdit = (id: string) => {
    onEdit(id, editValue);
    setEditingId(null);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h2 className="text-2xl font-bold text-slate-800">单词分类管理</h2>
      </header>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="输入新分类名称（如：托福词汇）"
          className="flex-grow p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all"
        />
        <button type="submit" className="bg-indigo-600 text-white px-6 rounded-xl font-bold shadow-md hover:bg-indigo-700 active:scale-95 transition-all">添加</button>
      </form>

      <div className="space-y-3">
        {categories.map(cat => (
          <div key={cat.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group">
            {editingId === cat.id ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => saveEdit(cat.id)}
                autoFocus
                className="flex-grow p-1 border-b-2 border-indigo-500 focus:outline-none font-semibold text-slate-700"
              />
            ) : (
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${cat.color} shadow-sm`}>
                  <i className={`fa-solid ${cat.icon}`}></i>
                </div>
                <span className="font-semibold text-slate-700">{cat.name}</span>
              </div>
            )}
            
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => startEdit(cat)} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                <i className="fa-solid fa-pen"></i>
              </button>
              <button onClick={() => onDelete(cat.id)} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;
