export type AspectRatio = '9:16' | '16:9' | '1:1' | '4:5';

export type ColorFilterType = 'NONE' | 'VIBRANT' | 'CYBERPUNK' | 'CINEMATIC' | 'BW' | 'WARM';

export type CaptionStyle = 'POP_IN' | 'KARAOKE' | 'CINEMATIC' | 'NEON';

export type MemePosition = 'TOP' | 'BOTTOM' | 'BOTTOM_RIGHT' | 'CENTER';

export type EditorTab =
  | 'TRIM'
  | 'TEXT'
  | 'MEMES'
  | 'MEDIA'
  | 'AUDIO'
  | 'FILTERS'
  | 'FORMAT'
  | 'AI_SUITE'
  | 'SHARE';

export interface TranscriptSegment {
  startMs: number;
  endMs: number;
  text: string;
}

export interface VideoProject {
  id: string;
  title: string;
  videoUri: string;
  audioUri: string | null;
  originalDurationMs: number;
  trimStartMs: number;
  trimEndMs: number;
  aspectRatio: AspectRatio;
  language: 'te' | 'en' | 'auto';
  rawTopicNotes: string;

  // Filter & Aesthetics
  colorFilter: ColorFilterType;
  filterIntensity: number; // 0.0 - 1.0

  // Audio mix
  originalAudioVolume: number; // 0.0 - 2.0
  isOriginalAudioMuted: boolean;
  voiceoverVolume: number; // 0.0 - 2.0
  voiceClarityEnhanced: boolean;

  // Text Overlay
  overlayText: string;
  overlayTextColorHex: string;
  overlayTextBgStyle: 'SOLID' | 'SEMI_TRANSPARENT' | 'OUTLINE' | 'NEON_GLOW';
  overlayTextPosition: 'TOP' | 'CENTER' | 'BOTTOM';
  overlayTextSize: number; // pt/px

  // AI Generated Social Media Kit
  aiSummaryEn: string;
  aiSummaryTe: string;
  youtubeTitle: string;
  youtubeDescription: string;
  youtubeChapters: string;
  instagramCaption: string;
  instagramHashtags: string;
  tiktokHook: string;
  tiktokCaptions: string;
  brollSuggestions: string;

  // Audio-to-Video & Captions
  audioSourceUri: string | null;
  audioTranscript: string;
  transcriptSegments: TranscriptSegment[];
  captionStyle: CaptionStyle;
  backgroundMediaUri: string | null;
  backgroundMediaType: 'PHOTO' | 'VIDEO_CLIP' | 'GRADIENT';
  backgroundMediaSource: 'GOOGLE_PHOTOS' | 'GOOGLE_SEARCH' | 'SOCIAL_MEDIA' | 'LOCAL';

  // Meme Integration
  activeMemeId: string | null;
  memeTitle: string | null;
  memeTopText: string | null;
  memeBottomText: string | null;
  memeImageUri: string | null;
  memePosition: MemePosition;
  memeStartMs: number;
  memeEndMs: number;

  isExported: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface MediaAsset {
  id: string;
  name: string;
  type: 'VIDEO' | 'IMAGE' | 'AUDIO' | 'VOICEOVER';
  uri: string;
  durationMs: number;
  language: 'te' | 'en';
  description: string;
  sampleTopic: string;
}

export interface MemeAsset {
  id: string;
  name: string;
  category: 'Telugu Film' | 'Brahmi / Ali Classics' | 'Trending Tech' | 'Reaction';
  imageUrl: string;
  defaultTopText: string;
  defaultBottomText: string;
  tags: string[];
}

export interface MediaSourceItem {
  id: string;
  title: string;
  source: 'GOOGLE_PHOTOS' | 'GOOGLE_SEARCH' | 'SOCIAL_MEDIA';
  mediaType: 'PHOTO' | 'VIDEO';
  thumbnailUrl: string;
  sampleUri: string;
  description: string;
  tags: string[];
}

export interface UserVideoMetadata {
  id: string;
  projectTitle: string;
  localFilePath: string;
  createdAt: number;
  updatedAt: number;
  durationMs: number;
  fileSizeBytes: number;
  resolution: string;
  aspectRatio: string;
  mimeType: string;
  isSynced: boolean;
  tags: string;
  notes: string;
}

export interface GeneratedSocialMediaKit {
  summaryEn: string;
  summaryTe: string;
  youtubeTitle: string;
  youtubeDescription: string;
  youtubeChapters: string;
  instagramCaption: string;
  instagramHashtags: string;
  tiktokHook: string;
  tiktokCaptions: string;
  brollSuggestions: string;
  overlayTextSuggestion: string;
}
