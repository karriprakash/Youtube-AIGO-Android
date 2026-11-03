import React from 'react';
import { User, LogOut, CheckCircle2, ShieldCheck, PlayCircle, HardDrive } from 'lucide-react';

interface AccountDialogProps {
  user: { email: string; name: string } | null;
  onDismiss: () => void;
  onSignIn: () => void;
  onSignOut: () => void;
}

export const AccountDialog: React.FC<AccountDialogProps> = ({
  user,
  onDismiss,
  onSignIn,
  onSignOut
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white ${
                user ? 'bg-indigo-600' : 'bg-amber-600'
              }`}
            >
              {user ? user.email[0].toUpperCase() : <PlayCircle className="w-5 h-5 text-white" />}
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                {user ? 'Account Profile' : 'Studio Try Mode'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {user ? 'Google Workspace Authenticated' : 'Offline Access Active'}
              </p>
            </div>
          </div>
          <button
            onClick={onDismiss}
            className="text-slate-400 hover:text-white text-xs font-bold"
          >
            ✕
          </button>
        </div>

        {user ? (
          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[11px] text-slate-400">Signed in as:</span>
              <p className="font-bold text-white text-sm">{user.email}</p>
              <div className="pt-2 border-t border-slate-900 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" /> Cloud Sync Active with Firebase
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={onSignOut}
                className="px-4 py-2 bg-red-950/60 hover:bg-red-900/80 border border-red-700/60 text-red-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
              <button
                onClick={onDismiss}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <HardDrive className="w-4 h-4" /> Full Offline Studio Unlocked
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                You have unrestricted access to video timeline trimming, audio mixes, on-screen text overlays, Telugu meme studio, and Gemini AI kits stored locally on your machine.
              </p>
              <p className="text-[11px] text-slate-400">
                Sign in anytime with Google to backup projects to the cloud and collaborate across devices.
              </p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={onDismiss}
                className="px-3 py-2 text-slate-400 hover:text-white rounded-xl text-xs font-semibold"
              >
                Keep Trying Offline
              </button>
              <button
                onClick={onSignIn}
                className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-xl text-xs shadow-md transition-colors"
              >
                Sign In with Google
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
