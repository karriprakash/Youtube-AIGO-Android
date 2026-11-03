import React, { useState } from 'react';
import { Film, Sparkles, Smartphone, Monitor } from 'lucide-react';
import { AspectRatio } from '../types';

interface CreateProjectDialogProps {
  onDismiss: () => void;
  onCreate: (
    title: string,
    durationSec: number,
    language: 'te' | 'en',
    aspectRatio: AspectRatio,
    notes: string
  ) => void;
}

export const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({
  onDismiss,
  onCreate
}) => {
  const [title, setTitle] = useState('');
  const [durationSec, setDurationSec] = useState(20);
  const [language, setLanguage] = useState<'te' | 'en'>('te');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(
      title.trim() || 'Untitled Video Reel',
      durationSec,
      language,
      aspectRatio,
      notes.trim()
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-base">Create New Video Project</h3>
          </div>
          <button
            onClick={onDismiss}
            className="text-slate-400 hover:text-white text-xs font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="text-slate-300 font-semibold">Project Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Hyderabad Street Food Special 🍲"
              className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold">Duration (Seconds)</label>
              <input
                type="number"
                min={5}
                max={120}
                value={durationSec}
                onChange={e => setDurationSec(Number(e.target.value))}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold">Language Target</label>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value as any)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="te">Telugu (తెలుగు)</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold">Format & Aspect Ratio</label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button
                type="button"
                onClick={() => setAspectRatio('9:16')}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-colors ${
                  aspectRatio === '9:16'
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <Smartphone className="w-4 h-4 shrink-0" />
                <div>
                  <p className="font-bold text-[11px]">9:16 Vertical Reel</p>
                  <p className="text-[9px] opacity-80">Reels / Shorts / TikTok</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setAspectRatio('16:9')}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-colors ${
                  aspectRatio === '16:9'
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <Monitor className="w-4 h-4 shrink-0" />
                <div>
                  <p className="font-bold text-[11px]">16:9 Widescreen</p>
                  <p className="text-[9px] opacity-80">YouTube Long-form</p>
                </div>
              </button>
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold">
              Initial Notes / Talking Points (Telugu or English)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Enter topics, dialogue, or script..."
              className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onDismiss}
              className="px-3 py-2 text-slate-400 hover:text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
