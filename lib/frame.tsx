/**
 * NOTE: This file represents the Server-Side logic for the Farcaster Frame.
 * In a real deployment, this runs on Vercel Edge functions.
 * We include it here to demonstrate the requested Frame architecture.
 */

/* eslint-disable react/jsx-key */
import { Button, Frog, TextInput } from 'frog';
import { generateRoast } from './gemini';
import { getLatestCast } from './farcaster';
import { checkSafety, calculateOfflineScore } from './utils';
import { RoastStyle, PROMPTS, FRAME_URL } from '../constants';

// Initialize Frog App
export const app = new Frog({
  title: 'AI Roast Ultimate',
  basePath: '/api',
  // Supply the hub API URL if needed for verification
  // hubApiUrl: process.env.HUB_API_URL, 
  imageAspectRatio: '1.91:1',
  imageOptions: {
    height: 600,
    width: 1200, 
    fonts: [], // Would load custom fonts here
  },
});

// 1. Home Screen
app.frame('/', (c) => {
  return c.res({
    image: (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        height: '100%', width: '100%', backgroundColor: '#020617', color: 'white'
      }}>
        <div style={{ fontSize: 70, fontWeight: 'bold', background: 'linear-gradient(to right, #a855f7, #22d3ee)', backgroundClip: 'text', color: 'transparent', marginBottom: 20 }}>
          🔥 AI ROAST MY CAST
        </div>
        <div style={{ fontSize: 30, color: '#94a3b8' }}>
          Dare to see what Gemini thinks of your takes?
        </div>
      </div>
    ),
    intents: [
      <Button action="/roast/latest">Roast Latest Cast</Button>,
      <Button action="/custom">Roast Custom Text</Button>,
      <Button action="/leaderboard">Leaderboard</Button>
    ],
  });
});

// 2. Custom Input Screen
app.frame('/custom', (c) => {
  return c.res({
    image: (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        height: '100%', width: '100%', backgroundColor: '#020617', color: 'white'
      }}>
        <div style={{ fontSize: 50, marginBottom: 20 }}>Type your worst 👇</div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Type something to roast..." />,
      <Button action="/roast/custom">Roast This</Button>,
      <Button action="/">Back</Button>
    ]
  });
});

// 3. Logic: Handle Roast Generation
// Note: This matches /roast/:type
app.frame('/roast/:type', async (c) => {
  const { type } = c.req.param();
  const { frameData, verified } = c;
  const inputText = c.inputText;
  
  // 1. Get User Data (Mocking FID if unverified in dev)
  const fid = verified ? frameData?.fid : 1; 

  let textToRoast = "";
  let castData = null;

  if (type === 'latest') {
    castData = await getLatestCast(fid as number);
    if (!castData) {
      return c.res({
        image: (
           <div style={{ color: 'white', backgroundColor: '#0f172a', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>
             Error: No casts found!
           </div>
        ),
        intents: [<Button action="/">Home</Button>]
      });
    }
    textToRoast = castData.text;
  } else {
    textToRoast = inputText || "";
  }

  // 2. Safety Check
  if (!textToRoast || !checkSafety(textToRoast)) {
     return c.res({
        image: (
           <div style={{ color: 'white', backgroundColor: '#0f172a', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, padding: 40, textAlign: 'center' }}>
             🚫 I can't roast that. Keep it clean and safe!
           </div>
        ),
        intents: [<Button action="/">Try Again</Button>]
      });
  }

  // 3. Generate Roast (Gemini)
  // Default style for now, could be passed via button value
  const roastResult = await generateRoast(textToRoast, RoastStyle.SARCASTIC);

  // 4. Save to History (Pseudo-code for Redis)
  // await redis.lpush(`history:${fid}`, JSON.stringify(roastResult));

  // 5. Render Result
  return c.res({
    image: (
      <div style={{
        display: 'flex', flexDirection: 'column', height: '100%', width: '100%', backgroundColor: '#020617', padding: 60,
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
           <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 24, color: '#94a3b8' }}>@{castData?.author.username || 'user'}</span>
              <span style={{ fontSize: 24, color: '#64748b' }}>Score: {roastResult.score}/100</span>
           </div>
           <div style={{ fontSize: 30, color: '#a855f7' }}>AI ROAST ULTIMATE</div>
        </div>

        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ fontSize: 48, fontWeight: 'bold', color: 'white', textAlign: 'center', lineHeight: 1.2 }}>
              "{roastResult.text}"
           </div>
        </div>
        
        <div style={{ marginTop: 40, padding: 20, backgroundColor: '#1e293b', borderRadius: 12, fontSize: 24, color: '#cbd5e1' }}>
           Original: "{textToRoast.substring(0, 60)}{textToRoast.length > 60 ? '...' : ''}"
        </div>
      </div>
    ),
    intents: [
      <Button action="/">Roast Another</Button>
      <Button.Link href={`https://warpcast.com/~/compose?text=${encodeURIComponent(`I got roasted! Score: ${roastResult.score}/100\n\n"${roastResult.text}"`)}&embeds[]=${FRAME_URL}`}>Share</Button.Link>
    ]
  });
});

// 4. Leaderboard Frame
app.frame('/leaderboard', (c) => {
  // In real app, fetch from Redis
  const leaders = [
     { name: 'dwr.eth', score: 99 },
     { name: 'vbuterin', score: 95 },
     { name: 'user123', score: 88 }
  ];

  return c.res({
    image: (
       <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', backgroundColor: '#020617', padding: 50 }}>
          <div style={{ fontSize: 60, color: '#eab308', marginBottom: 40, textAlign: 'center' }}>🏆 Hall of Flame 🏆</div>
          {leaders.map((l, i) => (
             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 40, color: 'white', marginBottom: 20, borderBottom: '2px solid #334155', paddingBottom: 10 }}>
                <span>#{i+1} {l.name}</span>
                <span>{l.score} pts</span>
             </div>
          ))}
       </div>
    ),
    intents: [
      <Button action="/">Back Home</Button>
    ]
  });
});