# Deployment Guide: AI Roast My Cast

## 1. Prerequisites
- **Vercel Account** (for Edge Runtime)
- **Upstash Account** (for Redis/History)
- **Google AI Studio Key** (Gemini)

## 2. Environment Variables
Configure these in Vercel Project Settings:
```bash
GEMINI_API_KEY=AIzaSy...
HUB_API_URL=https://nemes.farcaster.xyz:2281 # or specific Hub provider
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
APP_ENV=production
```

## 3. Deployment Steps (Vercel)
1. Push code to GitHub.
2. Import project into Vercel.
3. Select **Framework Preset**: Other (or Next.js if you wrap it in Next).
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist` (or `public`)
6. **Functions**: Ensure "Edge" is selected in function settings.

## 4. Testing
- **Dev Mode**: `npm run dev` starts the local Frog server.
- **Mock Mode**: Append `?mock=true` to the URL to bypass API costs during testing.
- **Warpcast Debugger**: Use https://warpcast.com/~/developers/frames to test the localhost URL (via ngrok).

## 5. Upstash Setup
1. Create a Redis database on Upstash.
2. Copy the REST URL and TOKEN.
3. The app uses keys: `roast:history:{fid}` and `leaderboard:scores`.
