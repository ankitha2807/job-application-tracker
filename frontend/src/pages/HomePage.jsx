import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Sparkles, BarChart3, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handlePrimaryAction = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-[var(--color-primary)]/10 px-4 py-2 text-sm font-medium text-[var(--color-primary)]">
              AI-powered job search tracking for modern applicants
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Track applications, generate tailored cover letters, and win more interviews.</h1>
              <p className="max-w-2xl text-[var(--color-text-muted)] leading-8">
                Job Application Tracker brings all your applications into one secure dashboard and uses AI to create polished cover letters from any job description.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button onClick={handlePrimaryAction} className="btn-primary px-6 py-4 text-base">
                {isAuthenticated ? 'Go to Dashboard' : 'Create free account'}
              </button>
              <Link to="/login" className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">
                Already have an account? Sign in
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="glass-panel border border-[var(--color-border)] p-5">
                <p className="text-sm text-[var(--color-text-muted)]">Keep all applications in one place</p>
                <p className="mt-3 text-lg font-semibold">Kanban-style status board for every stage.</p>
              </div>
              <div className="glass-panel border border-[var(--color-border)] p-5">
                <p className="text-sm text-[var(--color-text-muted)]">Write better cover letters fast</p>
                <p className="mt-3 text-lg font-semibold">AI generates personalized letters from your job descriptions.</p>
              </div>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.75rem] bg-[#111827] p-6 border border-[var(--color-border)] shadow-lg">
                <p className="text-sm text-[var(--color-text-muted)]">Ready to get organized?</p>
                <p className="mt-3 text-lg font-semibold">Add applications faster and never lose track.</p>
              </div>
              <div className="rounded-[1.75rem] bg-[#111827] p-6 border border-[var(--color-border)] shadow-lg">
                <p className="text-sm text-[var(--color-text-muted)]">Built for job seekers</p>
                <p className="mt-3 text-lg font-semibold">Save notes, track progress, and follow up with confidence.</p>
              </div>
              <div className="rounded-[1.75rem] bg-[#111827] p-6 border border-[var(--color-border)] shadow-lg">
                <p className="text-sm text-[var(--color-text-muted)]">Launch your next application</p>
                <p className="mt-3 text-lg font-semibold">Generate tailored cover letters in seconds.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[var(--color-border)] bg-[#0f172a]/60 p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">Overview</span>
              <div className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-[var(--color-primary)] text-xs font-semibold">Built with React + Spring Boot</div>
            </div>
            <div className="space-y-6">
              <FeatureCard icon={Sparkles} title="Fast setup" text="Secure signup, job CRUD, and AI cover letters in one workflow." />
              <FeatureCard icon={BarChart3} title="Live analytics" text="See total applications, interviews, and offers at a glance." />
              <FeatureCard icon={MessageCircle} title="Smart follow-up" text="Keep notes and remember which roles are at each stage." />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, text }) {
  return (
    <div className="flex items-start gap-4 rounded-3xl bg-[#111827] p-5 border border-[var(--color-border)] shadow-inner">
      <div className="grid place-items-center h-12 w-12 rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
        <Icon size={20} />
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">{text}</p>
      </div>
    </div>
  );
}
