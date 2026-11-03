import React from 'react';
import { Sliders, Sparkles } from 'lucide-react';
import { VideoProject, ColorFilterType } from '../types';

interface FilterToolSectionProps {
  project: VideoProject;
  onUpdateColorFilter: (filter: ColorFilterType, intensity: number) => void;
}

export const FilterToolSection: React.FC<FilterToolSectionProps> = ({
  project,
  onUpdateColorFilter
}) => {
  const FILTERS: Array<{
    id: ColorFilterType;
    name: string;
    description: string;
    gradient: string;
  }> = [
    {
      id: 'NONE',
      name: 'Original Natural',
      description: 'Clean raw camera colors without correction',
      gradient: 'from-slate-700 to-slate-800'
    },
    {
      id: 'VIBRANT',
      name: 'Vivid Punch',
      description: 'High saturation boost for punchy social reels',
      gradient: 'from-pink-500 via-rose-500 to-yellow-500'
    },
    {
      id: 'CYBERPUNK',
      name: 'Cyberpunk Neon',
      description: 'Electric cyan & magenta hue shift for viral tech clips',
      gradient: 'from-cyan-400 via-indigo-500 to-fuchsia-500'
    },
    {
      id: 'CINEMATIC',
      name: 'Cinematic Teal & Orange',
      description: 'Film grade blockbuster look with rich contrast',
      gradient: 'from-teal-600 via-slate-800 to-amber-600'
    },
    {
      id: 'BW',
      name: 'Monochrome Noir',
      description: 'Dramatic black and white high-contrast film',
      gradient: 'from-slate-900 via-slate-500 to-slate-100'
    },
    {
      id: 'WARM',
      name: 'Golden Hour Sunset',
      description: 'Warm nostalgic golden tones for vlogs and travel',
      gradient: 'from-amber-500 via-orange-600 to-yellow-400'
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-white text-base">Color Grading & Filters</h3>
        </div>
        <span className="text-xs text-slate-400">GPU Accelerated</span>
      </div>

      {/* Filter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {FILTERS.map(f => {
          const isSelected = project.colorFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => onUpdateColorFilter(f.id, project.filterIntensity || 0.8)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'border-indigo-500 bg-slate-950 ring-2 ring-indigo-500/30'
                  : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div
                className={`w-full h-10 rounded-lg bg-gradient-to-r ${f.gradient} mb-2 shadow-inner`}
              />
              <p className="text-xs font-bold text-white">{f.name}</p>
              <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">{f.description}</p>
            </button>
          );
        })}
      </div>

      {/* Filter Intensity Slider */}
      {project.colorFilter !== 'NONE' && (
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-slate-300">Filter Grade Intensity</span>
            <span className="font-mono text-cyan-400 font-bold">
              {Math.round(project.filterIntensity * 100)}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={project.filterIntensity}
            onChange={e => onUpdateColorFilter(project.colorFilter, Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};
