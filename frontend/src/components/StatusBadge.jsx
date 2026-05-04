import { CheckCircle2, Clock, XCircle, FileText, Bookmark } from 'lucide-react';

const statusConfig = {
  SAVED: { color: 'text-slate-400', bg: 'bg-slate-400/10', border: 'border-slate-400/20', icon: Bookmark, label: 'Saved' },
  APPLIED: { color: 'text-[var(--color-info)]', bg: 'bg-[var(--color-info)]/10', border: 'border-[var(--color-info)]/20', icon: FileText, label: 'Applied' },
  INTERVIEW: { color: 'text-[var(--color-warning)]', bg: 'bg-[var(--color-warning)]/10', border: 'border-[var(--color-warning)]/20', icon: Clock, label: 'Interviewing' },
  OFFER: { color: 'text-[var(--color-success)]', bg: 'bg-[var(--color-success)]/10', border: 'border-[var(--color-success)]/20', icon: CheckCircle2, label: 'Offer Received' },
  REJECTED: { color: 'text-[var(--color-danger)]', bg: 'bg-[var(--color-danger)]/10', border: 'border-[var(--color-danger)]/20', icon: XCircle, label: 'Rejected' },
};

export default function StatusBadge({ status, className = '' }) {
  const config = statusConfig[status] || statusConfig.SAVED;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.color} ${config.border} ${className}`}>
      <Icon size={14} />
      {config.label}
    </span>
  );
}
