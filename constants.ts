export const APP_NAME = "AI Roast My Cast — Ultimate";
export const FRAME_URL = "https://roast-my-cast.vercel.app"; // Example URL

export enum RoastStyle {
  SARCASTIC = "sarcastic",
  DAD_JOKE = "dad-joke",
  CHAOTIC = "chaotic",
  DEADPAN = "deadpan"
}

export const PROMPTS = {
  ROAST_BASE: `You are a witty, friendly stand-up comedian. Roast the following cast in 1–2 short sentences. RULES:
- Keep it playful and non-abusive.
- Never use slurs, hate language, or attack protected groups.
- Do not include private/personal information or instructions to harm.
- Add at most ONE emoji.
- Keep the roast 10–25 words.

Cast:
"{CAST_TEXT}"

Style: {STYLE}
Return only the roast text.`,

  COMPLIMENT: `You are a warm, positive copywriter. Write a friendly 1–2 sentence compliment to the author of this cast. Keep it sincere and brief, add at most one emoji.

Cast:
"{CAST_TEXT}"`,

  SCORE: `Given the cast text below, rate how well it can be roasted on a scale from 0 to 100 (higher = more roastable). Consider originality, bravado, controversial phrasing, and meme potential. Return only a number.

Cast:
"{CAST_TEXT}"`,

  COMPARE: `Compare these two Farcaster users by public cast patterns and engagement; produce a 2-3 sentence comparison highlighting strengths and a quick suggestion each can use to improve. Avoid private info.
User A: {SUMMARY_A}
User B: {SUMMARY_B}`
};

// Mock data for the web dashboard since we don't have a live backend in the browser
export const MOCK_LEADERBOARD = [
  { fid: 1234, username: 'dwr.eth', score: 98, roastCount: 450 },
  { fid: 5678, username: 'vbuterin', score: 95, roastCount: 320 },
  { fid: 9012, username: 'horsefacts', score: 88, roastCount: 210 },
];