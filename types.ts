import { RoastStyle } from './constants';

export interface CastData {
  text: string;
  hash: string;
  author: {
    username: string;
    displayName: string;
    pfpUrl: string;
    fid: number;
  };
  timestamp: number;
}

export interface RoastResult {
  originalText: string;
  roastText: string;
  score: number;
  style: RoastStyle | 'compliment';
  timestamp: number;
  isSafe: boolean;
}

export interface UserHistory {
  fid: number;
  roasts: RoastResult[];
}

export interface LeaderboardEntry {
  fid: number;
  username: string;
  score: number; // Avg roastability score
  roastCount: number;
}

export interface Env {
  GEMINI_API_KEY: string;
  HUB_API_URL: string;
  UPSTASH_REDIS_REST_URL: string;
  UPSTASH_REDIS_REST_TOKEN: string;
  VERCEL_KV_NAMESPACE?: string;
  SENTRY_DSN?: string;
}