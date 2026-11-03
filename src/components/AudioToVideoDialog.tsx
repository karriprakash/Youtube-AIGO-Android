import React, { useState } from 'react';
import { Mic, Sparkles, Music, Image as ImageIcon, Volume2, Check } from 'lucide-react';
import { AspectRatio, CaptionStyle, TranscriptSegment } from '../types';

interface AudioToVideoDialogProps {
  onDismiss: () => void;
  onCreateAudioVideoProject: (
    title: string,
    durationMs: number,
    language: 'te' | 'en',
    audioUri: string,
    transcript: string,
    segments: TranscriptSegment[],
    aspectRatio: AspectRatio,
    backgroundUri: string | null,
    backgroundType: 'PHOTO' | 'VIDEO_CLIP' | 'GRADIENT',
    backgroundSource: 'GOOGLE_PHOTOS' | 'GOOGLE_SEARCH' | 'SOCIAL_MEDIA' | 'LOCAL'
  ) => void;
}

const PRESET_AUDIOS = [
  {
    id: 'telugu_tech_podcast',
    title: 'Telugu AI & Tech Podcast Snippet',
    durationMs: 24000,
    language: 'te' as const,
    audioUri: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
    transcript:
      'ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ తో తెలుగు క్రియేటర్లు అద్భుతాలు సృష్టిస్తున్నారు. కొత్త టెక్నాలజీతో మీ ఆలోచనలను నేరుగా వీడియోగా మార్చుకోవచ్చు.',
    segments: [
      { startMs: 0, endMs: 7000, text: 'ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ తో తెలుగు క్రియేటర్లు' },
      { startMs: 7000, endMs: 14000, text: 'అద్భుతమైన వీడియోలు సృష్టిస్తున్నారు!' },
      { startMs: 14000, endMs: 24000, text: 'కొత్త టెక్నాలజీతో మీ ఆలోచనలను వీడియోగా మార్చుకోండి.' }
    ]
  },
  {
    id: 'telugu_motivation_dialogue',
    title: 'Telugu Daily Motivation & Success',
    durationMs: 20000,
    language: 'te' as const,
    audioUri: 'https://actions.google.com/sounds/v1/science_fiction/ambient_hum.ogg',
    transcript:
      'జీవితంలో విజయం సాధించాలంటే ప్రతిరోజూ క్రమశిక్షణ ఎంతో అవసరం. నీపై నీకు నమ్మకం ఉంటే అసాధ్యమైనది ఏదీ లేదు.',
    segments: [
      { startMs: 0, endMs: 6000, text: 'విజయం సాధించాలంటే క్రమశిక్షణ ముఖ్యం' },
      { startMs: 6000, endMs: 13000, text: 'ప్రతిరోజూ కష్టపడి పని చేయాలి!' },
      { startMs: 13000, endMs: 20000, text: 'నీపై నీకు నమ్మకం ఉంటే అసాధ్యమైనది లేదు.' }
    ]
  },
  {
    id: 'english_creator_tips',
    title: 'Viral Video Growth Secret 🚀',
    durationMs: 18000,
    language: 'en' as const,
    audioUri: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
    transcript:
      'The first three seconds of your video decide whether viewers stay or scroll away. Always start with a punchy hook!',
    segments: [
      { startMs: 0, endMs: 5000, text: 'The first 3 seconds decide everything' },
      { startMs: 5000, endMs: 11000, text: 'Hook viewers before they scroll away!' },
      { startMs: 11000, endMs: 18000, text: 'Keep the retention high till the end.' }
    ]
  }
];

