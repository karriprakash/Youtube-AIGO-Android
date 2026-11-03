import { VideoProject, MediaAsset, MemeAsset, MediaSourceItem, UserVideoMetadata } from '../types';

export const SEED_MEMES: MemeAsset[] = [
  {
    id: 'brahmi_shocked',
    name: 'Brahmanandam Shock',
    category: 'Brahmi / Ali Classics',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=60',
    defaultTopText: 'AI Video Editor lo Telugu Support unte..',
    defaultBottomText: 'Mundu choopante idi ra!',
    tags: ['brahmi', 'shock', 'funny', 'telugu']
  },
  {
    id: 'ali_reaction',
    name: 'Ali Comedy Reaction',
    category: 'Telugu Film',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=60',
    defaultTopText: 'When Video Exports in 4K Instantly',
    defaultBottomText: 'Chitti robo kante fast ga undi!',
    tags: ['ali', 'reaction', 'comedy']
  },
  {
    id: 'venky_victory',
    name: 'Venky Victory Smile',
    category: 'Telugu Film',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60',
    defaultTopText: '100K Views on Telugu Reel',
    defaultBottomText: 'Success ra babu!',
    tags: ['venkatesh', 'victory', 'happy']
  },
  {
    id: 'tech_geek_mindblown',
    name: 'AI Mind Blown',
    category: 'Trending Tech',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60',
    defaultTopText: 'Voice to Reel in 5 Seconds',
    defaultBottomText: 'The Future is OmniVideo!',
    tags: ['tech', 'mindblown', 'ai', 'viral']
  },
  {
    id: 'social_creator_hype',
    name: 'Viral Creator Hype',
    category: 'Reaction',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60',
    defaultTopText: 'YouTube Shorts + Insta Reels',
    defaultBottomText: 'Single Click Multi-Format Export!',
    tags: ['hype', 'creator', 'viral']
  }
];

export const SEED_MEDIA_SOURCES: MediaSourceItem[] = [
  {
    id: 'source_hyderabad_drone',
    title: 'Hyderabad Cyber Towers 4K Drone',
    source: 'GOOGLE_SEARCH',
    mediaType: 'VIDEO',
    thumbnailUrl: 'https://images.unsplash.com/photo-1572455044327-7348c1be7267?w=500&auto=format&fit=crop&q=60',
    sampleUri: 'https://assets.mixkit.co/videos/preview/mixkit-modern-city-skyline-at-night-42845-large.mp4',
    description: 'Dynamic aerial perspective ideal for tech explainer reels and business videos.',
    tags: ['hyderabad', 'tech', 'city', 'drone']
  },
  {
    id: 'source_andhra_coastal',
    title: 'Vizag RK Beach Sunset Waves',
    source: 'GOOGLE_PHOTOS',
    mediaType: 'PHOTO',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60',
    sampleUri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
    description: 'Calm ambient waves suitable for Telugu poetry, podcast snippets, and relaxation reels.',
    tags: ['vizag', 'beach', 'sunset', 'nature']
  },
  {
    id: 'source_studio_podcast',
    title: 'Modern Neon Podcast Studio',
    source: 'SOCIAL_MEDIA',
    mediaType: 'PHOTO',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&auto=format&fit=crop&q=60',
    sampleUri: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&auto=format&fit=crop&q=80',
    description: 'Professional mic and acoustic foam background for audio-to-video narration.',
    tags: ['podcast', 'microphone', 'studio', 'neon']
  },
  {
    id: 'source_cyberpunk_traffic',
    title: 'Cyberpunk Neon City Lights',
    source: 'GOOGLE_SEARCH',
    mediaType: 'VIDEO',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=500&auto=format&fit=crop&q=60',
    sampleUri: 'https://assets.mixkit.co/videos/preview/mixkit-fast-traffic-lights-at-night-42844-large.mp4',
    description: 'High energy night traffic for viral tech hooks, fast-paced editing, and Shorts.',
    tags: ['neon', 'cyberpunk', 'traffic', 'speed']
  }
];

