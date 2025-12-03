# AI Roast My Cast — Ultimate

A Farcaster Frame that uses Google Gemini to roast your casts.

## Features
- **AI Roasts**: Context-aware roasting using Gemini 2.5 Flash.
- **Safety**: Built-in sanitization and strictly guarded prompts.
- **Leaderboard**: Tracks high scores (Roastability) and engagement.
- **Shareable Cards**: Dynamic images generated on the Edge.

## Example URLs
- `GET /api` -> Home Frame
- `POST /api/roast/latest` -> Triggers logic
- `GET /api/leaderboard` -> Returns leaderboard image

## Testing
Run `npm test` to execute Jest tests located in `tests/`.

### Manual QA
1. **Empty Input**: Should return friendly error.
2. **Sensitive Data**: Input "My SSN is 123..." -> Should trigger "Safety Fallback".
3. **High Score**: Input complex crypto bro text -> Should return >80 score.

## Analytics Events (Schema)
The app tracks the following events (send to PostHog/Amplitude):

1. `roast_requested`: `{ fid: number, style: string, source: 'latest' | 'custom' }`
2. `roast_generated`: `{ fid: number, score: number, latency_ms: number }`
3. `share_clicked`: `{ fid: number, score: number }`
4. `error_triggered`: `{ type: 'safety' | 'api', message: string }`

## Extensions & Ideas
- **Animated Cards**: Use a GIF encoder to flash the text (Scaffold provided in `lib/frame.tsx`).
- **Paid Mode**: Gate "Premium Roasts" (Gemini Pro) behind a Warps payment.
- **Video Generation**: Use Gemini 2.5 to generate a video avatar reading the roast.
