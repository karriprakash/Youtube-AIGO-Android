import React, { useState, useEffect, useRef } from 'react';
import {
  Film,
  Sparkles,
  Plus,
  Scissors,
  Type,
  Smile,
  Globe,
  Volume2,
  Sliders,
  Smartphone,
  Share2,
  ArrowLeft,
  Video as VideoIcon,
  FolderOpen,
  CheckCircle2,
  Music,
  ExternalLink
} from 'lucide-react';
import {
  VideoProject,
  MediaAsset,
  MemeAsset,
  MediaSourceItem,
  UserVideoMetadata,
  EditorTab,
  AspectRatio,
  ColorFilterType,
  MemePosition,
  GeneratedSocialMediaKit,
  TranscriptSegment,
  CaptionStyle
} from './types';
import { storage } from './services/storageService';
import { Header } from './components/Header';
import { ProjectsListSection } from './components/ProjectsListSection';
import { OfflineVideosSection } from './components/OfflineVideosSection';
import { HomeScreenMemeHub } from './components/HomeScreenMemeHub';
import { AssetLibrarySection } from './components/AssetLibrarySection';
import { VideoPreviewCanvas } from './components/VideoPreviewCanvas';
import { TrimToolSection } from './components/TrimToolSection';
import { TextOverlayToolSection } from './components/TextOverlayToolSection';
import { MemeStudioSection } from './components/MemeStudioSection';
import { MediaSourcingSection } from './components/MediaSourcingSection';
import { AudioLevelsToolSection } from './components/AudioLevelsToolSection';
import { FilterToolSection } from './components/FilterToolSection';
import { FormatToolSection } from './components/FormatToolSection';
import { AiSuiteSection } from './components/AiSuiteSection';
import { ExportShareSection } from './components/ExportShareSection';
import { CreateProjectDialog } from './components/CreateProjectDialog';
import { AudioToVideoDialog } from './components/AudioToVideoDialog';
import { AccountDialog } from './components/AccountDialog';

