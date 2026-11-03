import React from 'react';
import { Volume2, VolumeX, Mic, Wand2 } from 'lucide-react';
import { VideoProject } from '../types';

interface AudioLevelsToolSectionProps {
  project: VideoProject;
  onUpdateAudioLevels: (
    originalVolume: number,
    isMuted: boolean,
    voiceoverVolume: number,
    voiceClarity: boolean
  ) => void;
}

export const AudioLevelsToolSection: React.FC<AudioLevelsToolSectionProps> = ({
  project,
  onUpdateAudioLevels
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-white text-base">Audio Levels & Speech Clarity</h3>
        </div>
        <span className="text-xs text-slate-400">Multi-track mix</span>
      </div>

      {/* Primary Video Audio Track */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-white">Original Video Audio Track</span>
          </div>
          <button
            onClick={() =>
              onUpdateAudioLevels(
                project.originalAudioVolume,
                !project.isOriginalAudioMuted,
                project.voiceoverVolume,
                project.voiceClarityEnhanced
              )
            }
            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
              project.isOriginalAudioMuted
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {project.isOriginalAudioMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5" /> Muted
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5" /> Mute Track
              </>
            )}
          </button>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Track Volume</span>
            <span className="font-mono text-cyan-400 font-bold">
              {project.isOriginalAudioMuted ? '0%' : `${Math.round(project.originalAudioVolume * 100)}%`}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={2}
            step={0.05}
            disabled={project.isOriginalAudioMuted}
            value={project.originalAudioVolume}
            onChange={e =>
              onUpdateAudioLevels(
                Number(e.target.value),
                project.isOriginalAudioMuted,
                project.voiceoverVolume,
                project.voiceClarityEnhanced
              )
            }
            className="w-full accent-indigo-500 cursor-pointer disabled:opacity-40"
          />
        </div>
      </div>

      {/* Voiceover / Audio Layer */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold text-white">Voiceover & Background Music Track</span>
          </div>
          <span className="font-mono text-purple-400 text-xs font-bold">
            {Math.round(project.voiceoverVolume * 100)}%
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={2}
          step={0.05}
          value={project.voiceoverVolume}
          onChange={e =>
            onUpdateAudioLevels(
              project.originalAudioVolume,
              project.isOriginalAudioMuted,
              Number(e.target.value),
              project.voiceClarityEnhanced
            )
          }
          className="w-full accent-purple-500 cursor-pointer"
        />
      </div>

      {/* AI Voice Clarity Enhancement */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-950 p-4 rounded-xl border border-indigo-700/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
            <Wand2 className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              AI Speech Clarity & Noise Suppression
              <span className="px-1.5 py-0.2 rounded bg-indigo-950 text-[10px] text-cyan-400 border border-indigo-700">
                AI Studio
              </span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Isolates Telugu vocal frequencies, removes room echoes and background hum.
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            onUpdateAudioLevels(
              project.originalAudioVolume,
              project.isOriginalAudioMuted,
              project.voiceoverVolume,
              !project.voiceClarityEnhanced
            )
          }
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            project.voiceClarityEnhanced
              ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/30'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          {project.voiceClarityEnhanced ? 'Enhanced ✓' : 'Enhance'}
        </button>
      </div>
    </div>
  );
};
