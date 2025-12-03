import React, { useState } from 'react';
import { generateRoast } from './lib/gemini';
import { RoastCard } from './components/RoastCard';
import { CastData, RoastResult } from './types';
import { RoastStyle, MOCK_LEADERBOARD } from './constants';

function App() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RoastResult | null>(null);
  const [activeTab, setActiveTab] = useState<'simulator' | 'leaderboard'>('simulator');

  const handleRoast = async () => {
    if (!inputText) return;
    setLoading(true);
    
    // Create mock cast object for the preview
    const mockCast: CastData = {
      text: inputText,
      hash: '0x...',
      author: {
        username: 'guest_user',
        displayName: 'Guest User',
        pfpUrl: 'https://picsum.photos/100/100',
        fid: 0
      },
      timestamp: Date.now()
    };

    const response = await generateRoast(inputText, RoastStyle.SARCASTIC);
    
    setResult({
      originalText: inputText,
      roastText: response.text,
      score: response.score,
      style: RoastStyle.SARCASTIC,
      timestamp: Date.now(),
      isSafe: true
    });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4">
      <header className="w-full max-w-4xl flex justify-between items-center py-6 border-b border-slate-800 mb-8">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
          🔥 AI Roast My Cast
        </h1>
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'simulator' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Frame Simulator
          </button>
          <button 
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'leaderboard' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Leaderboard
          </button>
        </div>
      </header>

      <main className="w-full max-w-4xl">
        {activeTab === 'simulator' && (
          <div className="flex flex-col items-center gap-8">
            <div className="w-full max-w-xl space-y-4">
              <label className="block text-sm font-medium text-slate-400">
                Test the Roast AI (Simulating Frame Input)
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste a cast or type something roastable..."
                className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-4 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
              />
              <button
                onClick={handleRoast}
                disabled={loading || !inputText}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50"
              >
                {loading ? 'Generating Heat...' : '🔥 Roast Me'}
              </button>
              {!process.env.API_KEY && (
                 <p className="text-xs text-yellow-500 text-center">
                    Note: GEMINI_API_KEY missing. Using mock AI responses.
                 </p>
              )}
            </div>

            {result && (
              <RoastCard 
                roast={result} 
                cast={{
                    text: inputText,
                    hash: 'mock',
                    author: { username: 'you', displayName: 'You', pfpUrl: 'https://picsum.photos/200', fid: 1 },
                    timestamp: Date.now()
                }} 
              />
            )}
          </div>
        )}

        {activeTab === 'leaderboard' && (
           <div className="w-full max-w-2xl mx-auto">
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                 <div className="grid grid-cols-4 bg-slate-950 p-4 font-bold text-slate-400 border-b border-slate-800">
                    <div className="col-span-2">User</div>
                    <div className="text-center">Score</div>
                    <div className="text-center">Roasts</div>
                 </div>
                 {MOCK_LEADERBOARD.map((user, idx) => (
                    <div key={user.fid} className="grid grid-cols-4 p-4 border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors items-center">
                       <div className="col-span-2 flex items-center gap-3">
                          <span className="text-slate-500 w-6">#{idx + 1}</span>
                          <span className="font-bold text-white">{user.username}</span>
                       </div>
                       <div className="text-center text-yellow-400 font-mono font-bold">{user.score}</div>
                       <div className="text-center text-slate-400">{user.roastCount}</div>
                    </div>
                 ))}
              </div>
           </div>
        )}
      </main>
    </div>
  );
}

export default App;