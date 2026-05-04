import { useState, useEffect } from 'react';
import Header from '../components/Header';
import JobCard from '../components/JobCard';
import JobForm from '../components/JobForm';
import CoverLetterModal from '../components/CoverLetterModal';
import { getJobs, createJob, updateJob, deleteJob, getDashboardStats } from '../services/api';
import { Inbox } from 'lucide-react';

export default function DashboardPage() {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);
  const [isCoverLetterOpen, setIsCoverLetterOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetchJobs();
    fetchStats();
  }, []);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const res = await getJobs();
      setJobs(res.data);
    } catch (err) {
      console.error('Failed to fetch jobs', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await getDashboardStats();
      setStats(res.data);
    } catch (err) {
      console.error('Failed to fetch dashboard stats', err);
    }
  };

  const handleAddClick = () => {
    setSelectedJob(null);
    setIsJobFormOpen(true);
  };

  const handleEditClick = (job) => {
    setSelectedJob(job);
    setIsJobFormOpen(true);
  };

  const handleGenerateLetterClick = (job) => {
    setSelectedJob(job);
    setIsCoverLetterOpen(true);
  };

  const handleSaveJob = async (jobData) => {
    try {
      if (selectedJob) {
        await updateJob(selectedJob.id, jobData);
      } else {
        await createJob(jobData);
      }
      setIsJobFormOpen(false);
      fetchJobs();
      fetchStats();
    } catch (err) {
      console.error('Failed to save job', err);
      alert('Error saving job. Please check console.');
    }
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await deleteJob(id);
        fetchJobs();
        fetchStats();
      } catch (err) {
        console.error('Failed to delete job', err);
        alert('Error deleting job.');
      }
    }
  };

  const statusColumns = [
    { key: 'SAVED', label: 'Saved', color: 'bg-slate-700' },
    { key: 'APPLIED', label: 'Applied', color: 'bg-blue-600' },
    { key: 'INTERVIEW', label: 'Interview', color: 'bg-violet-600' },
    { key: 'OFFER', label: 'Offer', color: 'bg-emerald-600' },
    { key: 'REJECTED', label: 'Rejected', color: 'bg-rose-600' },
  ];

  const jobsByStatus = jobs.reduce((acc, job) => {
    if (!acc[job.status]) acc[job.status] = [];
    acc[job.status].push(job);
    return acc;
  }, {
    SAVED: [],
    APPLIED: [],
    INTERVIEW: [],
    OFFER: [],
    REJECTED: [],
  });

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header onAddJob={handleAddClick} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center glass-panel max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-[var(--color-surface)] rounded-full flex items-center justify-center mb-6 text-[var(--color-text-muted)] shadow-inner">
              <Inbox size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-2">No applications yet</h2>
            <p className="text-[var(--color-text-muted)] max-w-md mb-8">
              Keep track of your job search by adding your first application. You can track status, save descriptions, and generate AI cover letters.
            </p>
            <button onClick={handleAddClick} className="btn-primary px-6 py-3">
              Add First Application
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {stats && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="glass-panel p-6 shadow-xl border border-[var(--color-border)]">
                  <p className="text-sm uppercase tracking-wider text-[var(--color-text-muted)]">Total applications</p>
                  <p className="mt-4 text-3xl font-semibold">{stats.totalApplications}</p>
                </div>
                <div className="glass-panel p-6 shadow-xl border border-[var(--color-border)]">
                  <p className="text-sm uppercase tracking-wider text-[var(--color-text-muted)]">Interviews</p>
                  <p className="mt-4 text-3xl font-semibold">{stats.interviewCount}</p>
                </div>
                <div className="glass-panel p-6 shadow-xl border border-[var(--color-border)]">
                  <p className="text-sm uppercase tracking-wider text-[var(--color-text-muted)]">Offers</p>
                  <p className="mt-4 text-3xl font-semibold">{stats.offerCount}</p>
                </div>
              </div>
            )}

            <div className="glass-panel p-6 border border-[var(--color-border)]">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">Kanban-style Status Board</h2>
                  <p className="text-sm text-[var(--color-text-muted)]">Organize your applications by status and act on the ones that need the next follow-up.</p>
                </div>
                <button onClick={handleAddClick} className="btn-primary px-5 py-2">
                  Add New Application
                </button>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
                {statusColumns.map((column) => (
                  <div key={column.key} className="bg-[#0f172a] rounded-3xl p-4 border border-[var(--color-border)] shadow-inner min-h-[320px]">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-[var(--color-text-muted)]">{column.label}</p>
                        <p className="mt-2 text-2xl font-semibold">{jobsByStatus[column.key]?.length || 0}</p>
                      </div>
                      <span className={`${column.color} w-10 h-10 rounded-full`} />
                    </div>
                    <div className="space-y-3 overflow-y-auto max-h-[240px] pr-1">
                      {jobsByStatus[column.key]?.length > 0 ? (
                        jobsByStatus[column.key].map((job) => (
                          <div key={job.id} className="bg-[#111827] p-4 rounded-2xl border border-[var(--color-border)]">
                            <h3 className="text-sm font-semibold text-white truncate">{job.role}</h3>
                            <p className="text-[var(--color-text-muted)] text-xs truncate">{job.company}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <button
                                onClick={() => handleEditClick(job)}
                                className="px-3 py-1 text-[var(--color-text)] bg-white/5 rounded-full text-xs hover:bg-white/10"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleGenerateLetterClick(job)}
                                className="px-3 py-1 text-[var(--color-text)] bg-[var(--color-primary)]/15 rounded-full text-xs hover:bg-[var(--color-primary)]/25"
                              >
                                AI Letter
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-[var(--color-text-muted)]">No applications in this column yet.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <JobForm 
        isOpen={isJobFormOpen} 
        job={selectedJob} 
        onClose={() => setIsJobFormOpen(false)} 
        onSave={handleSaveJob}
      />

      <CoverLetterModal
        isOpen={isCoverLetterOpen}
        job={selectedJob}
        onClose={() => setIsCoverLetterOpen(false)}
      />
    </div>
  );
}
