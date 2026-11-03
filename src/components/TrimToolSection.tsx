import React from 'react';
import { Scissors, BookmarkCheck, Clock } from 'lucide-react';
import { VideoProject } from '../types';

interface TrimToolSectionProps {
  project: VideoProject;
  currentPlayheadMs: number;
  onUpdateTrim: (startMs: number, endMs: number) => void;
  onSetTrimStartToPlayhead: () => void;
  onSetTrimEndToPlayhead: () => void;
}

export const TrimToolSection: React.FC<TrimToolSectionProps> = ({
  project,
  currentPlayheadMs,
  onUpdateTrim,
  onSetTrimStartToPlayhead,
  onSetTrimEndToPlayhead
}) => {
  const formatSec = (ms: number) => (ms / 1000).toFixed(1) + 's';
  const durationSec = ((project.trimEndMs - project.trimStartMs) / 1000).toFixed(1) + 's';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Scissors className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-white text-base">Video Timeline & Precision Trim</h3>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-950/60 border border-indigo-700/50 rounded-lg text-xs font-bold text-cyan-300">
          <Clock className="w-3.5 h-3.5" />
          Trimmed: {durationSec}
        </div>
      </div>

      {/* Start / End Range Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-400">Trim In (Start)</span>
            <span className="font-mono text-cyan-400 font-bold">{formatSec(project.trimStartMs)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={Math.max(0, project.trimEndMs - 1000)}
            step={200}
            value={project.trimStartMs}
            onChange={e => onUpdateTrim(Number(e.target.value), project.trimEndMs)}
            className="w-full accent-indigo-500 cursor-pointer"
          />
          <button
            onClick={onSetTrimStartToPlayhead}
            className="w-full mt-2 py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <BookmarkCheck className="w-3.5 h-3.5 text-indigo-400" />
            Set Start to Playhead ({formatSec(currentPlayheadMs)})
          </button>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-400">Trim Out (End)</span>
            <span className="font-mono text-cyan-400 font-bold">{formatSec(project.trimEndMs)}</span>
          </div>
          <input
            type="range"
            min={Math.min(project.originalDurationMs, project.trimStartMs + 1000)}
            max={project.originalDurationMs}
            step={200}
            value={project.trimEndMs}
            onChange={e => onUpdateTrim(project.trimStartMs, Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
          <button
            onClick={onSetTrimEndToPlayhead}
            className="w-full mt-2 py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <BookmarkCheck className="w-3.5 h-3.5 text-indigo-400" />
            Set End to Playhead ({formatSec(currentPlayheadMs)})
          </button>
        </div>
      </div>

      {/* Preset Snapping */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-400">Platform Duration Presets</label>
        <div className="flex flex-wrap gap-2">
          {[
            { label: '15s Reels / Shorts', sec: 15 },
            { label: '30s TikTok', sec: 30 },
            { label: '60s Long Reel', sec: 60 },
            { label: 'Reset Full Video', sec: project.originalDurationMs / 1000 }
          ].map(preset => (
            <button
              key={preset.label}
              onClick={() => {
                const targetEnd = Math.min(
                  project.originalDurationMs,
                  preset.label === 'Reset Full Video'
                    ? project.originalDurationMs
                    : project.trimStartMs + preset.sec * 1000
                );
                onUpdateTrim(preset.label === 'Reset Full Video' ? 0 : project.trimStartMs, targetEnd);
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 rounded-lg border border-slate-700 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