export function App() {
  // App state
  const [projects, setProjects] = useState<VideoProject[]>([]);
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [userVideos, setUserVideos] = useState<UserVideoMetadata[]>([]);
  const [activeProject, setActiveProject] = useState<VideoProject | null>(null);
  const [activeTab, setActiveTab] = useState<EditorTab>('TRIM');
  const [homeTabIndex, setHomeTabIndex] = useState<number>(0);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentPlayheadMs, setCurrentPlayheadMs] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  // Dialogs
  const [showCreateDialog, setShowCreateDialog] = useState<boolean>(false);
  const [showAudioDialog, setShowAudioDialog] = useState<boolean>(false);
  const [showAccountDialog, setShowAccountDialog] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const playbackTimerRef = useRef<number | null>(null);

  // Load initial data
  useEffect(() => {
    const loadedProjects = storage.getProjects();
    const loadedAssets = storage.getAssets();
    const loadedUserVideos = storage.getUserVideos();
    const loadedUser = storage.getUser();

    setProjects(loadedProjects);
    setAssets(loadedAssets);
    setUserVideos(loadedUserVideos);
    setUser(loadedUser);
  }, []);

  // Show toast notification
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Select project & initialize playhead
  const handleSelectProject = (project: VideoProject) => {
    setActiveProject(project);
    setCurrentPlayheadMs(project.trimStartMs);
    setIsPlaying(false);
    setActiveTab('TRIM');
  };

  // Playback loop ticker matching Android MainViewModel
  useEffect(() => {
    if (isPlaying && activeProject) {
      const stepMs = 50;
      playbackTimerRef.current = window.setInterval(() => {
        setCurrentPlayheadMs(prev => {
          const next = prev + stepMs * playbackSpeed;
          if (next > activeProject.trimEndMs) {
            return activeProject.trimStartMs; // Loop inside trim bounds
          }
          return next;
        });
      }, stepMs);
    } else {
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
        playbackTimerRef.current = null;
      }
    }
    return () => {
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
      }
    };
  }, [isPlaying, activeProject?.trimStartMs, activeProject?.trimEndMs, playbackSpeed]);

  // Project persistence helper
  const updateActiveProject = (updated: VideoProject) => {
    setActiveProject(updated);
    storage.saveProject(updated);
    setProjects(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  };

  // Playback handlers
  const handleTogglePlayback = () => setIsPlaying(prev => !prev);
  const handleSeek = (ms: number) => {
    if (!activeProject) return;
    const clamped = Math.max(activeProject.trimStartMs, Math.min(activeProject.trimEndMs, ms));
    setCurrentPlayheadMs(clamped);
  };

  // Trim handlers
  const handleUpdateTrim = (startMs: number, endMs: number) => {
    if (!activeProject) return;
    const validStart = Math.max(0, Math.min(startMs, activeProject.originalDurationMs - 1000));
    const validEnd = Math.max(validStart + 1000, Math.min(endMs, activeProject.originalDurationMs));
    const updated: VideoProject = {
      ...activeProject,
      trimStartMs: validStart,
      trimEndMs: validEnd,
      updatedAt: Date.now()
    };
    updateActiveProject(updated);
    setCurrentPlayheadMs(prev => Math.max(validStart, Math.min(validEnd, prev)));
  };

  const handleSetTrimStartToPlayhead = () => {
    if (!activeProject) return;
    if (currentPlayheadMs < activeProject.trimEndMs - 500) {
      handleUpdateTrim(currentPlayheadMs, activeProject.trimEndMs);
      showToast('Trim In point set to playhead!');
    }
  };

  const handleSetTrimEndToPlayhead = () => {
    if (!activeProject) return;
    if (currentPlayheadMs > activeProject.trimStartMs + 500) {
      handleUpdateTrim(activeProject.trimStartMs, currentPlayheadMs);
      showToast('Trim Out point set to playhead!');
    }
  };

  // Text overlay
  const handleUpdateTextOverlay = (
    text: string,
    colorHex: string,
    bgStyle: 'SOLID' | 'SEMI_TRANSPARENT' | 'OUTLINE' | 'NEON_GLOW',
    position: 'TOP' | 'CENTER' | 'BOTTOM',
    size: number
  ) => {
    if (!activeProject) return;
    const updated: VideoProject = {
      ...activeProject,
      overlayText: text,
      overlayTextColorHex: colorHex,
      overlayTextBgStyle: bgStyle,
      overlayTextPosition: position,
      overlayTextSize: size,
      updatedAt: Date.now()
    };
    updateActiveProject(updated);
  };

  // Meme update
  const handleUpdateMeme = (
    memeId: string,
    title: string,
    topText: string,
    bottomText: string,
    imageUri: string,
    position: MemePosition,
    startMs: number,
    endMs: number
  ) => {
    if (!activeProject) return;
    const updated: VideoProject = {
      ...activeProject,
      activeMemeId: memeId,
      memeTitle: title,
      memeTopText: topText,
      memeBottomText: bottomText,
      memeImageUri: imageUri,
      memePosition: position,
      memeStartMs: startMs,
      memeEndMs: Math.min(activeProject.originalDurationMs, endMs),
      updatedAt: Date.now()
    };
    updateActiveProject(updated);
    showToast(`Applied "${title}" meme to video timeline!`);
  };

  const handleRemoveMeme = () => {
    if (!activeProject) return;
    const updated: VideoProject = {
      ...activeProject,
      activeMemeId: null,
      memeTitle: null,
      memeTopText: null,
      memeBottomText: null,
      memeImageUri: null,
      updatedAt: Date.now()
    };
    updateActiveProject(updated);
    showToast('Removed meme overlay.');
  };

  // Media source background
  const handleUpdateBackgroundMedia = (
    uri: string,
    type: 'PHOTO' | 'VIDEO_CLIP' | 'GRADIENT',
    source: 'GOOGLE_PHOTOS' | 'GOOGLE_SEARCH' | 'SOCIAL_MEDIA' | 'LOCAL'
  ) => {
    if (!activeProject) return;
    const updated: VideoProject = {
      ...activeProject,
      backgroundMediaUri: uri,
      backgroundMediaType: type,
      backgroundMediaSource: source,
      updatedAt: Date.now()
    };
    updateActiveProject(updated);
    showToast(`Updated canvas background from ${source.replace('_', ' ')}`);
  };

  const handleImportMediaSourceAsAsset = (item: MediaSourceItem) => {
    const asset: MediaAsset = {
      id: 'asset_' + Date.now(),
      name: item.title,
      type: item.mediaType === 'PHOTO' ? 'IMAGE' : 'VIDEO',
      uri: item.sampleUri,
      durationMs: item.mediaType === 'PHOTO' ? 10000 : 20000,
      language: 'te',
      description: item.description,
      sampleTopic: item.tags.join(', ')
    };
    storage.addAsset(asset);
    setAssets(storage.getAssets());
    showToast(`Imported "${item.title}" into Asset Library!`);
  };

  // Audio levels
  const handleUpdateAudioLevels = (
    originalVolume: number,
    isMuted: boolean,
    voiceoverVolume: number,
    voiceClarity: boolean
  ) => {
    if (!activeProject) return;
    const updated: VideoProject = {
      ...activeProject,
      originalAudioVolume: originalVolume,
      isOriginalAudioMuted: isMuted,
      voiceoverVolume,
      voiceClarityEnhanced: voiceClarity,
      updatedAt: Date.now()
    };
    updateActiveProject(updated);
  };

  // Color filter
  const handleUpdateColorFilter = (filter: ColorFilterType, intensity: number) => {
    if (!activeProject) return;
    const updated: VideoProject = {
      ...activeProject,
      colorFilter: filter,
      filterIntensity: intensity,
      updatedAt: Date.now()
    };
    updateActiveProject(updated);
  };

  // Format / Aspect ratio
  const handleUpdateAspectRatio = (ratio: AspectRatio) => {
    if (!activeProject) return;
    const updated: VideoProject = {
      ...activeProject,
      aspectRatio: ratio,
      updatedAt: Date.now()
    };
    updateActiveProject(updated);
    showToast(`Reframed project for ${ratio}`);
  };

  // Gemini AI Social Kit
  const handleApplyAiKit = (kit: GeneratedSocialMediaKit) => {
    if (!activeProject) return;
    const updated: VideoProject = {
      ...activeProject,
      aiSummaryEn: kit.summaryEn,
      aiSummaryTe: kit.summaryTe,
      youtubeTitle: kit.youtubeTitle,
      youtubeDescription: kit.youtubeDescription,
      youtubeChapters: kit.youtubeChapters,
      instagramCaption: kit.instagramCaption,
      instagramHashtags: kit.instagramHashtags,
      tiktokHook: kit.tiktokHook,
      tiktokCaptions: kit.tiktokCaptions,
      brollSuggestions: kit.brollSuggestions,
      overlayText: activeProject.overlayText || kit.overlayTextSuggestion,
      updatedAt: Date.now()
    };
    updateActiveProject(updated);
    showToast('AI Generation complete! Saved to offline storage.');
  };

  // Export
  const handleExportComplete = (metadata: UserVideoMetadata) => {
    storage.addUserVideo(metadata);
    setUserVideos(storage.getUserVideos());
    if (activeProject) {
      updateActiveProject({ ...activeProject, isExported: true });
    }
    showToast('Video package saved to offline storage!');
  };

  // Delete project
  const handleDeleteProject = (proj: VideoProject) => {
    storage.deleteProject(proj.id);
    setProjects(storage.getProjects());
    if (activeProject?.id === proj.id) {
      setActiveProject(null);
      setIsPlaying(false);
    }
    showToast(`Deleted "${proj.title}"`);
  };

  // Delete user video
  const handleDeleteUserVideo = (id: string) => {
    storage.deleteUserVideo(id);
    setUserVideos(storage.getUserVideos());
    showToast('Removed video from offline storage.');
  };

  // Create project dialog callback
  const handleCreateProject = (
    title: string,
    durationSec: number,
    language: 'te' | 'en',
    aspectRatio: AspectRatio,
    notes: string
  ) => {
    const totalMs = durationSec * 1000;
    const newProject: VideoProject = {
      id: 'proj_' + Date.now(),
      title,
      videoUri: 'https://assets.mixkit.co/videos/preview/mixkit-modern-city-skyline-at-night-42845-large.mp4',
      audioUri: null,
      originalDurationMs: totalMs,
      trimStartMs: 0,
      trimEndMs: totalMs,
      aspectRatio,
      language,
      rawTopicNotes: notes,
      colorFilter: 'NONE',
      filterIntensity: 0.8,
      originalAudioVolume: 1.0,
      isOriginalAudioMuted: false,
      voiceoverVolume: 1.0,
      voiceClarityEnhanced: false,
      overlayText: '',
      overlayTextColorHex: '#38bdf8',
      overlayTextBgStyle: 'NEON_GLOW',
      overlayTextPosition: 'BOTTOM',
      overlayTextSize: 20,
      aiSummaryEn: '',
      aiSummaryTe: '',
      youtubeTitle: '',
      youtubeDescription: '',
      youtubeChapters: '',
      instagramCaption: '',
      instagramHashtags: '',
      tiktokHook: '',
      tiktokCaptions: '',
      brollSuggestions: '',
      audioSourceUri: null,
      audioTranscript: '',
      transcriptSegments: [],
      captionStyle: 'NEON',
      backgroundMediaUri: null,
      backgroundMediaType: 'GRADIENT',
      backgroundMediaSource: 'LOCAL',
      activeMemeId: null,
      memeTitle: null,
      memeTopText: null,
      memeBottomText: null,
      memeImageUri: null,
      memePosition: 'BOTTOM_RIGHT',
      memeStartMs: 0,
      memeEndMs: 0,
      isExported: false,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    storage.saveProject(newProject);
    setProjects(storage.getProjects());
    handleSelectProject(newProject);
    setShowCreateDialog(false);
    showToast(`Created project "${title}"!`);
  };

  // Create project from Audio Source
  const handleCreateAudioVideoProject = (
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
  ) => {
    const newProject: VideoProject = {
      id: 'proj_audio_' + Date.now(),
      title,
      videoUri: backgroundUri || 'https://assets.mixkit.co/videos/preview/mixkit-modern-city-skyline-at-night-42845-large.mp4',
      audioUri,
      originalDurationMs: durationMs,
      trimStartMs: 0,
      trimEndMs: durationMs,
      aspectRatio,
      language,
      rawTopicNotes: transcript,
      colorFilter: 'CYBERPUNK',
      filterIntensity: 0.7,
      originalAudioVolume: 1.0,
      isOriginalAudioMuted: false,
      voiceoverVolume: 1.2,
      voiceClarityEnhanced: true,
      overlayText: '',
      overlayTextColorHex: '#38bdf8',
      overlayTextBgStyle: 'NEON_GLOW',
      overlayTextPosition: 'BOTTOM',
      overlayTextSize: 22,
      aiSummaryEn: '',
      aiSummaryTe: '',
      youtubeTitle: '',
      youtubeDescription: '',
      youtubeChapters: '',
      instagramCaption: '',
      instagramHashtags: '',
      tiktokHook: '',
      tiktokCaptions: '',
      brollSuggestions: '',
      audioSourceUri: audioUri,
      audioTranscript: transcript,
      transcriptSegments: segments,
      captionStyle: 'NEON',
      backgroundMediaUri: backgroundUri,
      backgroundMediaType: backgroundType,
      backgroundMediaSource: backgroundSource,
      activeMemeId: null,
      memeTitle: null,
      memeTopText: null,
      memeBottomText: null,
      memeImageUri: null,
      memePosition: 'BOTTOM_RIGHT',
      memeStartMs: 0,
      memeEndMs: 0,
      isExported: false,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    storage.saveProject(newProject);
    setProjects(storage.getProjects());
    handleSelectProject(newProject);
    setShowAudioDialog(false);
    showToast('Audio-to-Video reel created with live transcription!');
  };

  // Create project from Meme template
  const handleCreateFromMeme = (meme: MemeAsset) => {
    const totalMs = 15000;
    const newProject: VideoProject = {
      id: 'proj_meme_' + Date.now(),
      title: `${meme.name} Reel`,
      videoUri: 'https://assets.mixkit.co/videos/preview/mixkit-modern-city-skyline-at-night-42845-large.mp4',
      audioUri: null,
      originalDurationMs: totalMs,
      trimStartMs: 0,
      trimEndMs: totalMs,
      aspectRatio: '9:16',
      language: 'te',
      rawTopicNotes: `${meme.defaultTopText} - ${meme.defaultBottomText}`,
      colorFilter: 'VIBRANT',
      filterIntensity: 0.8,
      originalAudioVolume: 1.0,
      isOriginalAudioMuted: false,
      voiceoverVolume: 1.0,
      voiceClarityEnhanced: false,
      overlayText: '',
      overlayTextColorHex: '#ffffff',
      overlayTextBgStyle: 'SOLID',
      overlayTextPosition: 'BOTTOM',
      overlayTextSize: 20,
      aiSummaryEn: '',
      aiSummaryTe: '',
      youtubeTitle: '',
      youtubeDescription: '',
      youtubeChapters: '',
      instagramCaption: '',
      instagramHashtags: '',
      tiktokHook: '',
      tiktokCaptions: '',
      brollSuggestions: '',
      audioSourceUri: null,
      audioTranscript: '',
      transcriptSegments: [],
      captionStyle: 'POP_IN',
      backgroundMediaUri: null,
      backgroundMediaType: 'GRADIENT',
      backgroundMediaSource: 'LOCAL',
      activeMemeId: meme.id,
      memeTitle: meme.name,
      memeTopText: meme.defaultTopText,
      memeBottomText: meme.defaultBottomText,
      memeImageUri: meme.imageUrl,
      memePosition: 'BOTTOM_RIGHT',
      memeStartMs: 0,
      memeEndMs: totalMs,
      isExported: false,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    storage.saveProject(newProject);
    setProjects(storage.getProjects());
    handleSelectProject(newProject);
    showToast(`Created video with ${meme.name}!`);
  };

  // Create project from Asset
  const handleCreateFromAsset = (asset: MediaAsset) => {
    const title = asset.name.replace(/\.[^/.]+$/, '');
    const newProject: VideoProject = {
      id: 'proj_asset_' + Date.now(),
      title,
      videoUri: asset.type === 'VIDEO' ? asset.uri : 'https://assets.mixkit.co/videos/preview/mixkit-modern-city-skyline-at-night-42845-large.mp4',
      audioUri: asset.type === 'AUDIO' || asset.type === 'VOICEOVER' ? asset.uri : null,
      originalDurationMs: asset.durationMs,
      trimStartMs: 0,
      trimEndMs: asset.durationMs,
      aspectRatio: asset.type === 'VIDEO' ? '9:16' : '16:9',
      language: asset.language,
      rawTopicNotes: asset.description || asset.sampleTopic,
      colorFilter: 'NONE',
      filterIntensity: 0.8,
      originalAudioVolume: 1.0,
      isOriginalAudioMuted: false,
      voiceoverVolume: 1.0,
      voiceClarityEnhanced: false,
      overlayText: '',
      overlayTextColorHex: '#38bdf8',
      overlayTextBgStyle: 'NEON_GLOW',
      overlayTextPosition: 'BOTTOM',
      overlayTextSize: 20,
      aiSummaryEn: '',
      aiSummaryTe: '',
      youtubeTitle: '',
      youtubeDescription: '',
      youtubeChapters: '',
      instagramCaption: '',
      instagramHashtags: '',
      tiktokHook: '',
      tiktokCaptions: '',
      brollSuggestions: '',
      audioSourceUri: asset.type === 'AUDIO' ? asset.uri : null,
      audioTranscript: '',
      transcriptSegments: [],
      captionStyle: 'NEON',
      backgroundMediaUri: null,
      backgroundMediaType: 'GRADIENT',
      backgroundMediaSource: 'LOCAL',
      activeMemeId: null,
      memeTitle: null,
      memeTopText: null,
      memeBottomText: null,
      memeImageUri: null,
      memePosition: 'BOTTOM_RIGHT',
      memeStartMs: 0,
      memeEndMs: 0,
      isExported: false,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    storage.saveProject(newProject);
    setProjects(storage.getProjects());
    handleSelectProject(newProject);
    showToast(`Created project "${title}" from asset!`);
  };

  const handleAddCustomAsset = (
    name: string,
    type: 'VIDEO' | 'IMAGE' | 'AUDIO' | 'VOICEOVER',
    uri: string,
    durationMs: number,
    language: 'te' | 'en',
    desc: string
  ) => {
    const asset: MediaAsset = {
      id: 'asset_' + Date.now(),
      name,
      type,
      uri,
      durationMs,
      language,
      description: desc,
      sampleTopic: desc
    };
    storage.addAsset(asset);
    setAssets(storage.getAssets());
    showToast(`Imported ${name} into Asset Library!`);
  };

  // Google sign in / sign out simulation
  const handleSignIn = () => {
    const mockUser = {
      email: 'creator@omnivideo.studio',
      name: 'Omni Creator'
    };
    storage.setUser(mockUser);
    setUser(mockUser);
    setShowAccountDialog(false);
    showToast('Signed in with Google!');
  };

  const handleSignOut = () => {
    storage.setUser(null);
    setUser(null);
    setShowAccountDialog(false);
    showToast('Signed out. Continuing in offline Try Mode.');
  };

  const EDITOR_TABS: Array<{ id: EditorTab; label: string; icon: React.ReactNode }> = [
    { id: 'TRIM', label: 'Trim', icon: <Scissors className="w-4 h-4" /> },
    { id: 'TEXT', label: 'Text Overlay', icon: <Type className="w-4 h-4" /> },
    { id: 'MEMES', label: 'Memes', icon: <Smile className="w-4 h-4" /> },
    { id: 'MEDIA', label: 'Media Sources', icon: <Globe className="w-4 h-4" /> },
    { id: 'AUDIO', label: 'Audio Levels', icon: <Volume2 className="w-4 h-4" /> },
    { id: 'FILTERS', label: 'Filters', icon: <Sliders className="w-4 h-4" /> },
    { id: 'FORMAT', label: 'Format', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'AI_SUITE', label: 'AI Suite', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'SHARE', label: 'Share & Export', icon: <Share2 className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-indigo-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl border border-indigo-400 flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-cyan-300" />
          {toastMessage}
        </div>
      )}

      {/* Global App Header */}
      <Header
        user={user}
        onOpenAccount={() => setShowAccountDialog(true)}
        onNavigateHome={() => setActiveProject(null)}
        isEditor={Boolean(activeProject)}
        projectTitle={activeProject?.title}
      />

      {/* MAIN VIEW: EDITOR OR HOME */}
      {activeProject ? (
        /* ==================== VIDEO EDITOR SCREEN ==================== */
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-5">
          {/* Top Bar with Project Info & Back button */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-3.5">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setActiveProject(null);
                  setIsPlaying(false);
                }}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Back to Projects"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h2 className="font-black text-white text-base leading-snug line-clamp-1">
                  {activeProject.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <span className="font-mono text-cyan-400 font-semibold">{activeProject.aspectRatio}</span>
                  <span>•</span>
                  <span>{((activeProject.trimEndMs - activeProject.trimStartMs) / 1000).toFixed(1)}s</span>
                  <span>•</span>
                  <span className="text-amber-400 font-semibold">
                    {activeProject.language === 'te' ? 'Telugu (తెలుగు)' : 'English'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('SHARE')}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 hover:opacity-90 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
              >
                <Share2 className="w-3.5 h-3.5" /> Export Reel
              </button>
            </div>
          </div>

          {/* Interactive Live Video Preview Canvas */}
          <VideoPreviewCanvas
            project={activeProject}
            currentPlayheadMs={currentPlayheadMs}
            isPlaying={isPlaying}
            playbackSpeed={playbackSpeed}
            onTogglePlayback={handleTogglePlayback}
            onSeek={handleSeek}
            onSpeedChange={setPlaybackSpeed}
          />

          {/* Editor Tool Tabs Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800/80">
            {EDITOR_TABS.map(tab => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? tab.id === 'AI_SUITE'
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                        : 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Active Tool Sub-Panel */}
          <div>
            {activeTab === 'TRIM' && (
              <TrimToolSection
                project={activeProject}
                currentPlayheadMs={currentPlayheadMs}
                onUpdateTrim={handleUpdateTrim}
                onSetTrimStartToPlayhead={handleSetTrimStartToPlayhead}
                onSetTrimEndToPlayhead={handleSetTrimEndToPlayhead}
              />
            )}
            {activeTab === 'TEXT' && (
              <TextOverlayToolSection
                project={activeProject}
                onUpdateTextOverlay={handleUpdateTextOverlay}
              />
            )}
            {activeTab === 'MEMES' && (
              <MemeStudioSection
                project={activeProject}
                onUpdateMeme={handleUpdateMeme}
                onRemoveMeme={handleRemoveMeme}
              />
            )}
            {activeTab === 'MEDIA' && (
              <MediaSourcingSection
                project={activeProject}
                onUpdateBackgroundMedia={handleUpdateBackgroundMedia}
                onImportAsAsset={handleImportMediaSourceAsAsset}
              />
            )}
            {activeTab === 'AUDIO' && (
              <AudioLevelsToolSection
                project={activeProject}
                onUpdateAudioLevels={handleUpdateAudioLevels}
              />
            )}
            {activeTab === 'FILTERS' && (
              <FilterToolSection
                project={activeProject}
                onUpdateColorFilter={handleUpdateColorFilter}
              />
            )}
            {activeTab === 'FORMAT' && (
              <FormatToolSection
                project={activeProject}
                onUpdateAspectRatio={handleUpdateAspectRatio}
              />
            )}
            {activeTab === 'AI_SUITE' && (
              <AiSuiteSection
                project={activeProject}
                onApplyAiKit={handleApplyAiKit}
                onApplyOverlayText={text => handleUpdateTextOverlay(text, activeProject.overlayTextColorHex, activeProject.overlayTextBgStyle, activeProject.overlayTextPosition, activeProject.overlayTextSize)}
              />
            )}
            {activeTab === 'SHARE' && (
              <ExportShareSection
                project={activeProject}
                onExportComplete={handleExportComplete}
              />
            )}
          </div>
        </main>
      ) : (
        /* ==================== HOME SCREEN ==================== */
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
          {/* Welcome Studio Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 border border-indigo-800/40 p-6 sm:p-8 shadow-2xl">
            <div className="relative z-10 max-w-2xl space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-900/60 border border-indigo-500/30 text-cyan-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" /> Next-Gen Multilingual Video Studio
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Create Viral Reels & Shorts in{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
                  Telugu & English
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Transform raw ideas, audio podcasts, and Telugu memes into high-retention 9:16 reels, YouTube widescreen videos, and TikTok hooks with automated AI summaries, live captions, and offline persistence.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setShowAudioDialog(true)}
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-90 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
                >
                  <Music className="w-4 h-4" /> Audio to Video Studio
                </button>
                <button
                  onClick={() => setShowCreateDialog(true)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold border border-slate-700 flex items-center gap-2 transition-all"
                >
                  <Plus className="w-4 h-4 text-indigo-400" /> New Video Project
                </button>
              </div>
            </div>

            {/* Ambient background glow */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-600/20 to-transparent pointer-events-none" />
          </div>

          {/* Home Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            {[
              { id: 0, label: `Projects (${projects.length})`, icon: Film },
              { id: 1, label: `Saved Videos (${userVideos.length})`, icon: VideoIcon },
              { id: 2, label: `Telugu Memes (5)`, icon: Smile },
              { id: 3, label: `Asset Library (${assets.length})`, icon: FolderOpen }
            ].map(tab => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setHomeTabIndex(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    homeTabIndex === tab.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Home Content Sections */}
          <div>
            {homeTabIndex === 0 && (
              <ProjectsListSection
                projects={projects}
                onSelectProject={handleSelectProject}
                onDeleteProject={handleDeleteProject}
              />
            )}
            {homeTabIndex === 1 && (
              <OfflineVideosSection
                userVideos={userVideos}
                onDeleteVideo={handleDeleteUserVideo}
              />
            )}
            {homeTabIndex === 2 && (
              <HomeScreenMemeHub onCreateProjectWithMeme={handleCreateFromMeme} />
            )}
            {homeTabIndex === 3 && (
              <AssetLibrarySection
                assets={assets}
                onCreateProjectFromAsset={handleCreateFromAsset}
                onAddCustomAsset={handleAddCustomAsset}
              />
            )}
          </div>
        </main>
      )}

      {/* DIALOG MODALS */}
      {showCreateDialog && (
        <CreateProjectDialog
          onDismiss={() => setShowCreateDialog(false)}
          onCreate={handleCreateProject}
        />
      )}

      {showAudioDialog && (
        <AudioToVideoDialog
          onDismiss={() => setShowAudioDialog(false)}
          onCreateAudioVideoProject={handleCreateAudioVideoProject}
        />
      )}

      {showAccountDialog && (
        <AccountDialog
          user={user}
          onDismiss={() => setShowAccountDialog(false)}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
        />
      )}
    </div>
  );
}

export default App;
