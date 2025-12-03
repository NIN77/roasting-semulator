import React from 'react';
import { RoastResult, CastData } from '../types';
import { getBadge } from '../lib/utils';

interface RoastCardProps {
  roast: RoastResult;
  cast: CastData;
  readonly?: boolean;
}

export const RoastCard: React.FC<RoastCardProps> = ({ roast, cast, readonly }) => {
  const badge = getBadge(roast.score);

  return (
    <div className="flex flex-col w-full max-w-xl bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-3">
            <img 
                src={cast.author.pfpUrl} 
                alt={cast.author.username} 
                className="w-10 h-10 rounded-full border border-slate-600"
            />
            <div className="flex flex-col">
                <span className="text-white font-bold">{cast.author.displayName}</span>
                <span className="text-slate-400 text-sm">@{cast.author.username}</span>
            </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold bg-slate-800 border ${badge.color} border-current`}>
            {badge.label} • {roast.score}/100
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col gap-6 relative">
         {/* Background accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-3xl -z-10 rounded-full" />
        
        {/* Roast Text */}
        <div className="relative">
             <span className="absolute -top-4 -left-2 text-6xl text-purple-500/20 font-serif">“</span>
             <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-cyan-200 leading-tight text-center px-4">
                {roast.roastText}
             </p>
             <span className="absolute -bottom-8 -right-2 text-6xl text-cyan-500/20 font-serif rotate-180">“</span>
        </div>

        {/* Original Cast Context */}
        <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Original Cast</p>
            <p className="text-slate-300 italic text-sm line-clamp-2">
                "{cast.text}"
            </p>
        </div>
      </div>

      {/* Footer / Branding */}
      <div className="bg-slate-950 px-6 py-3 flex justify-between items-center text-xs text-slate-500">
        <span>🔥 AI Roast My Cast</span>
        <span>{new Date(roast.timestamp).toLocaleDateString()}</span>
      </div>
    </div>
  );
};