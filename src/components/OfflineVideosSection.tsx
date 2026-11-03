import React from 'react';
import { Video, HardDrive, Trash2, CheckCircle2, FileText, Download } from 'lucide-react';
import { UserVideoMetadata } from '../types';

interface OfflineVideosSectionProps {
  userVideos: UserVideoMetadata[];
  onDeleteVideo: (id: string) => void;
}

export const OfflineVideosSection: React.FC<OfflineVideosSectionProps> = ({
  userVideos,
  onDeleteVideo
}) => {
  if (userVideos.length === 0) {
    return (
      <div className="text-center py-12 px-4 bg-slate-900/60 border border-slate-800 rounded-2xl">
        <HardDrive className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <h4 className="text-sm font-bold text-white">Offline Vault is Empty</h4>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
          Export any video project from the editor to save packaged videos directly in your local offline vault!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="font-bold text-white text-sm">Offline Video Vault ({userVideos.length})</h3>
          <p className="text-[11px] text-slate-400">
            Exported videos persisted for offline playback & instant sharing
          </p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> Room / Local DB
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userVideos.map(video => {
          const durationSec = Math.round(video.durationMs / 1000);
          const sizeMb = (video.fileSizeBytes / 1048576).toFixed(1);

          return (
            <div
              key={video.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-purple-950 border border-purple-700/50 flex items-center justify-center shrink-0">
                      <Video className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm line-clamp-1">{video.projectTitle}</h4>
                      <p className="text-[11px] text-slate-400 flex items-center gap-2">
                        <span className="text-cyan-400 font-mono">{video.resolution}</span>
                        <span>•</span>
                        <span>{durationSec}s</span>
                        <span>•</span>
                        <span>{sizeMb} MB</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(`Remove "${video.projectTitle}" from offline storage?`)) {
                        onDeleteVideo(video.id);
                      }
                    }}
                    className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors"
                    title="Remove from Vault"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 my-2 space-y-1 font-mono text-[11px]">
                  <p className="text-slate-400 truncate">
                    <span className="text-slate-500">Path: </span>
                    {video.localFilePath}
                  </p>
                  {video.notes && (
                    <p className="text-cyan-300 font-sans text-xs truncate">
                      {video.notes}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded-full">
                    {video.mimeType}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded-full">
                    {video.aspectRatio}
                  </span>
                  {video.isSynced && (
                    <span className="text-[10px] px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded-full border border-emerald-800/50">
                      Ready for Export
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                <span>Saved {new Date(video.createdAt).toLocaleDateString()}</span>
                <button
                  onClick={() => {
                    const blob = new Blob([JSON.stringify(video, null, 2)], {
                      type: 'application/json'
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${video.projectTitle}_meta.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  <Download className="w-3.5 h-3.5" /> Export Specs
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
