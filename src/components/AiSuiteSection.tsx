import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Youtube,
  Instagram,
  Music2,
  Clapperboard,
  Languages
} from 'lucide-react';
import { VideoProject, GeneratedSocialMediaKit } from '../types';
import { geminiVideoAi } from '../services/geminiService';

interface AiSuiteSectionProps {
  project: VideoProject;
  onApplyAiKit: (kit: GeneratedSocialMediaKit) => void;
  onApplyOverlayText: (text: string) => void;
}

export const AiSuiteSection: React.FC<AiSuiteSectionProps> = ({
  project,
  onApplyAiKit,
  onApplyOverlayText
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activePlatformTab, setActivePlatformTab] = useState<'OVERVIEW' | 'YOUTUBE' | 'INSTAGRAM' | 'TIKTOK' | 'BROLL'>('OVERVIEW');
  const [customNotes, setCustomNotes] = useState(project.rawTopicNotes || '');

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const durationSec = Math.max(
        5,
        Math.round((project.trimEndMs - project.trimStartMs) / 1000)
      );
      const kit = await geminiVideoAi.generateMultiFormatContent(
        project.title,
        customNotes || project.title,
        project.language,
        project.aspectRatio,
        durationSec
      );
      onApplyAiKit(kit);
    } catch (err) {
      console.error('Failed to generate AI kit', err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const hasGeneratedContent = Boolean(project.aiSummaryEn || project.aiSummaryTe || project.youtubeTitle);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-white text-base">Google Gemini Multilingual Video AI</h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-950 text-cyan-300 border border-indigo-700/50 flex items-center gap-1">
          <Languages className="w-3 h-3" /> Telugu & English
        </span>
      </div>

      {/* Input / Topic Notes */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">
          Video Script / Raw Audio Notes (Telugu or English)
        </label>
        <textarea
          rows={3}
          value={customNotes}
          onChange={e => setCustomNotes(e.target.value)}
          placeholder="ఉదాహరణ: ఈ వీడియోలో కొత్త AI ఫీచర్లు మరియు స్మార్ట్‌ఫోన్ రివ్యూ గురించి మాట్లాడుతున్నాము..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
        />
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-slate-400">
            Preferred language: <span className="font-semibold text-cyan-400">{project.language === 'te' ? 'Telugu (తెలుగు)' : 'English'}</span>
          </p>
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Generating AI Kit...' : hasGeneratedContent ? 'Regenerate Content' : 'Generate Multilingual Social Kit'}
          </button>
        </div>
      </div>

      {/* Generated Content Showcase */}
      {hasGeneratedContent && (
        <div className="space-y-4 pt-3 border-t border-slate-800">
          {/* Navigation Sub-tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-800">
            {[
              { id: 'OVERVIEW', label: 'Bilingual Summaries', icon: Languages },
              { id: 'YOUTUBE', label: 'YouTube (16:9 / Shorts)', icon: Youtube },
              { id: 'INSTAGRAM', label: 'Instagram (Reels)', icon: Instagram },
              { id: 'TIKTOK', label: 'TikTok Hooks', icon: Music2 },
              { id: 'BROLL', label: 'B-Roll & Overlay', icon: Clapperboard }
            ].map(tab => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePlatformTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    activePlatformTab === tab.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* TAB: OVERVIEW / BILINGUAL SUMMARIES */}
          {activePlatformTab === 'OVERVIEW' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Telugu Summary Card */}
              <div className="bg-slate-950 p-4 rounded-xl border border-indigo-900/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300 flex items-center gap-1">
                    🇮🇳 తెలుగులో ముఖ్యాంశాలు (Telugu Summary)
                  </span>
                  <button
                    onClick={() => copyToClipboard(project.aiSummaryTe, 'summary_te')}
                    className="p-1 text-slate-400 hover:text-white rounded"
                    title="Copy Telugu Summary"
                  >
                    {copiedKey === 'summary_te' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                  {project.aiSummaryTe || 'తెలుగు సారాంశం సిద్ధంగా ఉంది.'}
                </div>
              </div>

              {/* English Summary Card */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">
                    🇺🇸 English Key Highlights
                  </span>
                  <button
                    onClick={() => copyToClipboard(project.aiSummaryEn, 'summary_en')}
                    className="p-1 text-slate-400 hover:text-white rounded"
                    title="Copy English Summary"
                  >
                    {copiedKey === 'summary_en' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                  {project.aiSummaryEn}
                </div>
              </div>
            </div>
          )}

          {/* TAB: YOUTUBE */}
          {activePlatformTab === 'YOUTUBE' && (
            <div className="space-y-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-400">SEO Optimized Video Title</span>
                  <button
                    onClick={() => copyToClipboard(project.youtubeTitle, 'yt_title')}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    {copiedKey === 'yt_title' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} Copy Title
                  </button>
                </div>
                <p className="text-sm font-bold text-white">{project.youtubeTitle}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Description & Chapters</span>
                  <button
                    onClick={() => copyToClipboard(project.youtubeDescription, 'yt_desc')}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    {copiedKey === 'yt_desc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} Copy Description
                  </button>
                </div>
                <div className="text-xs text-slate-300 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
                  {project.youtubeDescription}
                </div>
              </div>
            </div>
          )}

          {/* TAB: INSTAGRAM */}
          {activePlatformTab === 'INSTAGRAM' && (
            <div className="space-y-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-pink-400">Reels Caption & Hook</span>
                  <button
                    onClick={() => copyToClipboard(project.instagramCaption, 'ig_cap')}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    {copiedKey === 'ig_cap' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} Copy Caption
                  </button>
                </div>
                <p className="text-xs text-slate-200 whitespace-pre-line">{project.instagramCaption}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">High-Reach Trending Hashtags</span>
                  <button
                    onClick={() => copyToClipboard(project.instagramHashtags, 'ig_tags')}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    {copiedKey === 'ig_tags' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} Copy Tags
                  </button>
                </div>
                <p className="text-xs text-cyan-400 font-mono leading-relaxed">{project.instagramHashtags}</p>
              </div>
            </div>
          )}

          {/* TAB: TIKTOK */}
          {activePlatformTab === 'TIKTOK' && (
            <div className="space-y-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400">First 3-Second Viral Hook</span>
                  <button
                    onClick={() => copyToClipboard(project.tiktokHook, 'tt_hook')}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    {copiedKey === 'tt_hook' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} Copy Hook
                  </button>
                </div>
                <p className="text-sm font-black text-amber-300">"{project.tiktokHook}"</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">TikTok SEO Caption</span>
                  <button
                    onClick={() => copyToClipboard(project.tiktokCaptions, 'tt_cap')}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    {copiedKey === 'tt_cap' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} Copy Caption
                  </button>
                </div>
                <p className="text-xs text-slate-200">{project.tiktokCaptions}</p>
              </div>
            </div>
          )}

          {/* TAB: B-ROLL & OVERLAY */}
          {activePlatformTab === 'BROLL' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-purple-400">Pacing & B-Roll Suggestions</span>
                <div className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                  {project.brollSuggestions}
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-amber-400">Suggested On-Screen Banner</span>
                <div className="p-3 bg-slate-900 rounded-lg text-center font-black text-cyan-300 text-sm border border-cyan-400/30">
                  {project.overlayText || '🔥 Watch Till The End!'}
                </div>
                <button
                  onClick={() => onApplyOverlayText(project.overlayText || '🔥 Watch Till The End!')}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  Apply Suggested Banner to Video
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
