import React from 'react';
import { Type, Palette, AlignVerticalJustifyCenter, Sparkles } from 'lucide-react';
import { VideoProject } from '../types';

interface TextOverlayToolSectionProps {
  project: VideoProject;
  onUpdateTextOverlay: (
    text: string,
    colorHex: string,
    bgStyle: 'SOLID' | 'SEMI_TRANSPARENT' | 'OUTLINE' | 'NEON_GLOW',
    position: 'TOP' | 'CENTER' | 'BOTTOM',
    size: number
  ) => void;
}

export const TextOverlayToolSection: React.FC<TextOverlayToolSectionProps> = ({
  project,
  onUpdateTextOverlay
}) => {
  const COLOR_PALETTE = [
    { label: 'Cyan Glow', hex: '#38bdf8' },
    { label: 'Sunset Amber', hex: '#f59e0b' },
    { label: 'Pure White', hex: '#ffffff' },
    { label: 'Hot Pink', hex: '#ec4899' },
    { label: 'Neon Emerald', hex: '#10b981' },
    { label: 'Gold Yellow', hex: '#facc15' }
  ];

  const BG_STYLES: Array<{ id: 'SOLID' | 'SEMI_TRANSPARENT' | 'OUTLINE' | 'NEON_GLOW'; label: string }> = [
    { id: 'NEON_GLOW', label: 'Neon Glow' },
    { id: 'SOLID', label: 'Dark Solid' },
    { id: 'SEMI_TRANSPARENT', label: 'Frosted Glass' },
    { id: 'OUTLINE', label: 'Outline Only' }
  ];

  const POSITIONS: Array<{ id: 'TOP' | 'CENTER' | 'BOTTOM'; label: string }> = [
    { id: 'TOP', label: 'Top Banner' },
    { id: 'CENTER', label: 'Center Focus' },
    { id: 'BOTTOM', label: 'Bottom Subtitle' }
  ];

  const TELUGU_QUICK_PRESETS = [
    '🔥 తప్పక చూడండి!',
    '🚀 కొత్త అప్‌డేట్ వచ్చేసింది!',
    '💡 ఈ సీక్రెట్ మీకు తెలుసా?',
    '⚡ సూపర్ టెక్నాలజీ ట్రిక్',
    '❤️ లైక్ & షేర్ చేయండి!'
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Type className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-white text-base">On-Screen Text & Banners</h3>
        </div>
        <span className="text-xs text-slate-400">Live preview on video</span>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">Overlay Text (English or Telugu)</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={project.overlayText}
            onChange={e =>
              onUpdateTextOverlay(
                e.target.value,
                project.overlayTextColorHex,
                project.overlayTextBgStyle,
                project.overlayTextPosition,
                project.overlayTextSize
              )
            }
            placeholder="e.g. 🔥 Watch Till The End!"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          {project.overlayText && (
            <button
              onClick={() =>
                onUpdateTextOverlay(
                  '',
                  project.overlayTextColorHex,
                  project.overlayTextBgStyle,
                  project.overlayTextPosition,
                  project.overlayTextSize
                )
              }
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-400 hover:text-white rounded-xl transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Telugu Quick Hooks */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyan-400" /> Quick Telugu Hooks
        </label>
        <div className="flex flex-wrap gap-1.5">
          {TELUGU_QUICK_PRESETS.map(hook => (
            <button
              key={hook}
              onClick={() =>
                onUpdateTextOverlay(
                  hook,
                  project.overlayTextColorHex,
                  project.overlayTextBgStyle,
                  project.overlayTextPosition,
                  project.overlayTextSize
                )
              }
              className="px-2.5 py-1 bg-slate-950 hover:bg-indigo-950/70 border border-slate-800 hover:border-indigo-600/60 rounded-lg text-xs font-medium text-slate-300 transition-colors"
            >
              {hook}
            </button>
          ))}
        </div>
      </div>

      {/* Color Palette */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-indigo-400" /> Color Accent
        </label>
        <div className="flex flex-wrap gap-2">
          {COLOR_PALETTE.map(c => (
            <button
              key={c.hex}
              onClick={() =>
                onUpdateTextOverlay(
                  project.overlayText,
                  c.hex,
                  project.overlayTextBgStyle,
                  project.overlayTextPosition,
                  project.overlayTextSize
                )
              }
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                project.overlayTextColorHex === c.hex
                  ? 'border-indigo-400 bg-slate-800 shadow-sm'
                  : 'border-slate-800 bg-slate-950 hover:bg-slate-800'
              }`}
            >
              <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: c.hex }} />
              <span className="text-slate-300">{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Background Style & Position */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Banner Background</label>
          <div className="grid grid-cols-2 gap-1.5">
            {BG_STYLES.map(style => (
              <button
                key={style.id}
                onClick={() =>
                  onUpdateTextOverlay(
                    project.overlayText,
                    project.overlayTextColorHex,
                    style.id,
                    project.overlayTextPosition,
                    project.overlayTextSize
                  )
                }
                className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-colors ${
                  project.overlayTextBgStyle === style.id
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
            <AlignVerticalJustifyCenter className="w-3.5 h-3.5 text-indigo-400" /> Position
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {POSITIONS.map(pos => (
              <button
                key={pos.id}
                onClick={() =>
                  onUpdateTextOverlay(
                    project.overlayText,
                    project.overlayTextColorHex,
                    project.overlayTextBgStyle,
                    pos.id,
                    project.overlayTextSize
                  )
                }
                className={`py-2 px-1 text-xs font-semibold rounded-lg border text-center transition-colors ${
                  project.overlayTextPosition === pos.id
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {pos.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Font Size Slider */}
      <div className="space-y-1.5 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
        <div className="flex justify-between text-xs">
          <span className="font-semibold text-slate-300">Font Size</span>
          <span className="font-mono text-cyan-400 font-bold">{project.overlayTextSize}px</span>
        </div>
        <input
          type="range"
          min={14}
          max={36}
          step={2}
          value={project.overlayTextSize}
          onChange={e =>
            onUpdateTextOverlay(
              project.overlayText,
              project.overlayTextColorHex,
              project.overlayTextBgStyle,
              project.overlayTextPosition,
              Number(e.target.value)
            )
          }
          className="w-full accent-indigo-500 cursor-pointer"
        />
      </div>
    </div>
  );
};
