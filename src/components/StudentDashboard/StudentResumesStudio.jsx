import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Upload,
  Github,
  Globe,
  Plus,
  CheckCircle2,
  Trash2,
  Edit3,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export const StudentResumesStudio = () => {
  const { studentResumes, updateStudentResume } = useApp();
  const [editingResume, setEditingResume] = useState(null);

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingResume) return;

    updateStudentResume(editingResume.id, {
      title: editingResume.title,
      badge: editingResume.badge,
      aboutStatement: editingResume.aboutStatement,
      workEthics: editingResume.workEthics,
      fileName: editingResume.fileName,
      fileSize: editingResume.fileSize,
      repoLinks: editingResume.repoLinks,
      attachments: editingResume.attachments
    });

    setEditingResume(null);
  };

  const handleAddRepo = () => {
    setEditingResume(prev => ({
      ...prev,
      repoLinks: [...(prev.repoLinks || []), { label: 'New Repository', url: 'https://github.com/' }]
    }));
  };

  const handleRemoveRepo = (idx) => {
    setEditingResume(prev => ({
      ...prev,
      repoLinks: prev.repoLinks.filter((_, i) => i !== idx)
    }));
  };

  const handleAddAttachment = () => {
    setEditingResume(prev => ({
      ...prev,
      attachments: [...(prev.attachments || []), { label: 'Portfolio / Doc Link', url: 'https://' }]
    }));
  };

  const handleRemoveAttachment = (idx) => {
    setEditingResume(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== idx)
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-extrabold font-mono uppercase tracking-wider text-zinc-400">
            4-Resume Profile Studio
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Configure up to 4 specialized resumes tailored for different engineering niches and companies.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-zinc-900 border border-zinc-800 text-zinc-300 self-start sm:self-auto">
          4 of 4 Slots Active
        </span>
      </div>

      {/* 4 Resume Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {studentResumes.map(resume => (
          <div
            key={resume.id}
            className="p-5 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3.5">
              
              {/* Header: Slot Badge & Title */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-800 text-zinc-200 border border-zinc-700">
                      Slot #{resume.slotNumber}
                    </span>
                    <span className="text-[10px] font-bold text-zinc-400 font-mono">
                      {resume.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-white">
                    {resume.title}
                  </h3>
                </div>

                <button
                  onClick={() => setEditingResume({ ...resume })}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold border border-zinc-700 transition-all cursor-pointer shrink-0"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              </div>

              {/* Uploaded File Info */}
              <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block truncate max-w-[200px]">
                      {resume.fileName}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {resume.fileSize} • Updated {resume.lastUpdated}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-white bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
                  Ready
                </span>
              </div>

              {/* About & Work Ethics Statement */}
              <div className="space-y-1 text-xs">
                <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block">
                  Focus Statement:
                </span>
                <p className="text-zinc-300 leading-relaxed line-clamp-2">
                  {resume.aboutStatement}
                </p>
              </div>

              {resume.workEthics && (
                <div className="space-y-1 text-xs">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block">
                    Work & Professional Ethics:
                  </span>
                  <p className="text-zinc-400 italic leading-relaxed line-clamp-2">
                    "{resume.workEthics}"
                  </p>
                </div>
              )}

              {/* Repositories & Attachments Links */}
              <div className="pt-2 border-t border-zinc-800/80 space-y-2 text-xs">
                {resume.repoLinks?.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono text-zinc-500 mr-1 flex items-center gap-1">
                      <Github className="w-3 h-3" /> Repos:
                    </span>
                    {resume.repoLinks.map((repo, idx) => (
                      <a
                        key={idx}
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-zinc-950 hover:bg-zinc-900 text-zinc-300 border border-zinc-800 font-medium"
                      >
                        <span>{repo.label}</span>
                        <ExternalLink className="w-2.5 h-2.5 text-zinc-500" />
                      </a>
                    ))}
                  </div>
                )}

                {resume.attachments?.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono text-zinc-500 mr-1 flex items-center gap-1">
                      <Globe className="w-3 h-3" /> Links:
                    </span>
                    {resume.attachments.map((att, idx) => (
                      <a
                        key={idx}
                        href={att.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-zinc-950 hover:bg-zinc-900 text-zinc-300 border border-zinc-800 font-medium"
                      >
                        <span>{att.label}</span>
                        <ExternalLink className="w-2.5 h-2.5 text-zinc-500" />
                      </a>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Edit Resume Modal */}
      {editingResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] rounded-2xl border border-zinc-800 bg-[#0c0c0e] text-zinc-100 shadow-2xl p-6 sm:p-7 overflow-y-auto space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div>
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">
                  Slot #{editingResume.slotNumber} Resume Configuration
                </span>
                <h3 className="text-base font-extrabold text-white">
                  Edit {editingResume.title}
                </h3>
              </div>
              <button
                onClick={() => setEditingResume(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">
                    Profile Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingResume.title}
                    onChange={e => setEditingResume({ ...editingResume, title: e.target.value })}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">
                    Profile Badge / Niche Tag
                  </label>
                  <input
                    type="text"
                    value={editingResume.badge}
                    onChange={e => setEditingResume({ ...editingResume, badge: e.target.value })}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-medium"
                  />
                </div>
              </div>

              {/* Uploaded File Name Simulator */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">
                    CV File Name
                  </label>
                  <input
                    type="text"
                    value={editingResume.fileName}
                    onChange={e => setEditingResume({ ...editingResume, fileName: e.target.value })}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">
                    File Size / Format
                  </label>
                  <input
                    type="text"
                    value={editingResume.fileSize}
                    onChange={e => setEditingResume({ ...editingResume, fileSize: e.target.value })}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              {/* About & Work Statement */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">
                  About Me & Technical Specialization *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingResume.aboutStatement}
                  onChange={e => setEditingResume({ ...editingResume, aboutStatement: e.target.value })}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>

              {/* Work Ethics */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">
                  Work & Professional Ethics Statement
                </label>
                <textarea
                  rows={2}
                  value={editingResume.workEthics}
                  onChange={e => setEditingResume({ ...editingResume, workEthics: e.target.value })}
                  placeholder="Principles regarding testing, user empathy, team collaboration..."
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>

              {/* Code Repositories */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-300">
                    Repository Links (GitHub / GitLab)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddRepo}
                    className="text-[11px] text-zinc-300 hover:text-white flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Repo
                  </button>
                </div>

                {editingResume.repoLinks?.map((repo, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Repo Label"
                      value={repo.label}
                      onChange={e => {
                        const updated = [...editingResume.repoLinks];
                        updated[idx].label = e.target.value;
                        setEditingResume({ ...editingResume, repoLinks: updated });
                      }}
                      className="w-1/3 rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-xs text-white font-medium"
                    />
                    <input
                      type="text"
                      placeholder="https://github.com/username/project"
                      value={repo.url}
                      onChange={e => {
                        const updated = [...editingResume.repoLinks];
                        updated[idx].url = e.target.value;
                        setEditingResume({ ...editingResume, repoLinks: updated });
                      }}
                      className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-xs text-white font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveRepo(idx)}
                      className="p-2 text-zinc-500 hover:text-rose-400 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Portfolio & External Attachments */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-300">
                    Portfolio & Project Attachments (URLs / Docs)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddAttachment}
                    className="text-[11px] text-zinc-300 hover:text-white flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Attachment
                  </button>
                </div>

                {editingResume.attachments?.map((att, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Attachment Title"
                      value={att.label}
                      onChange={e => {
                        const updated = [...editingResume.attachments];
                        updated[idx].label = e.target.value;
                        setEditingResume({ ...editingResume, attachments: updated });
                      }}
                      className="w-1/3 rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-xs text-white font-medium"
                    />
                    <input
                      type="text"
                      placeholder="https://..."
                      value={att.url}
                      onChange={e => {
                        const updated = [...editingResume.attachments];
                        updated[idx].url = e.target.value;
                        setEditingResume({ ...editingResume, attachments: updated });
                      }}
                      className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-xs text-white font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(idx)}
                      className="p-2 text-zinc-500 hover:text-rose-400 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingResume(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-black text-xs shadow-md transition-all cursor-pointer"
                >
                  Save Resume Profile
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
