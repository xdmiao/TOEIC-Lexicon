
import React from 'react';
import { ReminderSettings } from '../types';

interface SettingsProps {
  settings: ReminderSettings;
  onUpdate: (settings: ReminderSettings) => void;
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, onUpdate, onBack }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-300">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h2 className="text-2xl font-bold text-slate-800">学习设置</h2>
      </header>

      <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-800">智能复习提醒</h3>
            <p className="text-sm text-slate-500">基于艾宾浩斯遗忘曲线生成计划</p>
          </div>
          <button 
            onClick={() => onUpdate({ ...settings, enabled: !settings.enabled })}
            className={`w-12 h-6 rounded-full transition-colors relative ${settings.enabled ? 'bg-indigo-600' : 'bg-slate-300'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.enabled ? 'translate-x-7' : 'translate-x-1'}`}></div>
          </button>
        </div>

        {settings.enabled && (
          <div className="space-y-4 pt-4 border-t border-slate-50 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">提醒频率</label>
              <div className="flex gap-2">
                {[
                  { value: 'daily', label: '每天' },
                  { value: 'weekly', label: '每周' }
                ].map(f => (
                  <button
                    key={f.value}
                    onClick={() => onUpdate({ ...settings, frequency: f.value as any })}
                    className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${settings.frequency === f.value ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">首选提醒时间</label>
              <input
                type="time"
                value={settings.preferredTime}
                onChange={(e) => onUpdate({ ...settings, preferredTime: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-700"
              />
            </div>
          </div>
        )}
      </section>

      <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 shadow-sm">
        <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
          <i className="fa-solid fa-chart-line"></i> 科学记忆原理
        </h4>
        <p className="text-sm text-amber-700 leading-relaxed">
          艾宾浩斯遗忘曲线表明，人类的记忆留存率会随时间推移迅速下降。通过在特定的时间点（1小时、1天、2天、4天等）进行针对性复习，我们可以用最小的努力将知识转化为长期记忆。
        </p>
      </div>
    </div>
  );
};

export default Settings;