export const SEED_ASSETS: MediaAsset[] = [
  {
    id: 'asset_1',
    name: 'Telugu_Tech_AI_Review.mp4',
    type: 'VIDEO',
    uri: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-laptop-keyboard-4066-large.mp4',
    durationMs: 30000,
    language: 'te',
    description: 'Telugu gadget review discussing next-gen AI smartphones and productivity tips.',
    sampleTopic: 'భారతదేశంలో బెస్ట్ AI స్మార్ట్‌ఫోన్స్ మరియు కెమెరా ఫీచర్లు.'
  },
  {
    id: 'asset_2',
    name: 'Viral_Telugu_Podcast_Snippet.mp3',
    type: 'AUDIO',
    uri: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
    durationMs: 25000,
    language: 'te',
    description: 'Energetic discussion on startup success, self-motivation, and Telugu entrepreneurship.',
    sampleTopic: 'విజయం సాధించాలంటే ప్రతిరోజూ క్రమశిక్షణ ఎందుకు ముఖ్యమో తెలుసా?'
  },
  {
    id: 'asset_3',
    name: 'LoFi_Chill_Beats_Hyderabad.mp3',
    type: 'AUDIO',
    uri: 'https://actions.google.com/sounds/v1/science_fiction/ambient_hum.ogg',
    durationMs: 45000,
    language: 'en',
    description: 'Smooth background melodic beats balanced for narration without overpowering speech.',
    sampleTopic: 'Relaxing ambient background track for YouTube and Instagram reels.'
  },
  {
    id: 'asset_4',
    name: 'Brahmi_Reaction_Meme.png',
    type: 'IMAGE',
    uri: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=60',
    durationMs: 15000,
    language: 'te',
    description: 'Iconic comedy reaction template used for viral Telugu punchlines.',
    sampleTopic: 'Reaction meme for humorous video segments.'
  }
];

