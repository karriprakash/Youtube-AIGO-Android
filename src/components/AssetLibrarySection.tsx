import React, { useState } from 'react';
import { FolderOpen, Video, Music, Image as ImageIcon, Plus, Play, Sparkles } from 'lucide-react';
import { MediaAsset } from '../types';

interface AssetLibrarySectionProps {
  assets: MediaAsset[];
  onCreateProjectFromAsset: (asset: MediaAsset) => void;
  onAddCustomAsset: (
    name: string,
    type: 'VIDEO' | 'IMAGE' | 'AUDIO' | 'VOICEOVER',
    uri: string,
    durationMs: number,
    language: 'te' | 'en',
    desc: string
  ) => void;
}

export const AssetLibrarySection: React.FC<AssetLibrarySectionProps> = ({
  assets,
  onCreateProjectFromAsset,
  onAddCustomAsset
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<'VIDEO' | 'IMAGE' | 'AUDIO' | 'VOICEOVER'>('VIDEO');
  const [uri, setUri] = useState('');
  const [durationSec, setDurationSec] = useState(25);
  const [language, setLanguage] = useState<'te' | 'en'>('te');
  const [description, setDescription] = useState('');

  const handleSaveAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddCustomAsset(
      name.trim(),
      type,
      uri.trim() || 'https://assets.mixkit.co/videos/preview/mixkit-modern-city-skyline-at-night-42845-large.mp4',
      durationSec * 1000,
      language,
      description.trim() || name.trim()
    );
    setShowAddModal(false);
    setName('');
    setUri('');
    setDescription('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="font-bold text-white text-sm">Media Asset Library ({assets.length})</h3>
          <p className="text-[11px] text-slate-400">
            Stock video clips, Telugu voiceover stems, and background audio tracks
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Import Asset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assets.map(asset => {
          const durationSec = Math.round(asset.durationMs / 1000);
          return (
            <div
              key={asset.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                      {asset.type === 'VIDEO' ? (
                        <Video className="w-5 h-5 text-indigo-400" />
                      ) : asset.type === 'AUDIO' ? (
                        <Music className="w-5 h-5 text-purple-400" />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-pink-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm line-clamp-1">{asset.name}</h4>
                      <p className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="text-cyan-400 font-mono">{asset.type}</span>
                        <span>•</span>
                        <span>{durationSec}s</span>
                        <span>•</span>
                        <span className="text-amber-400 font-medium">
                          {asset.language === 'te' ? 'Telugu' : 'English'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-2 line-clamp-2 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80">
                  {asset.description || asset.sampleTopic}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono truncate max-w-[160px]">
                  {asset.uri.split('/').pop()}
                </span>
                <button
                  onClick={() => onCreateProjectFromAsset(asset)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 text-indigo-400" /> Create Project
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Import Media Asset</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAsset} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold">Asset Title / Filename</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Telugu_Podcast_Voiceover.mp3"
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold">Media Type</label>
                  <select
                    value={type}
                    onChange={e => setType(e.target.value as any)}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="VIDEO">VIDEO (MP4)</option>
                    <option value="AUDIO">AUDIO (MP3)</option>
                    <option value="VOICEOVER">VOICEOVER</option>
                    <option value="IMAGE">IMAGE (PNG/JPG)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold">Language</label>
                  <select
                    value={language}
                    onChange={e => setLanguage(e.target.value as any)}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="te">Telugu (తెలుగు)</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold">Duration (Seconds)</label>
                <input
                  type="number"
                  min={5}
                  max={120}
                  value={durationSec}
                  onChange={e => setDurationSec(Number(e.target.value))}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold">Media URL / Local URI (Optional)</label>
                <input
                  type="text"
                  value={uri}
                  onChange={e => setUri(e.target.value)}
                  placeholder="https://... or leave empty for sample"
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold">Description / Notes</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Asset description..."
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 text-slate-400 hover:text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl"
                >
                  Import Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
