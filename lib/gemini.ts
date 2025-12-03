import { GoogleGenAI } from "@google/genai";
import { PROMPTS, RoastStyle } from '../constants';
import { normalizeScore } from './utils';

// NOTE: In a real Edge environment, keys come from process.env
// For this client-side demo, we warn if missing.
const API_KEY = process.env.API_KEY || '';

const getAI = () => {
    if (!API_KEY) {
        console.warn("GEMINI_API_KEY is missing. Using mock responses.");
        return null;
    }
    return new GoogleGenAI({ apiKey: API_KEY });
}

export const generateRoast = async (
  text: string, 
  style: RoastStyle | 'compliment'
): Promise<{ text: string; score: number }> => {
  const ai = getAI();
  
  // MOCK FALLBACK for Demo/Dev without keys
  if (!ai) {
    await new Promise(r => setTimeout(r, 1000));
    return {
      text: style === 'compliment' 
        ? "Your insights are truly visionary, keep shining!" 
        : `Oh wow, "${text.substring(0, 10)}..."? Did you come up with that all by yourself?`,
      score: Math.floor(Math.random() * 100)
    };
  }

  try {
    const isCompliment = style === 'compliment';
    const prompt = isCompliment 
      ? PROMPTS.COMPLIMENT.replace("{CAST_TEXT}", text)
      : PROMPTS.ROAST_BASE.replace("{CAST_TEXT}", text).replace("{STYLE}", style);

    const model = 'gemini-2.5-flash';

    // Parallel execution for roast and score if it's a roast
    const roastPromise = ai.models.generateContent({
      model,
      contents: prompt,
    });

    let scorePromise: Promise<any> | null = null;
    if (!isCompliment) {
      scorePromise = ai.models.generateContent({
        model,
        contents: PROMPTS.SCORE.replace("{CAST_TEXT}", text),
      });
    }

    const [roastRes, scoreRes] = await Promise.all([roastPromise, scorePromise]);
    
    const generatedText = roastRes.text.trim();
    const scoreText = scoreRes ? scoreRes.text.trim() : "0";
    
    return {
      text: generatedText,
      score: normalizeScore(scoreText, 50)
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "I tried to roast you, but my circuits fried from the cringe.",
      score: 0
    };
  }
};