export const SEED_PROJECTS: VideoProject[] = [
  {
    id: 'proj_telugu_ai_revolution',
    title: 'AI Video Editing in Telugu 🚀',
    videoUri: 'https://assets.mixkit.co/videos/preview/mixkit-modern-city-skyline-at-night-42845-large.mp4',
    audioUri: null,
    originalDurationMs: 28000,
    trimStartMs: 2000,
    trimEndMs: 24000,
    aspectRatio: '9:16',
    language: 'te',
    rawTopicNotes: 'ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ తో తెలుగు కంటెంట్ క్రియేటర్స్ వీడియోలు ఎలా ఎడిట్ చేయవచ్చో చూద్దాం. ఆటో క్యాప్షన్స్, వైరల్ టైటిల్స్ మరియు సోషల్ మీడియా ప్యాకేజ్!',
    colorFilter: 'CYBERPUNK',
    filterIntensity: 0.85,
    originalAudioVolume: 1.0,
    isOriginalAudioMuted: false,
    voiceoverVolume: 1.2,
    voiceClarityEnhanced: true,
    overlayText: '🔥 AI తో తెలుగు వీడియోలు క్షణాల్లో!',
    overlayTextColorHex: '#38bdf8',
    overlayTextBgStyle: 'NEON_GLOW',
    overlayTextPosition: 'BOTTOM',
    overlayTextSize: 22,
    aiSummaryEn: '• Complete step-by-step walkthrough of AI video workflow tailored for regional creators.\n• Demonstrates Telugu caption generation and multi-platform aspect ratio conversion.\n• Optimized for Instagram Reels (9:16) with fast-paced cuts.',
    aiSummaryTe: '• తెలుగు కంటెంట్ క్రియేటర్ల కోసం అత్యాధునిక AI వీడియో టూల్స్ పూర్తి వివరణ.\n• ఆటోమేటిక్ తెలుగు సబ్‌టైటిల్స్ మరియు మల్టీ-ప్లాట్‌ఫార్మ్ ఎడిటింగ్ సులభం.\n• యూట్యూబ్ షార్ట్స్ మరియు ఇన్‌స్టాగ్రామ్ రీల్స్ కోసం అద్భుతంగా రూపొందించబడింది.',
    youtubeTitle: 'AI తో తెలుగు వీడియోలు క్షణాల్లో ఎడిట్ చేయండి | OmniVideo Telugu Tutorial',
    youtubeDescription: 'ఈ వీడియోలో ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ ఉపయోగించి తెలుగులో వీడియోలను సులభంగా ఎలా రూపొందించాలో చూపిస్తున్నాము.\n\n00:00 - పరిచయం\n00:05 - AI వీడియో ఫీచర్లు\n00:14 - తెలుగు క్యాప్షన్స్ మరియు ఎడిటింగ్\n00:22 - సోషల్ మీడియా ఎక్స్‌పోర్ట్\n\n#OmniVideo #TeluguTech #ContentCreation #AI',
    youtubeChapters: '00:00 Intro\n00:05 AI Editing Tools\n00:14 Telugu Subtitles\n00:22 Social Export',
    instagramCaption: 'మీరు కూడా AI తో వీడియోలు క్రియేట్ చేయాలనుకుంటున్నారా? 🔥 Watch till the end! లైక్ & షేర్ చేయండి.\n\nSave this reel for later! 📌',
    instagramHashtags: '#TeluguReels #TeluguCreators #OmniVideo #TechInTelugu #TeluguTech #ViralShorts #InstaTelugu #ContentCreation',
    tiktokHook: 'ఇది మీకు తెలుసా? ఇకపై వీడియో ఎడిటింగ్ చాలా సులభం!',
    tiktokCaptions: 'Next-gen AI Video Studio! 🚀 #Telugu #Tech #fyp #viral #omnivideo',
    brollSuggestions: '00:00 Wide city night shot\n00:06 Screen recording of AI prompt input\n00:15 Dynamic zoom on Telugu captions',
    audioSourceUri: null,
    audioTranscript: 'ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ తో తెలుగు క్రియేటర్లు అద్భుతాలు సృష్టిస్తున్నారు. మీ ఆలోచనలను నేరుగా వీడియోగా మార్చుకోండి.',
    transcriptSegments: [
      { startMs: 2000, endMs: 8000, text: 'ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ తో తెలుగు క్రియేటర్లు' },
      { startMs: 8000, endMs: 15000, text: 'అద్భుతాలు సృష్టిస్తున్నారు!' },
      { startMs: 15000, endMs: 24000, text: 'మీ ఆలోచనలను నేరుగా వీడియోగా మార్చుకోండి.' }
    ],
    captionStyle: 'NEON',
    backgroundMediaUri: 'https://images.unsplash.com/photo-1572455044327-7348c1be7267?w=1200&auto=format&fit=crop&q=80',
    backgroundMediaType: 'PHOTO',
    backgroundMediaSource: 'GOOGLE_SEARCH',
    activeMemeId: 'brahmi_shocked',
    memeTitle: 'Brahmanandam Shock',
    memeTopText: 'AI Video Editor lo Telugu unte..',
    memeBottomText: 'Mundu choopante idi!',
    memeImageUri: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=60',
    memePosition: 'BOTTOM_RIGHT',
    memeStartMs: 4000,
    memeEndMs: 18000,
    isExported: false,
    createdAt: Date.now() - 3600000,
    updatedAt: Date.now() - 600000
  },
  {
    id: 'proj_hyderabad_food_guide',
    title: 'Top 5 Hyderabad Biryani Spots 🍲',
    videoUri: 'https://assets.mixkit.co/videos/preview/mixkit-fast-traffic-lights-at-night-42844-large.mp4',
    audioUri: null,
    originalDurationMs: 32000,
    trimStartMs: 0,
    trimEndMs: 30000,
    aspectRatio: '16:9',
    language: 'te',
    rawTopicNotes: 'హైదరాబాద్ లో బెస్ట్ బిర్యానీ స్పాట్స్: ప్యారడైజ్, బావర్చి, షాదాబ్, కేఫ్ బహార్, మెహఫిల్. రుచి మరియు స్పెషల్ మసాలాల సీక్రెట్!',
    colorFilter: 'WARM',
    filterIntensity: 0.7,
    originalAudioVolume: 1.0,
    isOriginalAudioMuted: false,
    voiceoverVolume: 1.0,
    voiceClarityEnhanced: false,
    overlayText: 'హైదరాబాద్ బిర్యానీ లవర్స్ కోసం!',
    overlayTextColorHex: '#f59e0b',
    overlayTextBgStyle: 'SOLID',
    overlayTextPosition: 'TOP',
    overlayTextSize: 20,
    aiSummaryEn: '• Curated culinary journey across iconic Hyderabad authentic biryani hubs.\n• Key spice notes, dum cooking secrets, and historical heritage.\n• Optimized for YouTube 16:9 widescreen viewers.',
    aiSummaryTe: '• హైదరాబాద్ ప్రసిద్ధ బిర్యానీ కేంద్రాల సమగ్ర సమీక్ష మరియు ప్రత్యేకతలు.\n• దమ్ బిర్యానీ ఘుమఘుమలు మరియు తయారీ రహస్యాలు.\n• యూట్యూబ్ ఫుల్ HD వీడియో కోసం ప్రత్యేకంగా రూపుదిద్దుకుంది.',
    youtubeTitle: 'హైదరాబాద్ బెస్ట్ దమ్ బిర్యానీ ఎక్కడ దొరుకుతుంది? | Hyderabad Food Guide',
    youtubeDescription: 'హైదరాబాద్ అంటేనే గుర్తొచ్చేది ఘుమఘుమలాడే దమ్ బిర్యానీ! ఈ వీడియోలో టాప్ ఫుడ్ స్పాట్స్ చూద్దాం.\n\n#HyderabadBiryani #FoodVlog #TeluguFood',
    youtubeChapters: '00:00 Intro\n00:06 Bawarchi & Shadab\n00:18 Taste Test\n00:28 Final Verdict',
    instagramCaption: 'Biryani lovers unite! 🤤 కామెంట్ చేయండి మీ ఫేవరెట్ బిర్యానీ స్పాట్ ఏది? #Hyderabadi',
    instagramHashtags: '#HyderabadBiryani #FoodieTelugu #HyderabadFoodie #TeluguFood #InstaFood #BiryaniLove',
    tiktokHook: 'హైదరాబాద్ లో అసలైన దమ్ బిర్యానీ ఎక్కడ దొరుకుతుందో తెలుసా?',
    tiktokCaptions: 'Authentic Hyderabadi Biryani Tour! 🤤 #foodie #hyderabad #fyp',
    brollSuggestions: '00:00 Steaming biryani handi opening\n00:10 Slow motion saffron rice serving\n00:20 Customer genuine tasting reaction',
    audioSourceUri: null,
    audioTranscript: '',
    transcriptSegments: [],
    captionStyle: 'CINEMATIC',
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
    createdAt: Date.now() - 7200000,
    updatedAt: Date.now() - 3600000
  }
];

export const SEED_USER_VIDEOS: UserVideoMetadata[] = [
  {
    id: 'vid_1',
    projectTitle: 'AI Video Editing in Telugu 🚀',
    localFilePath: '/storage/emulated/0/Movies/OmniVideo/Telugu_AI_Reel_1080x1920.mp4',
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000,
    durationMs: 22000,
    fileSizeBytes: 28400000,
    resolution: '1080x1920',
    aspectRatio: '9:16',
    mimeType: 'video/mp4',
    isSynced: true,
    tags: 'Telugu, AI, Instagram',
    notes: '🔥 AI తో తెలుగు వీడియోలు క్షణాల్లో!'
  }
];
