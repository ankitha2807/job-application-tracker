import { Calendar, Building, Edit2, Trash2, FilePenLine, Eye, Edit3, Copy } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function JobCard({ job, onEdit, onDelete, onGenerateLetter, onViewLetter, onEditLetter, onOpenTemplate }) {
  const formattedDate = new Date(job.dateApplied).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="glass-panel p-4 sm:p-5 group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full mix-blend-overlay filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="flex justify-between items-start mb-4 gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">{job.role}</h3>
          <div className="flex flex-wrap items-center gap-2 text-[var(--color-text-muted)] text-sm">
            <span className="flex items-center gap-1">
              <Building size={14} />
              <span className="line-clamp-1">{job.company}</span>
            </span>
            {job.salary && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-success)]/10 px-2 py-1 text-[var(--color-success)] text-[11px]">
                <span>{job.salary}</span>
              </span>
            )}
            {job.coverLetter && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-primary)]/10 px-2 py-1 text-[var(--color-primary)] text-[11px]">
                <FilePenLine size={12} />
                Saved letter
              </span>
            )}
          </div>
        </div>
        <StatusBadge status={job.status} />
      </div>

      {job.description ? (
        <p className="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-2">
          {job.description}
        </p>
      ) : (
        <p className="text-sm text-[var(--color-text-muted)]/50 mb-4 italic">
          No description provided.
        </p>
      )}

      <div className="space-y-1.5 text-xs text-slate-400 mb-5">
        <div className="flex items-center gap-1.5">
          <Calendar size={14} />
          <span>Applied: {formattedDate}</span>
        </div>
        {job.dateInterviewScheduled && (
          <div className="flex items-center gap-1.5 text-[var(--color-info)]">
            <Calendar size={14} />
            <span>Interview: {new Date(job.dateInterviewScheduled).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
        )}
        {job.dateOfferReceived && (
          <div className="flex items-center gap-1.5 text-[var(--color-success)]">
            <Calendar size={14} />
            <span>Offer: {new Date(job.dateOfferReceived).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
        )}
        {job.dateRejected && (
          <div className="flex items-center gap-1.5 text-[var(--color-danger)]">
            <Calendar size={14} />
            <span>Rejected: {new Date(job.dateRejected).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)] mt-auto relative z-10">
        <div className="flex items-center gap-2 flex-nowrap overflow-x-auto">
          <button 
            onClick={() => onEdit(job)}
            className="p-1.5 text-slate-400 hover:text-[var(--color-info)] hover:bg-[var(--color-info)]/10 rounded transition-colors"
            title="Edit Application"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => onDelete(job.id)}
            className="p-1.5 text-slate-400 hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 rounded transition-colors"
            title="Delete Application"
          >
            <Trash2 size={16} />
          </button>
          <button 
            onClick={() => onOpenTemplate(job)}
            className="p-1.5 text-slate-400 hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded transition-colors"
            title="Use Cover Letter Template"
          >
            <Copy size={16} />
          </button>
          {job.coverLetter && (
            <>
              <button 
                onClick={() => onViewLetter(job)}
                className="p-1.5 text-slate-400 hover:text-[var(--color-success)] hover:bg-[var(--color-success)]/10 rounded transition-colors"
                title="View Saved Cover Letter"
              >
                <Eye size={16} />
              </button>
              <button 
                onClick={() => onEditLetter(job)}
                className="p-1.5 text-slate-400 hover:text-[var(--color-warning)] hover:bg-[var(--color-warning)]/10 rounded transition-colors"
                title="Edit Cover Letter"
              >
                <Edit3 size={16} />
              </button>
            </>
          )}
        </div>
        
        <button 
          onClick={() => onGenerateLetter(job)}
          className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20 px-3 py-1.5 rounded-md transition-colors"
        >
          <FilePenLine size={14} />
          <span className="hidden sm:inline">AI Letter</span>
        </button>
      </div>
    </div>
  );
}
