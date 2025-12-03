export const calculateOfflineScore = (text: string): number => {
  let score = 50;
  // Length factor: sweet spot is 50-150 chars
  if (text.length > 50 && text.length < 150) score += 10;
  
  // Complexity factors
  if (/[A-Z]{3,}/.test(text)) score += 5; // Yelling
  if (/\?|!/.test(text)) score += 5; // Punctuation
  if (text.toLowerCase().includes("nft") || text.toLowerCase().includes("gm")) score += 15; // Cringe keywords

  // Normalize
  return Math.min(100, Math.max(0, score));
};

export const normalizeScore = (aiScore: string | number, fallback: number): number => {
  const parsed = typeof aiScore === 'string' ? parseInt(aiScore, 10) : aiScore;
  if (isNaN(parsed)) return fallback;
  return Math.min(100, Math.max(0, parsed));
};

export const checkSafety = (text: string): boolean => {
  const SENSITIVE_REGEX = /\b(\d{3}-\d{2}-\d{4}|ssn|social security)\b/i;
  const HATE_SPEECH_REGEX = /\b(slur1|slur2)\b/i; // Placeholder for actual blocklist

  if (SENSITIVE_REGEX.test(text)) return false;
  if (HATE_SPEECH_REGEX.test(text)) return false;
  
  return true;
};

export const getBadge = (score: number) => {
  if (score >= 90) return { label: '🔥 ROAST GOD', color: 'text-red-500' };
  if (score >= 75) return { label: '🌶️ SPICY', color: 'text-orange-500' };
  if (score >= 50) return { label: '😐 MID', color: 'text-yellow-500' };
  return { label: '🧊 FROZEN', color: 'text-blue-500' };
};