export const AudioToVideoDialog: React.FC<AudioToVideoDialogProps> = ({
  onDismiss,
  onCreateAudioVideoProject
}) => {
  const [selectedPreset, setSelectedPreset] = useState(PRESET_AUDIOS[0]);
  const [title, setTitle] = useState(PRESET_AUDIOS[0].title);
  const [transcript, setTranscript] = useState(PRESET_AUDIOS[0].transcript);
  const [captionStyle, setCaptionStyle] = useState<CaptionStyle>('NEON');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
  const [bgChoice, setBgChoice] = useState<'GRADIENT' | 'GOOGLE_PHOTOS' | 'GOOGLE_SEARCH'>('GOOGLE_PHOTOS');

  const handleSelectPreset = (preset: typeof PRESET_AUDIOS[0]) => {
    setSelectedPreset(preset);
    setTitle(preset.title);
    setTranscript(preset.transcript);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let bgUri: string | null = null;
    let bgType: 'PHOTO' | 'VIDEO_CLIP' | 'GRADIENT' = 'GRADIENT';
    let bgSrc: 'GOOGLE_PHOTOS' | 'GOOGLE_SEARCH' | 'SOCIAL_MEDIA' | 'LOCAL' = 'LOCAL';

    if (bgChoice === 'GOOGLE_PHOTOS') {
      bgUri = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80';
      bgType = 'PHOTO';
      bgSrc = 'GOOGLE_PHOTOS';
    } else if (bgChoice === 'GOOGLE_SEARCH') {
      bgUri = 'https://images.unsplash.com/photo-1572455044327-7348c1be7267?w=1200&auto=format&fit=crop&q=80';
      bgType = 'PHOTO';
      bgSrc = 'GOOGLE_SEARCH';
    }

    onCreateAudioVideoProject(
      title.trim() || 'Audio Story Reel',
      selectedPreset.durationMs,
      selectedPreset.language,
      selectedPreset.audioUri,
      transcript.trim(),
      selectedPreset.segments,
      aspectRatio,
      bgUri,
      bgType,
      bgSrc
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-base">Audio & Transcription to Video Studio</h3>
          </div>
          <button
            onClick={onDismiss}
            className="text-slate-400 hover:text-white text-xs font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Preset Audio Selection */}
          <div className="space-y-2">
            <label className="text-slate-300 font-semibold flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-indigo-400" /> Select Voice or Audio Preset
            </label>
            <div className="space-y-2">
              {PRESET_AUDIOS.map(preset => {
                const isSelected = selectedPreset.id === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-cyan-400 bg-slate-950 ring-2 ring-cyan-400/20'
                        : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{preset.title}</span>
                      <span className="text-[10px] text-cyan-400 font-mono">
                        {(preset.durationMs / 1000).toFixed(0)}s • {preset.language === 'te' ? 'Telugu' : 'English'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                      {preset.transcript}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold">Video Reel Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Transcript / Subtitle text */}
          <div>
            <label className="text-slate-300 font-semibold flex items-center justify-between">
              <span>Synchronized Subtitles & Spoken Words</span>
              <span className="text-cyan-400 text-[10px]">Auto-Timed Subtitles</span>
            </label>
            <textarea
              rows={3}
              value={transcript}
              onChange={e => setTranscript(e.target.value)}
              className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-cyan-400 resize-none font-sans"
            />
          </div>

          {/* Caption Animation Style */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Caption Kinetic Animation Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'NEON', label: 'Neon Glow', color: 'text-cyan-400' },
                { id: 'KARAOKE', label: 'Karaoke Star', color: 'text-amber-400' },
                { id: 'CINEMATIC', label: 'Cinematic Classic', color: 'text-white' },
                { id: 'POP_IN', label: 'Pop-In Bounce', color: 'text-indigo-400' }
              ].map(st => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setCaptionStyle(st.id as any)}
                  className={`py-2 px-2 text-center rounded-xl border text-xs font-bold transition-all ${
                    captionStyle === st.id
                      ? 'bg-slate-950 border-cyan-400 ring-2 ring-cyan-400/30'
                      : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <span className={st.color}>{st.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Background Source */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold">Background Visual Source</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'GOOGLE_PHOTOS', label: 'Google Photos Beach' },
                { id: 'GOOGLE_SEARCH', label: 'Google Search 4K City' },
                { id: 'GRADIENT', label: 'Neon Sound Waves' }
              ].map(bg => (
                <button
                  key={bg.id}
                  type="button"
                  onClick={() => setBgChoice(bg.id as any)}
                  className={`py-2 px-2 text-center rounded-xl border text-[11px] font-semibold transition-all ${
                    bgChoice === bg.id
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {bg.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onDismiss}
              className="px-3 py-2 text-slate-400 hover:text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:opacity-90 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20"
            >
              Generate Audio Reel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
