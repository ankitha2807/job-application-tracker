import { Briefcase, LogOut, Plus, FilePenLine } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Header({ onAddJob, onTemplates }) {
  const { user, logout } = useAuth();
  const displayName = user?.fullName?.split(' ')[0] || 'Applicant';

  return (
    <header className="glass-panel sticky top-0 z-50 mb-8 border-t-0 border-x-0 rounded-none rounded-b-2xl shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] text-white shadow-lg">
            <Briefcase size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Job Tracker</h1>
            <p className="text-sm text-[var(--color-text-muted)]">Welcome back, {displayName}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={onTemplates} className="btn-secondary py-2 px-4 text-sm">
            <FilePenLine size={18} />
            <span className="hidden sm:inline">Templates</span>
          </button>
          <button onClick={onAddJob} className="btn-primary py-2 px-4 text-sm">
            <Plus size={18} />
            <span className="hidden sm:inline">Add Application</span>
          </button>
          <div className="h-6 w-px bg-[var(--color-border)]"></div>
          <button
            onClick={logout}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-danger)] transition-colors p-2 rounded-lg hover:bg-[var(--color-danger)]/10"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
