import React from 'react';
import { Film, Clock, Play, Trash2, Sparkles, Smartphone, Monitor } from 'lucide-react';
import { VideoProject } from '../types';

interface ProjectsListSectionProps {
  projects: VideoProject[];
  onSelectProject: (project: VideoProject) => void;
  onDeleteProject: (project: VideoProject) => void;
}

export const ProjectsListSection: React.FC<ProjectsListSectionProps> = ({
  projects,
  onSelectProject,
  onDeleteProject
}) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12 px-4 bg-slate-900/60 border border-slate-800 rounded-2xl">
        <Film className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <h4 className="text-sm font-bold text-white">No Video Projects Yet</h4>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
          Start by clicking 'New Video' or 'Audio to Video' to create your first Telugu or bilingual reel!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="font-bold text-white text-sm">Recent Video Projects ({projects.length})</h3>
        <span className="text-xs text-slate-400">Saved offline in browser storage</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(project => {
          const durationSec = Math.round((project.trimEndMs - project.trimStartMs) / 1000);
          return (
            <div
              key={project.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-700/50 flex items-center justify-center shrink-0">
                      {project.aspectRatio === '16:9' ? (
                        <Monitor className="w-5 h-5 text-cyan-400" />
                      ) : (
                        <Smartphone className="w-5 h-5 text-indigo-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm line-clamp-1 group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-cyan-400">{project.aspectRatio}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {durationSec}s
                        </span>
                        <span>•</span>
                        <span className="text-amber-400 font-medium">
                          {project.language === 'te' ? 'Telugu' : 'English'}
                        </span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      if (confirm(`Delete project "${project.title}"?`)) {
                        onDeleteProject(project);
                      }
                    }}
                    className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {project.rawTopicNotes && (
                  <p className="text-xs text-slate-300 line-clamp-2 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 my-2">
                    {project.rawTopicNotes}
                  </p>
                )}

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 my-2">
                  {project.colorFilter !== 'NONE' && (
                    <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-purple-300 rounded-full">
                      {project.colorFilter}
                    </span>
                  )}
                  {project.activeMemeId && (
                    <span className="text-[10px] px-2 py-0.5 bg-amber-950 text-amber-300 rounded-full border border-amber-800/60">
                      Meme Attached
                    </span>
                  )}
                  {project.transcriptSegments?.length > 0 && (
                    <span className="text-[10px] px-2 py-0.5 bg-cyan-950 text-cyan-300 rounded-full border border-cyan-800/60">
                      Live Captions
                    </span>
                  )}
                  {project.aiSummaryTe && (
                    <span className="text-[10px] px-2 py-0.5 bg-indigo-950 text-indigo-300 rounded-full border border-indigo-800/60 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> AI Kit Ready
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">
                  Updated {new Date(project.updatedAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => onSelectProject(project)}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-white" /> Open Studio
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
