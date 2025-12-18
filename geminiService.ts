
import { GoogleGenAI, Modality, Type } from "@google/genai";

// Standard Base64 decode function as per guidelines
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Standard Audio decode function for raw PCM as per guidelines
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCategoryWords = async (categoryName: string) => {
  const ai = getAI();
  try {
    const isToeic = categoryName.includes('托业') || categoryName.toLowerCase().includes('toeic');
    const sourceGuide = isToeic ? "请务必参考新东方教育集团编写的《托业词汇》词书，选择其中最具代表性的职场与商务核心单词。" : "";

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `你是一个专业的英语教育专家。请随机生成 10 个适合“${categoryName}”水平的英语单词。
      ${sourceGuide}
      
      要求：
      1. 单词应具有代表性且常用。
      2. 提供准确的音标（IPA）、简洁的中文释义。
      3. 提供一个高质量的英文例句及其对应的中文翻译，例句应贴合实际考试或使用场景。
      
      请以 JSON 数组格式返回，包含以下字段：word, phonetic, definition, example_en, example_zh。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              word: { type: Type.STRING },
              phonetic: { type: Type.STRING },
              definition: { type: Type.STRING },
              example_en: { type: Type.STRING },
              example_zh: { type: Type.STRING },
            },
            required: ["word", "phonetic", "definition", "example_en", "example_zh"],
          },
        },
      },
    });

    const words = JSON.parse(response.text || '[]');
    return words.map((w: any) => ({
      ...w,
      id: Math.random().toString(36).substr(2, 9),
      difficulty: 'medium',
    }));
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
};

export const playPronunciation = async (text: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say clearly: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      // Use the standard decode and decodeAudioData functions as per guidelines for raw PCM
      const audioBuffer = await decodeAudioData(
        decode(base64Audio),
        audioCtx,
        24000,
        1,
      );

      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      source.start();
    }
  } catch (error) {
    console.error("Audio playback error", error);
  }
};
