import { useState, useEffect } from 'react';
import { X, Bot, Copy, CheckCircle2 } from 'lucide-react';
import { generateCoverLetter } from '../services/api';

export default function CoverLetterModal({ job, isOpen, onClose, onSaveCoverLetter, templateContent }) {
  const [skills, setSkills] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setError('');
      setCopied(false);
      setIsSaved(false);
      setSkills('');
      setCoverLetter(templateContent || '');
    }
  }, [isOpen, templateContent]);

  if (!isOpen || !job) return null;

  const handleGenerate = async () => {
    if (!job.description) {
      setError('Job description is required to generate a cover letter.');
      return;
    }
    
    setIsGenerating(true);
    setError('');
    try {
      const res = await generateCoverLetter(job.description, skills);
      setCoverLetter(res.data.coverLetter);
    } catch (err) {
      setError('Failed to generate cover letter. Ensure the backend and Gemini API are configured correctly.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveLetter = async () => {
    setError('');
    try {
      const success = await onSaveCoverLetter(coverLetter);
      if (success) {
        setIsSaved(true);
      } else {
        setError('Failed to save cover letter. Please try again.');
      }
    } catch (err) {
      setError('Failed to save cover letter. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="glass-panel w-full max-w-4xl h-[85vh] flex flex-col relative z-10 overflow-hidden shadow-2xl">
        
        <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] shadow-inner">
              <Bot size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold">AI Cover Letter</h2>
              <p className="text-sm text-[var(--color-text-muted)]">for {job.role} at {job.company}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[var(--color-text-muted)] hover:text-white transition-colors rounded-full hover:bg-white/5">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
          <div className="flex flex-col space-y-4">
            <div>
              <label className="label-text">Your Skills & Experience</label>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="input-field h-32 resize-none"
                placeholder="e.g. 5 years React, Spring Boot, led a team of 3, passionate about UX..."
              />
              <p className="text-xs text-[var(--color-text-muted)] mt-1">Provide keywords or a short bio to personalize the letter.</p>
            </div>

            <div className="flex-1 flex flex-col min-h-0">
              <label className="label-text">Job Description</label>
              <div className="bg-[#0f172a]/30 border border-[var(--color-border)] rounded-lg p-3 text-sm text-[var(--color-text-muted)] flex-1 overflow-y-auto whitespace-pre-wrap">
                {job.description || "No description provided. Please edit the job to add a description."}
              </div>
            </div>

            <button 
              onClick={handleGenerate} 
              disabled={isGenerating || !job.description}
              className="btn-primary w-full shrink-0"
            >
              {isGenerating ? 'Generating with AI...' : 'Generate Cover Letter'}
            </button>
            {error && <p className="text-sm text-[var(--color-danger)] shrink-0">{error}</p>}
            {coverLetter && (
              <button
                type="button"
                onClick={handleSaveLetter}
                className="btn-secondary w-full"
              >
                {isSaved ? 'Saved to job' : 'Save cover letter to job'}
              </button>
            )}
          </div>

          <div className="flex flex-col h-full border border-[var(--color-border)] rounded-xl bg-[#0f172a]/30 overflow-hidden relative shadow-inner">
            <div className="flex items-center justify-between px-4 py-3 bg-[#1e293b]/50 border-b border-[var(--color-border)] shrink-0">
              <span className="text-sm font-medium">Result</span>
              {coverLetter && (
                <button onClick={handleCopy} className="text-[var(--color-text-muted)] hover:text-white flex items-center gap-1.5 text-xs bg-white/5 px-3 py-1 rounded-md hover:bg-white/10 transition-colors">
                  {copied ? <CheckCircle2 size={14} className="text-[var(--color-success)]" /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              )}
            </div>
            <div className="flex-1 p-5 overflow-y-auto text-sm whitespace-pre-wrap font-serif leading-relaxed text-slate-300">
              {isGenerating ? (
                <div className="h-full flex flex-col items-center justify-center text-[var(--color-primary)]">
                  <Bot size={40} className="animate-bounce mb-4" />
                  <p className="animate-pulse">Analyzing description and writing...</p>
                </div>
              ) : coverLetter ? (
                coverLetter
              ) : (
                <div className="h-full flex items-center justify-center text-[var(--color-text-muted)] text-center px-6">
                  Click generate to let AI write a personalized cover letter based on the job description and your skills.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
