import React from 'react';
import { Smile, Trash2, Clock, Check } from 'lucide-react';
import { VideoProject, MemePosition } from '../types';
import { SEED_MEMES } from '../data/seedData';

interface MemeStudioSectionProps {
  project: VideoProject;
  onUpdateMeme: (
    memeId: string,
    title: string,
    topText: string,
    bottomText: string,
    imageUri: string,
    position: MemePosition,
    startMs: number,
    endMs: number
  ) => void;
  onRemoveMeme: () => void;
}

export const MemeStudioSection: React.FC<MemeStudioSectionProps> = ({
  project,
  onUpdateMeme,
  onRemoveMeme
}) => {
  const activeMeme = SEED_MEMES.find(m => m.id === project.activeMemeId);

  const POSITIONS: Array<{ id: MemePosition; label: string }> = [
    { id: 'BOTTOM_RIGHT', label: 'Bottom Right' },
    { id: 'TOP', label: 'Top Center' },
    { id: 'CENTER', label: 'Full Center' },
    { id: 'BOTTOM', label: 'Bottom Bar' }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Smile className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-white text-base">Telugu Meme Studio & Reaction Stickers</h3>
        </div>
        {project.activeMemeId && (
          <button
            onClick={onRemoveMeme}
            className="flex items-center gap-1.5 px-3 py-1 bg-red-950/60 hover:bg-red-900/80 border border-red-700/60 text-red-300 rounded-lg text-xs font-semibold transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Remove Meme
          </button>
        )}
      </div>

      {/* Select Meme Template */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">Choose Meme Template</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {SEED_MEMES.map(meme => {
            const isSelected = project.activeMemeId === meme.id;
            return (
              <button
                key={meme.id}
                onClick={() =>
                  onUpdateMeme(
                    meme.id,
                    meme.name,
                    meme.defaultTopText,
                    meme.defaultBottomText,
                    meme.imageUrl,
                    project.memePosition || 'BOTTOM_RIGHT',
                    project.memeStartMs || project.trimStartMs,
                    project.memeEndMs || Math.min(project.originalDurationMs, project.trimStartMs + 10000)
                  )
                }
                className={`relative group rounded-xl overflow-hidden border text-left transition-all ${
                  isSelected
                    ? 'border-amber-400 ring-2 ring-amber-400/30'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="aspect-square bg-slate-950 relative overflow-hidden">
                  <img
                    src={meme.imageUrl}
                    alt={meme.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center text-slate-950 shadow-md">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
                <div className="p-2 bg-slate-950">
                  <p className="text-xs font-bold text-white truncate">{meme.name}</p>
                  <p className="text-[10px] text-amber-400/90 font-medium truncate">{meme.category}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Customize Active Meme */}
      {project.activeMemeId && (
        <div className="space-y-4 pt-3 border-t border-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300">Top Punchline</label>
              <input
                type="text"
                value={project.memeTopText || ''}
                onChange={e =>
                  onUpdateMeme(
                    project.activeMemeId!,
                    project.memeTitle || 'Meme',
                    e.target.value,
                    project.memeBottomText || '',
                    project.memeImageUri || '',
                    project.memePosition,
                    project.memeStartMs,
                    project.memeEndMs
                  )
                }
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300">Bottom Punchline</label>
              <input
                type="text"
                value={project.memeBottomText || ''}
                onChange={e =>
                  onUpdateMeme(
                    project.activeMemeId!,
                    project.memeTitle || 'Meme',
                    project.memeTopText || '',
                    e.target.value,
                    project.memeImageUri || '',
                    project.memePosition,
                    project.memeStartMs,
                    project.memeEndMs
                  )
                }
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Position Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-300">Sticker Screen Position</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1.5">
              {POSITIONS.map(pos => (
                <button
                  key={pos.id}
                  onClick={() =>
                    onUpdateMeme(
                      project.activeMemeId!,
                      project.memeTitle || 'Meme',
                      project.memeTopText || '',
                      project.memeBottomText || '',
                      project.memeImageUri || '',
                      pos.id,
                      project.memeStartMs,
                      project.memeEndMs
                    )
                  }
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors ${
                    project.memePosition === pos.id
                      ? 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {pos.label}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline Range for Meme */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Show Meme on Timeline
              </span>
              <span className="font-mono text-amber-400 font-bold">
                {(project.memeStartMs / 1000).toFixed(1)}s - {(project.memeEndMs / 1000).toFixed(1)}s
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 text-[11px]">Start Offset</span>
                <input
                  type="range"
                  min={0}
                  max={Math.max(0, project.originalDurationMs - 2000)}
                  step={500}
                  value={project.memeStartMs}
                  onChange={e =>
                    onUpdateMeme(
                      project.activeMemeId!,
                      project.memeTitle || 'Meme',
                      project.memeTopText || '',
                      project.memeBottomText || '',
                      project.memeImageUri || '',
                      project.memePosition,
                      Number(e.target.value),
                      Math.max(Number(e.target.value) + 2000, project.memeEndMs)
                    )
                  }
                  className="w-full accent-amber-400 cursor-pointer mt-1"
                />
              </div>
              <div>
                <span className="text-slate-400 text-[11px]">End Offset</span>
                <input
                  type="range"
                  min={Math.min(project.originalDurationMs, project.memeStartMs + 1000)}
                  max={project.originalDurationMs}
                  step={500}
                  value={project.memeEndMs}
                  onChange={e =>
                    onUpdateMeme(
                      project.activeMemeId!,
                      project.memeTitle || 'Meme',
                      project.memeTopText || '',
                      project.memeBottomText || '',
                      project.memeImageUri || '',
                      project.memePosition,
                      project.memeStartMs,
                      Number(e.target.value)
                    )
                  }
                  className="w-full accent-amber-400 cursor-pointer mt-1"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
