import React, { useEffect, useRef, useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  FastForward,
  Maximize2
} from 'lucide-react';
import { VideoProject, AspectRatio, ColorFilterType } from '../types';

interface VideoPreviewCanvasProps {
  project: VideoProject;
  currentPlayheadMs: number;
  isPlaying: boolean;
  playbackSpeed: number;
  onTogglePlayback: () => void;
  onSeek: (ms: number) => void;
  onSpeedChange: (speed: number) => void;
}

export const VideoPreviewCanvas: React.FC<VideoPreviewCanvasProps> = ({
  project,
  currentPlayheadMs,
  isPlaying,
  playbackSpeed,
  onTogglePlayback,
  onSeek,
  onSpeedChange
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Sync HTML5 video element with playhead
  useEffect(() => {
    if (videoRef.current) {
      const targetSec = currentPlayheadMs / 1000;
      if (Math.abs(videoRef.current.currentTime - targetSec) > 0.3) {
        videoRef.current.currentTime = targetSec;
      }
      videoRef.current.playbackRate = playbackSpeed;
      if (isPlaying && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      } else if (!isPlaying && !videoRef.current.paused) {
        videoRef.current.pause();
      }
    }
  }, [currentPlayheadMs, isPlaying, playbackSpeed]);

  // Handle CSS filter string
  const getFilterStyle = (filter: ColorFilterType, intensity: number) => {
    const factor = intensity;
    switch (filter) {
      case 'VIBRANT':
        return `saturate(${1 + 0.9 * factor}) contrast(${1 + 0.25 * factor}) brightness(${1 + 0.08 * factor})`;
      case 'CYBERPUNK':
        return `hue-rotate(${180 * factor}deg) saturate(${1 + 1.1 * factor}) contrast(${1 + 0.35 * factor})`;
      case 'CINEMATIC':
        return `contrast(${1 + 0.35 * factor}) sepia(${0.35 * factor}) brightness(${1 - 0.08 * factor})`;
      case 'BW':
        return `grayscale(${factor}) contrast(${1 + 0.3 * factor})`;
      case 'WARM':
        return `sepia(${0.6 * factor}) saturate(${1 + 0.5 * factor}) hue-rotate(${-15 * factor}deg)`;
      default:
        return 'none';
    }
  };

  // Determine Aspect Ratio Container Classes
  const getAspectClass = (aspect: AspectRatio) => {
    switch (aspect) {
      case '9:16':
        return 'w-[280px] sm:w-[320px] aspect-[9/16]';
      case '16:9':
        return 'w-full max-w-[620px] aspect-[16/9]';
      case '1:1':
        return 'w-[320px] sm:w-[380px] aspect-square';
      case '4:5':
        return 'w-[300px] sm:w-[340px] aspect-[4/5]';
      default:
        return 'w-[300px] aspect-[9/16]';
    }
  };

  // Check if Meme Overlay is active at current playhead
  const isMemeVisible =
    project.activeMemeId &&
    currentPlayheadMs >= project.memeStartMs &&
    currentPlayheadMs <= project.memeEndMs;

  // Active timed transcript caption
  const currentSegment = project.transcriptSegments?.find(
    s => currentPlayheadMs >= s.startMs && currentPlayheadMs <= s.endMs
  );

  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    const tenths = Math.floor((ms % 1000) / 100);
    return `${m}:${s.toString().padStart(2, '0')}.${tenths}`;
  };

  const trimDurationMs = Math.max(1000, project.trimEndMs - project.trimStartMs);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col items-center">
      {/* Video Viewport */}
      <div
        ref={containerRef}
        className={`relative ${getAspectClass(
          project.aspectRatio
        )} bg-slate-950 rounded-xl overflow-hidden shadow-2xl border border-slate-800 flex items-center justify-center transition-all duration-300 group`}
      >
        {/* Background Video or Simulated Canvas */}
        {project.videoUri ? (
          <video
            ref={videoRef}
            src={project.videoUri}
            className="w-full h-full object-cover"
            style={{
              filter: getFilterStyle(project.colorFilter, project.filterIntensity)
            }}
            loop
            muted={project.isOriginalAudioMuted}
            playsInline
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-6 text-center"
            style={{
              filter: getFilterStyle(project.colorFilter, project.filterIntensity)
            }}
          >
            <div className="w-16 h-16 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center mb-3 animate-pulse">
              <Play className="w-8 h-8 text-cyan-400 fill-cyan-400/30 ml-1" />
            </div>
            <p className="text-sm font-semibold text-white">{project.title}</p>
            <p className="text-xs text-slate-400 mt-1">Audio Story Visualizer</p>
          </div>
        )}

        {/* Audio Visualizer Waves if Audio-to-Video Project */}
        {project.audioSourceUri && (
          <div className="absolute inset-x-0 bottom-16 px-6 pointer-events-none flex items-center justify-center gap-1.5 opacity-80">
            {[40, 75, 50, 90, 60, 100, 70, 85, 45, 95, 65, 80].map((h, i) => (
              <span
                key={i}
                className="w-1.5 bg-gradient-to-t from-indigo-500 to-cyan-400 rounded-full transition-all duration-100"
                style={{
                  height: isPlaying ? `${(h * (isPlaying ? 1 : 0.3)) / 2}px` : '8px'
                }}
              />
            ))}
          </div>
        )}

        {/* Synchronized Live Transcription Subtitles */}
        {currentSegment && (
          <div className="absolute inset-x-4 bottom-24 flex justify-center pointer-events-none text-center">
            {project.captionStyle === 'NEON' ? (
              <span className="px-3.5 py-1.5 rounded-lg bg-black/70 backdrop-blur-md text-cyan-300 font-extrabold text-base tracking-wide border border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-pulse">
                {currentSegment.text}
              </span>
            ) : project.captionStyle === 'KARAOKE' ? (
              <span className="px-3.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-black text-base shadow-lg">
                ★ {currentSegment.text} ★
              </span>
            ) : project.captionStyle === 'CINEMATIC' ? (
              <span className="px-4 py-1 rounded bg-black/60 text-white font-serif text-sm tracking-widest uppercase border-y border-white/40">
                {currentSegment.text}
              </span>
            ) : (
              <span className="px-3 py-1 rounded-md bg-indigo-600 text-white font-bold text-sm shadow-md animate-bounce">
                {currentSegment.text}
              </span>
            )}
          </div>
        )}

        {/* Text Overlay Layer */}
        {project.overlayText && (
          <div
            className={`absolute inset-x-4 pointer-events-none flex justify-center ${
              project.overlayTextPosition === 'TOP'
                ? 'top-6'
                : project.overlayTextPosition === 'CENTER'
                ? 'top-1/2 -translate-y-1/2'
                : 'bottom-6'
            }`}
          >
            <div
              className={`px-4 py-1.5 rounded-lg font-black text-center max-w-[90%] transition-all ${
                project.overlayTextBgStyle === 'SOLID'
                  ? 'bg-slate-900 border border-slate-700 shadow-xl'
                  : project.overlayTextBgStyle === 'SEMI_TRANSPARENT'
                  ? 'bg-black/60 backdrop-blur-sm'
                  : project.overlayTextBgStyle === 'NEON_GLOW'
                  ? 'bg-black/80 border border-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.6)]'
                  : 'bg-transparent text-stroke'
              }`}
              style={{
                color: project.overlayTextColorHex || '#ffffff',
                fontSize: `${Math.max(14, project.overlayTextSize)}px`
              }}
            >
              {project.overlayText}
            </div>
          </div>
        )}

        {/* Active Meme Sticker Layer */}
        {isMemeVisible && (
          <div
            className={`absolute pointer-events-none p-3 max-w-[55%] ${
              project.memePosition === 'TOP'
                ? 'top-4 inset-x-0 mx-auto'
                : project.memePosition === 'BOTTOM'
                ? 'bottom-4 inset-x-0 mx-auto'
                : project.memePosition === 'CENTER'
                ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                : 'bottom-4 right-4'
            }`}
          >
            <div className="bg-black/90 p-2 rounded-xl border border-amber-500/60 shadow-2xl text-center">
              {project.memeTopText && (
                <p className="text-[10px] font-black uppercase text-amber-300 drop-shadow mb-1 line-clamp-1">
                  {project.memeTopText}
                </p>
              )}
              {project.memeImageUri && (
                <img
                  src={project.memeImageUri}
                  alt={project.memeTitle || 'Meme'}
                  className="w-full h-24 object-cover rounded-lg border border-slate-800"
                />
              )}
              {project.memeBottomText && (
                <p className="text-[11px] font-extrabold uppercase text-white drop-shadow mt-1 line-clamp-1">
                  {project.memeBottomText}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Center Big Play Button Overlay when Paused */}
        {!isPlaying && (
          <button
            onClick={onTogglePlayback}
            className="absolute w-14 h-14 rounded-full bg-black/60 hover:bg-black/80 border border-white/30 backdrop-blur-md flex items-center justify-center text-white transition-transform hover:scale-110 shadow-xl"
          >
            <Play className="w-7 h-7 fill-white ml-1" />
          </button>
        )}
      </div>

      {/* Scrubber Timeline & Playhead Controls */}
      <div className="w-full max-w-2xl mt-4">
        {/* Progress Bar & Trim Boundary Markers */}
        <div className="relative w-full h-7 flex items-center group">
          {/* Base track */}
          <div className="absolute inset-x-0 h-2 bg-slate-800 rounded-full overflow-hidden">
            {/* Trim window visualization */}
            <div
              className="absolute top-0 bottom-0 bg-indigo-900/60 border-x-2 border-indigo-500"
              style={{
                left: `${(project.trimStartMs / project.originalDurationMs) * 100}%`,
                width: `${
                  ((project.trimEndMs - project.trimStartMs) / project.originalDurationMs) *
                  100
                }%`
              }}
            />
          </div>

          {/* Active playhead bar */}
          <div
            className="absolute h-2 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full pointer-events-none"
            style={{
              left: `${(project.trimStartMs / project.originalDurationMs) * 100}%`,
              width: `${
                Math.max(
                  0,
                  (currentPlayheadMs - project.trimStartMs) / project.originalDurationMs
                ) * 100
              }%`
            }}
          />

          {/* Draggable Slider input */}
          <input
            type="range"
            min={project.trimStartMs}
            max={project.trimEndMs}
            step={50}
            value={currentPlayheadMs}
            onChange={e => onSeek(Number(e.target.value))}
            className="relative w-full h-7 opacity-0 cursor-pointer z-10"
          />

          {/* Thumb marker indicator */}
          <div
            className="absolute w-4 h-4 bg-cyan-400 rounded-full border-2 border-slate-950 shadow-md shadow-cyan-500/50 pointer-events-none -translate-x-1/2"
            style={{
              left: `${(currentPlayheadMs / project.originalDurationMs) * 100}%`
            }}
          />
        </div>

        {/* Timeline Metadata & Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-2 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={onTogglePlayback}
              className="w-8 h-8 rounded-lg bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center text-white transition-colors"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
            </button>

            <button
              onClick={() => onSeek(project.trimStartMs)}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors"
              title="Restart from Trim Start"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <div className="font-mono text-slate-300 ml-1">
              <span className="text-cyan-400 font-bold">{formatTime(currentPlayheadMs)}</span>
              <span className="text-slate-600"> / </span>
              <span>{formatTime(trimDurationMs)}</span>
            </div>
          </div>

          {/* Speed Toggle Pills */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {[0.5, 1.0, 1.25, 1.5, 2.0].map(speed => (
              <button
                key={speed}
                onClick={() => onSpeedChange(speed)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                  playbackSpeed === speed
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
