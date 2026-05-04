import { Calendar, Building, Edit2, Trash2, FilePenLine } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function JobCard({ job, onEdit, onDelete, onGenerateLetter }) {
  const formattedDate = new Date(job.dateApplied).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="glass-panel p-5 group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col h-full">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full mix-blend-overlay filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">{job.role}</h3>
          <div className="flex items-center text-[var(--color-text-muted)] text-sm gap-1.5">
            <Building size={14} />
            <span className="line-clamp-1">{job.company}</span>
          </div>
        </div>
        <StatusBadge status={job.status} />
      </div>

      {job.description ? (
        <p className="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-2 h-10">
          {job.description}
        </p>
      ) : (
        <p className="text-sm text-[var(--color-text-muted)]/50 mb-4 h-10 italic">
          No description provided.
        </p>
      )}

      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-5">
        <Calendar size={14} />
        <span>Applied: {formattedDate}</span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)] mt-auto relative z-10">
        <div className="flex gap-2">
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
        </div>
        
        <button 
          onClick={() => onGenerateLetter(job)}
          className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20 px-3 py-1.5 rounded-md transition-colors"
        >
          <FilePenLine size={14} />
          Cover Letter
        </button>
      </div>
    </div>
  );
}
