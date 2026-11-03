import React, { useState } from 'react';
import { Smile, Sparkles, Plus, Play } from 'lucide-react';
import { MemeAsset } from '../types';
import { SEED_MEMES } from '../data/seedData';

interface HomeScreenMemeHubProps {
  onCreateProjectWithMeme: (meme: MemeAsset) => void;
}

export const HomeScreenMemeHub: React.FC<HomeScreenMemeHubProps> = ({
  onCreateProjectWithMeme
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Telugu Film', 'Brahmi / Ali Classics', 'Trending Tech', 'Reaction'];

  const filteredMemes = SEED_MEMES.filter(
    m => selectedCategory === 'ALL' || m.category === selectedCategory
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="font-bold text-white text-sm">Telugu Meme & Comedy Hub</h3>
          <p className="text-[11px] text-slate-400">
            One-click create reels with iconic Telugu comedy stickers & punchlines
          </p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-800/60 font-semibold flex items-center gap-1">
          <Smile className="w-3.5 h-3.5" /> {SEED_MEMES.length} Templates
        </span>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Meme Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMemes.map(meme => (
          <div
            key={meme.id}
            className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all group flex flex-col justify-between"
          >
            <div className="relative aspect-video bg-slate-950 overflow-hidden">
              <img
                src={meme.imageUrl}
                alt={meme.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-between p-3">
                <span className="self-start px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-black uppercase shadow">
                  {meme.category}
                </span>
                <p className="text-xs font-bold text-white drop-shadow">{meme.name}</p>
              </div>
            </div>

            <div className="p-3.5 space-y-2.5">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 space-y-1">
                <p className="text-[11px] font-bold text-amber-300 line-clamp-1">
                  "{meme.defaultTopText}"
                </p>
                <p className="text-[11px] font-semibold text-slate-200 line-clamp-1">
                  "{meme.defaultBottomText}"
                </p>
              </div>

              <div className="flex flex-wrap gap-1">
                {meme.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded">
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => onCreateProjectWithMeme(meme)}
                className="w-full py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" /> Create Video With This Meme
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
