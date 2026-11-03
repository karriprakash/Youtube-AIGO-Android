import React from 'react';
import { Film, Sparkles, User, LogIn, HardDrive } from 'lucide-react';

interface HeaderProps {
  user: { email: string; name: string } | null;
  onOpenAccount: () => void;
  onNavigateHome?: () => void;
  isEditor?: boolean;
  projectTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenAccount,
  onNavigateHome,
  isEditor = false,
  projectTitle
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Film className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg text-white tracking-tight">OmniVideo</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-950 text-cyan-400 border border-indigo-700/50 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> AI STUDIO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium line-clamp-1">
              Telugu & Multi-Platform Video Generator
            </p>
          </div>
        </button>
      </div>

      {isEditor && projectTitle && (
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-white max-w-xs truncate">{projectTitle}</span>
          <span className="text-slate-500">•</span>
          <span className="text-cyan-400 font-medium">Offline Draft</span>
        </div>
      )}

      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenAccount}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
        >
          {user ? (
            <>
              <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                {user.email[0]}
              </div>
              <span className="hidden sm:inline">{user.name || user.email.split('@')[0]}</span>
            </>
          ) : (
            <>
              <HardDrive className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-300">Try Mode (Offline)</span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="text-cyan-400 hidden sm:inline">Sign In</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
