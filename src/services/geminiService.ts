import { GeneratedSocialMediaKit } from '../types';

export class GeminiVideoAiService {
  async generateMultiFormatContent(
    projectTitle: String,
    rawNotesOrTranscript: String,
    languagePreference: 'te' | 'en' | 'auto',
    aspectRatio: string,
    durationSeconds: number
  ): Promise<GeneratedSocialMediaKit> {
    const topic = (rawNotesOrTranscript || projectTitle || '').trim();
    const isTelugu =
      languagePreference === 'te' ||
      /[\u0C00-\u0C7F]/.test(topic) ||
      /[\u0C00-\u0C7F]/.test(projectTitle.toString());

    // Check if an API key is provided in Vite env
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const prompt = `You are an expert viral video producer and multilingual content strategist specializing in Telugu and English digital video content for YouTube, Instagram, and TikTok.

VIDEO PROJECT DETAILS:
- Working Title: ${projectTitle}
- Raw Audio/Video Content Notes or Spoken Transcript: ${topic}
- Target Duration: ${durationSeconds}s
- Primary Format: ${aspectRatio}
- Preferred Spoken Language: ${isTelugu ? 'Telugu (తెలుగు)' : 'English / Bilingual'}

YOUR MISSION:
1. Extract the core essence and highlights. Create bullet points in English (summaryEn) AND in authentic Telugu script (summaryTe).
2. Generate tailored social media packages:
   - YouTube: bilingual title, full description with timestamps/chapters.
   - Instagram (Reels): high-retention hook, emotional connect, call-to-action, 12+ hashtags.
   - TikTok: ultra-punchy 3-second hook, trending tags.
   - B-roll & Pacing Tips: Suggestions on when to cut, zoom, or insert b-roll.
   - Suggested on-screen Overlay Text: Punchy banner text in 2-5 words.

Return ONLY a strict JSON object with these keys:
{
  "summaryEn": "...",
  "summaryTe": "...",
  "youtubeTitle": "...",
  "youtubeDescription": "...",
  "youtubeChapters": "...",
  "instagramCaption": "...",
  "instagramHashtags": "...",
  "tiktokHook": "...",
  "tiktokCaptions": "...",
  "brollSuggestions": "...",
  "overlayTextSuggestion": "..."
}`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                responseMimeType: 'application/json'
              }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsed = JSON.parse(rawText);
            return {
              summaryEn: parsed.summaryEn || 'Key highlights generated from video content.',
              summaryTe: parsed.summaryTe || 'వీడియో నుండి ముఖ్యమైన ముఖ్యాంశాలు.',
              youtubeTitle: parsed.youtubeTitle || `${projectTitle} | 4K Highlights`,
              youtubeDescription: parsed.youtubeDescription || 'Full video overview and chapters.',
              youtubeChapters: parsed.youtubeChapters || '00:00 Intro\n00:08 Highlights\n00:20 Conclusion',
              instagramCaption: parsed.instagramCaption || 'Watch till the end! 🔥 Comment below.',
              instagramHashtags: parsed.instagramHashtags || '#OmniVideo #TeluguReels #Trending',
              tiktokHook: parsed.tiktokHook || 'Wait till you see what happens here!',
              tiktokCaptions: parsed.tiktokCaptions || 'Check this out! #fyp #viral #trending',
              brollSuggestions: parsed.brollSuggestions || '00:00 Wide shot\n00:08 Dynamic zoom',
              overlayTextSuggestion: parsed.overlayTextSuggestion || '🔥 Watch Till The End!'
            };
          }
        }
      } catch (err) {
        console.warn('Gemini API call failed, falling back to local intelligence generator:', err);
      }
    }

    // Local Intelligent Fallback (matching Android Kotlin implementation)
    return this.createLocalIntelligenceFallback(
      projectTitle.toString(),
      topic,
      isTelugu,
      aspectRatio
    );
  }

  private createLocalIntelligenceFallback(
    projectTitle: string,
    topic: string,
    isTelugu: boolean,
    aspectRatio: string
  ): GeneratedSocialMediaKit {
    const summaryEn = `• Key Highlights: ${projectTitle}
• Core Essence: ${topic.slice(0, 140)}
• Format: Tailored for ${aspectRatio} video display with optimized social pacing
• Clear actionable takeaway for social viewers`;

    const summaryTe = isTelugu
      ? `• ముఖ్య ముఖ్యాంశాలు: ${projectTitle}
• ప్రధాన సారాంశం: ${topic.slice(0, 140)}
• అనుకూల ఫార్మాట్: ${aspectRatio} తో సోషల్ మీడియా కోసం సిద్ధం చేయబడింది
• వీక్షకులను ఆకట్టుకునే సంక్షిప్త వివరణ మరియు స్పష్టమైన తెలుగు ముఖ్యాంశాలు`
      : `• ముఖ్య ముఖ్యాంశాలు (తెలుగు అనువాదం): ${projectTitle}
• ఈ వీడియోలో చూపించిన ప్రధానాంశాలు స్పష్టంగా పొందుపరచబడ్డాయి.
• సోషల్ మీడియా కోసం సిద్ధం చేయబడిన ప్రత్యేక వివరణ.`;

    const ytTitle = isTelugu
      ? `${projectTitle} | పూర్తి వివరాలు (Telugu Video)`
      : `${projectTitle} | Complete Breakdown & Highlights`;

    const ytDesc = `Full breakdown of ${projectTitle}. Watch till the end for key takeaways!

Timeline Chapters:
00:00 - Introduction & Overview
00:08 - Key Highlights & Demonstration
00:18 - Important Tips & Takeaways
00:24 - Conclusion & Next Steps

#Trending #OmniVideo #ContentCreation #VideoEditing`;

    const igCaption = isTelugu
      ? `వీడియో నచ్చితే తప్పకుండా లైక్ మరియు షేర్ చేయండి! 🔥 మీ అభిప్రాయాన్ని కామెంట్ చేయండి.\n\nSave this reel for later! 📌`
      : `Watch till the end! 🔥 Double tap if you found this valuable. Drop your thoughts below!\n\nSave this reel for later! 📌`;

    const tags = isTelugu
      ? `#TeluguReels #TeluguContent #TrendingReels #TeluguCreators #ViralVideo #InstaTelugu #ReelsIndia #OmniVideo`
      : `#ViralVideo #ContentCreator #ReelsInstagram #Shorts #TrendingNow #DailyVideo #VideoEditing #OmniVideo`;

    const hook = isTelugu
      ? `ఇది మీకు తెలుసా? ఈ వీడియోని అస్సలు మిస్ అవ్వకండి:`
      : `Wait till you see what happens here! Watch this:`;

    const ttCaption = `${projectTitle} 🚀 #fyp #viral #trending #video #OmniVideo`;
    const broll = `00:00 Opening wide establishing shot\n00:06 Dynamic zoom-in on subject\n00:15 Quick B-roll cut illustrating key point`;
    const overlay = isTelugu ? '🔥 తప్పక చూడండి!' : '🔥 Watch Till The End!';

    return {
      summaryEn,
      summaryTe,
      youtubeTitle: ytTitle,
      youtubeDescription: ytDesc,
      youtubeChapters: '00:00 Intro\n00:08 Highlights\n00:18 Tips\n00:24 Conclusion',
      instagramCaption: igCaption,
      instagramHashtags: tags,
      tiktokHook: hook,
      tiktokCaptions: ttCaption,
      brollSuggestions: broll,
      overlayTextSuggestion: overlay
    };
  }
}

export const geminiVideoAi = new GeminiVideoAiService();
