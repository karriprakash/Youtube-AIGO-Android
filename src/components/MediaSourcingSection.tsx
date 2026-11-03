import React, { useState } from 'react';
import { Image as ImageIcon, Video, Search, Globe, Plus, Check } from 'lucide-react';
import { VideoProject, MediaSourceItem } from '../types';
import { SEED_MEDIA_SOURCES } from '../data/seedData';

interface MediaSourcingSectionProps {
  project: VideoProject;
  onUpdateBackgroundMedia: (
    uri: string,
    type: 'PHOTO' | 'VIDEO_CLIP' | 'GRADIENT',
    source: 'GOOGLE_PHOTOS' | 'GOOGLE_SEARCH' | 'SOCIAL_MEDIA' | 'LOCAL'
  ) => void;
  onImportAsAsset: (item: MediaSourceItem) => void;
}

export const MediaSourcingSection: React.FC<MediaSourcingSectionProps> = ({
  project,
  onUpdateBackgroundMedia,
  onImportAsAsset
}) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'GOOGLE_SEARCH' | 'GOOGLE_PHOTOS' | 'SOCIAL_MEDIA'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = SEED_MEDIA_SOURCES.filter(item => {
    const matchesSource = activeFilter === 'ALL' || item.source === activeFilter;
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSource && matchesSearch;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-white text-base">Media Sourcing & Backgrounds</h3>
        </div>
        <span className="text-xs text-slate-400">Google Photos & Search Stock</span>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'ALL', label: 'All Sources' },
            { id: 'GOOGLE_SEARCH', label: 'Google Search 4K' },
            { id: 'GOOGLE_PHOTOS', label: 'Google Photos' },
            { id: 'SOCIAL_MEDIA', label: 'Social B-Roll' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeFilter === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search Hyderabad drone, beach, podcast..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Media Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredItems.map(item => {
          const isSelected = project.backgroundMediaUri === item.sampleUri;
          return (
            <div
              key={item.id}
              className={`bg-slate-950 rounded-xl overflow-hidden border transition-all ${
                isSelected
                  ? 'border-indigo-500 ring-2 ring-indigo-500/30'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="relative aspect-video bg-slate-900">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-bold text-white flex items-center gap-1">
                  {item.mediaType === 'VIDEO' ? <Video className="w-3 h-3 text-cyan-400" /> : <ImageIcon className="w-3 h-3 text-amber-400" />}
                  {item.source.replace('_', ' ')}
                </span>
                {isSelected && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-indigo-600 text-[10px] font-bold text-white flex items-center gap-1 shadow">
                    <Check className="w-3 h-3" /> Active Background
                  </div>
                )}
              </div>

              <div className="p-3.5 space-y-2">
                <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">{item.description}</p>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-slate-900 text-slate-400 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-900">
                  <button
                    onClick={() =>
                      onUpdateBackgroundMedia(
                        item.sampleUri,
                        item.mediaType === 'PHOTO' ? 'PHOTO' : 'VIDEO_CLIP',
                        item.source
                      )
                    }
                    className="flex-1 py-1.5 px-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors"
                  >
                    Apply to Canvas
                  </button>
                  <button
                    onClick={() => onImportAsAsset(item)}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors"
                    title="Import to Asset Library"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
