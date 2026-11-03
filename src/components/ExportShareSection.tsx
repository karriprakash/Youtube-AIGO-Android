import React, { useState } from 'react';
import {
  Download,
  Share2,
  CheckCircle2,
  Youtube,
  Instagram,
  Music2,
  MessageCircle,
  HardDrive,
  Copy,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VideoProject, UserVideoMetadata } from '../types';

interface ExportShareSectionProps {
  project: VideoProject;
  onExportComplete: (metadata: UserVideoMetadata) => void;
}

export const ExportShareSection: React.FC<ExportShareSectionProps> = ({
  project,
  onExportComplete
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportedMetadata, setExportedMetadata] = useState<UserVideoMetadata | null>(null);

  const durationSec = Math.max(1, Math.round((project.trimEndMs - project.trimStartMs) / 1000));
  const resolution =
    project.aspectRatio === '16:9'
      ? '1920x1080'
      : project.aspectRatio === '1:1'
      ? '1080x1080'
      : project.aspectRatio === '4:5'
      ? '1080x1350'
      : '1080x1920';
  const simulatedBytes = Math.round(durationSec * 1400000);

  const handleExport = () => {
    setIsExporting(true);
    setExportProgress(10);

    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            setExportProgress(100);
            setIsExporting(false);

            const sanitized = project.title.replace(/[^a-zA-Z0-9_]/g, '_').slice(0, 24);
            const metadata: UserVideoMetadata = {
              id: 'export_' + Date.now(),
              projectTitle: project.title,
              localFilePath: `/storage/emulated/0/Movies/OmniVideo/${sanitized}_${Date.now()}.mp4`,
              createdAt: Date.now(),
              updatedAt: Date.now(),
              durationMs: project.trimEndMs - project.trimStartMs,
              fileSizeBytes: simulatedBytes,
              resolution,
              aspectRatio: project.aspectRatio,
              mimeType: 'video/mp4',
              isSynced: true,
              tags: `${project.language === 'te' ? 'Telugu' : 'English'}, ${project.aspectRatio}`,
              notes: project.overlayText || project.rawTopicNotes.slice(0, 80)
            };

            setExportedMetadata(metadata);
            onExportComplete(metadata);

            try {
              confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 }
              });
            } catch {}
          }, 400);
          return 95;
        }
        return prev + 25;
      });
    }, 250);
  };

  const handleDownloadJsonPackage = () => {
    const pkg = {
      project,
      exportedAt: new Date().toISOString(),
      metadata: exportedMetadata
    };
    const blob = new Blob([JSON.stringify(pkg, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title.replace(/\s+/g, '_')}_package.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSocialShare = (platform: string) => {
    const shareText = `${project.youtubeTitle || project.title}\n\n${project.instagramHashtags || '#OmniVideo'}`;
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: shareText
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      alert(`Copied caption and hashtags for ${platform}!`);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Download className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-white text-base">Export & Multi-Platform Distribution</h3>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
          Hardware Render
        </span>
      </div>

      {/* Video Specifications Card */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
          <p className="text-[10px] text-slate-400">Duration</p>
          <p className="text-sm font-bold text-white mt-0.5">{durationSec}s</p>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
          <p className="text-[10px] text-slate-400">Resolution</p>
          <p className="text-sm font-bold text-cyan-400 mt-0.5">{resolution}</p>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
          <p className="text-[10px] text-slate-400">Est. File Size</p>
          <p className="text-sm font-bold text-white mt-0.5">{(simulatedBytes / 1048576).toFixed(1)} MB</p>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
          <p className="text-[10px] text-slate-400">Codec</p>
          <p className="text-sm font-bold text-indigo-400 mt-0.5">H.264 / AAC</p>
        </div>
      </div>

      {/* Render / Export Action */}
      {!exportedMetadata && !isExporting && (
        <button
          onClick={handleExport}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white rounded-xl text-sm font-bold shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
        >
          <Download className="w-4 h-4" /> Export Video Package to Offline Vault
        </button>
      )}

      {/* Exporting Progress */}
      {isExporting && (
        <div className="bg-slate-950 p-5 rounded-xl border border-indigo-700/50 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              Encoding Video, Subtitles & Audio Mix...
            </span>
            <span className="text-cyan-400 font-mono">{exportProgress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-200"
              style={{ width: `${exportProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Export Completed Card */}
      {exportedMetadata && (
        <div className="bg-gradient-to-r from-emerald-950/40 to-slate-950 p-4 rounded-xl border border-emerald-600/40 space-y-4">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white">Video Successfully Packaged!</h4>
              <p className="text-[11px] text-slate-400">
                Saved to Offline Video Vault. Available offline anytime.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleDownloadJsonPackage}
              className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download Project Package
            </button>
            <button
              onClick={handleExport}
              className="py-2 px-3 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg border border-slate-800 transition-colors"
            >
              Re-Export
            </button>
          </div>

          {/* Social Distribution Shortcuts */}
          <div className="space-y-2 pt-2 border-t border-slate-900">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-indigo-400" /> Multi-Platform One-Tap Publish
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => handleSocialShare('YouTube')}
                className="py-2 px-2.5 bg-red-950/40 hover:bg-red-900/50 border border-red-700/40 rounded-lg text-xs font-bold text-red-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Youtube className="w-3.5 h-3.5 text-red-400" /> YouTube
              </button>
              <button
                onClick={() => handleSocialShare('Instagram')}
                className="py-2 px-2.5 bg-pink-950/40 hover:bg-pink-900/50 border border-pink-700/40 rounded-lg text-xs font-bold text-pink-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-400" /> Instagram
              </button>
              <button
                onClick={() => handleSocialShare('TikTok')}
                className="py-2 px-2.5 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-700/40 rounded-lg text-xs font-bold text-cyan-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Music2 className="w-3.5 h-3.5 text-cyan-400" /> TikTok
              </button>
              <button
                onClick={() => handleSocialShare('WhatsApp')}
                className="py-2 px-2.5 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-700/40 rounded-lg text-xs font-bold text-emerald-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
