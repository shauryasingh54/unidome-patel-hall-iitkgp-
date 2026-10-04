import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Github,
  Globe,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  X
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
          <h2 className="text-label">
            4-Resume Profile Studio
          </h2>
          <p className="text-sm text-muted mt-1">
            Configure up to 4 specialized resumes tailored for different engineering niches and companies.
          </p>
        </div>

        <span className="pill-brand self-start sm:self-auto">
          4 of 4 Slots Active
        </span>
      </div>

      {/* 4 Resume Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {studentResumes.map(resume => (
          <div
            key={resume.id}
            className="surface-card p-6 hover:border-maroon-200 dark:hover:border-maroon-700 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3.5">

              {/* Header: Slot Badge & Title */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="pill-brand">Slot #{resume.slotNumber}</span>
                    <span className="text-mono-meta">{resume.badge}</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-heading">
                    {resume.title}
                  </h3>
                </div>

                <button
                  onClick={() => setEditingResume({ ...resume })}
                  className="btn-secondary shrink-0 px-3 py-1.5 text-xs"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              </div>

              {/* Uploaded File Info */}
              <div className="surface-sunken p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-maroon-50 dark:bg-maroon-900/30 text-maroon-700 dark:text-peach-200">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-heading block truncate max-w-[200px]">
                      {resume.fileName}
                    </span>
                    <span className="text-mono-meta">
                      {resume.fileSize} • Updated {resume.lastUpdated}
                    </span>
                  </div>
                </div>
                <span className="pill-success">Ready</span>
              </div>

              {/* About & Work Ethics Statement */}
              <div className="space-y-1 text-sm">
                <span className="text-label block">Focus Statement</span>
                <p className="text-muted leading-relaxed line-clamp-2">
                  {resume.aboutStatement}
                </p>
              </div>

              {resume.workEthics && (
                <div className="space-y-1 text-sm">
                  <span className="text-label block">Work & Professional Ethics</span>
                  <p className="text-muted italic leading-relaxed line-clamp-2">
                    "{resume.workEthics}"
                  </p>
                </div>
              )}

              {/* Repositories & Attachments Links */}
              <div className="pt-2 border-t divider space-y-2 text-xs">
                {resume.repoLinks?.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-mono-meta mr-1 flex items-center gap-1">
                      <Github className="w-3 h-3" /> Repos:
                    </span>
                    {resume.repoLinks.map((repo, idx) => (
                      <a
                        key={idx}
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-peach-100/70 dark:bg-sand-800/60 hover:bg-maroon-50 dark:hover:bg-sand-700 text-sand-600 dark:text-sand-300 border border-sand-200 dark:border-sand-700 font-medium"
                      >
                        <span>{repo.label}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    ))}
                  </div>
                )}

                {resume.attachments?.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-mono-meta mr-1 flex items-center gap-1">
                      <Globe className="w-3 h-3" /> Links:
                    </span>
                    {resume.attachments.map((att, idx) => (
                      <a
                        key={idx}
                        href={att.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-peach-100/70 dark:bg-sand-800/60 hover:bg-maroon-50 dark:hover:bg-sand-700 text-sand-600 dark:text-sand-300 border border-sand-200 dark:border-sand-700 font-medium"
                      >
                        <span>{att.label}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 surface-overlay animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] surface-modal p-6 sm:p-8 overflow-y-auto space-y-5">

            <div className="flex items-center justify-between pb-3 border-b divider">
              <div>
                <span className="text-mono-meta uppercase">
                  Slot #{editingResume.slotNumber} Resume Configuration
                </span>
                <h3 className="text-base font-extrabold text-heading">
                  Edit {editingResume.title}
                </h3>
              </div>
              <button
                onClick={() => setEditingResume(null)}
                className="btn-ghost p-1.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="input-label">Profile Title *</label>
                  <input
                    type="text"
                    required
                    value={editingResume.title}
                    onChange={e => setEditingResume({ ...editingResume, title: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="input-label">Profile Badge / Niche Tag</label>
                  <input
                    type="text"
                    value={editingResume.badge}
                    onChange={e => setEditingResume({ ...editingResume, badge: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Uploaded File Name Simulator */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="input-label">CV File Name</label>
                  <input
                    type="text"
                    value={editingResume.fileName}
                    onChange={e => setEditingResume({ ...editingResume, fileName: e.target.value })}
                    className="input-field font-mono"
                  />
                </div>

                <div>
                  <label className="input-label">File Size / Format</label>
                  <input
                    type="text"
                    value={editingResume.fileSize}
                    onChange={e => setEditingResume({ ...editingResume, fileSize: e.target.value })}
                    className="input-field font-mono"
                  />
                </div>
              </div>

              {/* About & Work Statement */}
              <div>
                <label className="input-label">About Me & Technical Specialization *</label>
                <textarea
                  rows={2}
                  required
                  value={editingResume.aboutStatement}
                  onChange={e => setEditingResume({ ...editingResume, aboutStatement: e.target.value })}
                  className="input-field"
                />
              </div>

              {/* Work Ethics */}
              <div>
                <label className="input-label">Work & Professional Ethics Statement</label>
                <textarea
                  rows={2}
                  value={editingResume.workEthics}
                  onChange={e => setEditingResume({ ...editingResume, workEthics: e.target.value })}
                  placeholder="Principles regarding testing, user empathy, team collaboration..."
                  className="input-field"
                />
              </div>

              {/* Code Repositories */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-heading">
                    Repository Links (GitHub / GitLab)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddRepo}
                    className="text-[11px] text-maroon-600 hover:text-maroon-800 flex items-center gap-1 font-bold cursor-pointer"
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
                      className="input-field w-1/3 py-2"
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
                      className="input-field flex-1 py-2 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveRepo(idx)}
                      className="btn-danger-ghost p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Portfolio & External Attachments */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-heading">
                    Portfolio & Project Attachments (URLs / Docs)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddAttachment}
                    className="text-[11px] text-maroon-600 hover:text-maroon-800 flex items-center gap-1 font-bold cursor-pointer"
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
                      className="input-field w-1/3 py-2"
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
                      className="input-field flex-1 py-2 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(idx)}
                      className="btn-danger-ghost p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t divider">
                <button
                  type="button"
                  onClick={() => setEditingResume(null)}
                  className="btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
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
