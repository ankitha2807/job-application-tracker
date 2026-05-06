import { useState, useEffect } from 'react';
import { X, Save, FilePenLine } from 'lucide-react';

export default function EditCoverLetterModal({ job, isOpen, onClose, onSave }) {
  const [coverLetter, setCoverLetter] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (job && job.coverLetter) {
      setCoverLetter(job.coverLetter);
    }
  }, [job]);

  if (!isOpen || !job) return null;

  const handleSave = async () => {
    if (!coverLetter.trim()) return;

    setIsSaving(true);
    try {
      const success = await onSave(coverLetter);
      if (success) {
        onClose();
      }
    } catch (error) {
      console.error('Failed to save cover letter:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="glass-panel w-full max-w-4xl h-[85vh] flex flex-col relative z-10 overflow-hidden shadow-2xl">

        <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-info)]/20 flex items-center justify-center text-[var(--color-info)] shadow-inner">
              <FilePenLine size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Edit Cover Letter</h2>
              <p className="text-sm text-[var(--color-text-muted)]">for {job.role} at {job.company}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[var(--color-text-muted)] hover:text-white transition-colors rounded-full hover:bg-white/5">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden p-5">
          <div className="h-full flex flex-col gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">
                Cover Letter Content
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Write your cover letter here..."
                className="w-full h-full min-h-[400px] bg-[#0f172a]/30 border border-[var(--color-border)] rounded-xl p-4 text-sm font-serif leading-relaxed text-slate-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
              <div className="text-sm text-[var(--color-text-muted)]">
                {coverLetter.length} characters
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-[var(--color-text-muted)] hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving || !coverLetter.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={16} />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}