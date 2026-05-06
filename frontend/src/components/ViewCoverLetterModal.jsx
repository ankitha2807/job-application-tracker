import { useState } from 'react';
import { X, FilePenLine, Copy, CheckCircle2, Download } from 'lucide-react';

export default function ViewCoverLetterModal({ job, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !job) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(job.coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    // Create a simple HTML document for PDF generation
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Cover Letter - ${job.role} at ${job.company}</title>
          <style>
            body { font-family: 'Times New Roman', serif; margin: 40px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; }
            .content { white-space: pre-wrap; margin-top: 20px; }
            .job-info { margin-bottom: 20px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Cover Letter</h1>
            <div class="job-info">
              <strong>${job.role}</strong><br>
              ${job.company}<br>
              Applied: ${new Date(job.dateApplied).toLocaleDateString()}
            </div>
          </div>
          <div class="content">${job.coverLetter}</div>
        </body>
      </html>
    `;

    // Create a blob and download it
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Cover_Letter_${job.company}_${job.role}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="glass-panel w-full max-w-4xl h-[85vh] flex flex-col relative z-10 overflow-hidden shadow-2xl">
        
        <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-success)]/20 flex items-center justify-center text-[var(--color-success)] shadow-inner">
              <FilePenLine size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Saved Cover Letter</h2>
              <p className="text-sm text-[var(--color-text-muted)]">for {job.role} at {job.company}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[var(--color-text-muted)] hover:text-white transition-colors rounded-full hover:bg-white/5">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-[var(--color-text-muted)]">Generated Cover Letter</span>
            <div className="flex gap-2">
              <button onClick={handleDownloadPDF} className="text-[var(--color-text-muted)] hover:text-[var(--color-success)] flex items-center gap-1.5 text-xs bg-[var(--color-success)]/10 px-3 py-1 rounded-md hover:bg-[var(--color-success)]/20 transition-colors">
                <Download size={14} />
                Download
              </button>
              <button onClick={handleCopy} className="text-[var(--color-text-muted)] hover:text-white flex items-center gap-1.5 text-xs bg-white/5 px-3 py-1 rounded-md hover:bg-white/10 transition-colors">
                {copied ? <CheckCircle2 size={14} className="text-[var(--color-success)]" /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
          
          <div className="bg-[#0f172a]/30 border border-[var(--color-border)] rounded-xl p-6 overflow-y-auto max-h-[60vh]">
            <div className="text-sm whitespace-pre-wrap font-serif leading-relaxed text-slate-300">
              {job.coverLetter}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}