import React from 'react';
import { Smartphone, Monitor, Square, Tv } from 'lucide-react';
import { VideoProject, AspectRatio } from '../types';

interface FormatToolSectionProps {
  project: VideoProject;
  onUpdateAspectRatio: (ratio: AspectRatio) => void;
}

export const FormatToolSection: React.FC<FormatToolSectionProps> = ({
  project,
  onUpdateAspectRatio
}) => {
  const FORMATS: Array<{
    id: AspectRatio;
    name: string;
    subtitle: string;
    icon: React.ReactNode;
    platforms: string[];
    resolution: string;
  }> = [
    {
      id: '9:16',
      name: 'Vertical Reel / Story',
      subtitle: '9:16 Full Screen Mobile',
      icon: <Smartphone className="w-6 h-6 text-indigo-400" />,
      platforms: ['Instagram Reels', 'YouTube Shorts', 'TikTok'],
      resolution: '1080 x 1920'
    },
    {
      id: '16:9',
      name: 'Horizontal Widescreen',
      subtitle: '16:9 Standard Video',
      icon: <Monitor className="w-6 h-6 text-cyan-400" />,
      platforms: ['YouTube Longform', 'Desktop', 'TV'],
      resolution: '1920 x 1080'
    },
    {
      id: '1:1',
      name: 'Square Feed',
      subtitle: '1:1 Classic Grid',
      icon: <Square className="w-6 h-6 text-amber-400" />,
      platforms: ['Instagram Feed', 'Facebook', 'LinkedIn'],
      resolution: '1080 x 1080'
    },
    {
      id: '4:5',
      name: 'Social Portrait',
      subtitle: '4:5 High Retention Feed',
      icon: <Tv className="w-6 h-6 text-pink-400" />,
      platforms: ['Instagram Post', 'Facebook Mobile'],
      resolution: '1080 x 1350'
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-white text-base">Aspect Ratio & Canvas Dimensions</h3>
        </div>
        <span className="text-xs text-slate-400">One-tap multi-platform reframing</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FORMATS.map(fmt => {
          const isSelected = project.aspectRatio === fmt.id;
          return (
            <button
              key={fmt.id}
              onClick={() => onUpdateAspectRatio(fmt.id)}
              className={`p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all ${
                isSelected
                  ? 'border-indigo-500 bg-slate-950 ring-2 ring-indigo-500/30'
                  : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                {fmt.icon}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">{fmt.name}</h4>
                  <span className="font-mono text-[10px] text-cyan-400 px-1.5 py-0.5 bg-slate-900 rounded">
                    {fmt.resolution}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{fmt.subtitle}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {fmt.platforms.map(p => (
                    <span
                      key={p}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
