import { CastData } from '../types';

/**
 * Mock Farcaster Hub interactions.
 * In production, this would fetch from process.env.HUB_API_URL
 */
export const getLatestCast = async (fid: number): Promise<CastData | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // MOCK DATA for local dev / demo
  return {
    text: "Just sold my NFT for 3 ETH. Payments accepted in likes only.",
    hash: "0x123...abc",
    author: {
      username: "crypto_chad",
      displayName: "Crypto Chad",
      pfpUrl: "https://picsum.photos/200/200",
      fid: fid
    },
    timestamp: Date.now()
  };
};

export const validateFid = (fid: unknown): number | null => {
  if (typeof fid === 'number' && fid > 0) return fid;
  if (typeof fid === 'string') {
    const parsed = parseInt(fid, 10);
    return isNaN(parsed) ? null : parsed;
  }
  return null;
};

// Logic to generate a Warpcast intent URL
export const generateShareUrl = (text: string, embedUrl?: string) => {
  const baseUrl = "https://warpcast.com/~/compose";
  const params = new URLSearchParams();
  params.set("text", text);
  if (embedUrl) params.set("embeds[]", embedUrl);
  return `${baseUrl}?${params.toString()}`;
};