import { useState, useEffect } from 'react';
import Header from '../components/Header';
import JobCard from '../components/JobCard';
import JobForm from '../components/JobForm';
import CoverLetterModal from '../components/CoverLetterModal';
import ViewCoverLetterModal from '../components/ViewCoverLetterModal';
import EditCoverLetterModal from '../components/EditCoverLetterModal';
import TemplateManager from '../components/TemplateManager';
import { getJobs, createJob, updateJob, deleteJob, getDashboardStats, getLetterAnalytics } from '../services/api';
import { Inbox, BarChart3, FilePenLine, Eye, Edit3 } from 'lucide-react';

export default function DashboardPage() {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);
  const [isCoverLetterOpen, setIsCoverLetterOpen] = useState(false);
  const [isViewLetterOpen, setIsViewLetterOpen] = useState(false);
  const [isEditLetterOpen, setIsEditLetterOpen] = useState(false);
  const [isTemplateManagerOpen, setIsTemplateManagerOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedTemplateContent, setSelectedTemplateContent] = useState('');

  useEffect(() => {
    fetchJobs();
    fetchStats();
    fetchAnalytics();
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

  const fetchAnalytics = async () => {
    try {
      const res = await getLetterAnalytics();
      setAnalytics(res.data);
    } catch (err) {
      console.error('Failed to fetch analytics', err);
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

  const handleViewLetterClick = (job) => {
    setSelectedJob(job);
    setIsViewLetterOpen(true);
  };

  const handleEditLetterClick = (job) => {
    setSelectedJob(job);
    setIsEditLetterOpen(true);
  };

  const handleTemplateManagerClick = () => {
    setSelectedJob(null);
    setSelectedTemplateContent('');
    setIsTemplateManagerOpen(true);
  };

  const handleOpenTemplateForJob = (job) => {
    setSelectedJob(job);
    setSelectedTemplateContent('');
    setIsTemplateManagerOpen(true);
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

  const handleSaveCoverLetter = async (coverLetter) => {
    try {
      const updatedJob = { ...selectedJob, coverLetter };
      await updateJob(selectedJob.id, updatedJob);
      setSelectedJob(updatedJob);
      fetchJobs();
      fetchStats();
      fetchAnalytics();
      return true;
    } catch (err) {
      console.error('Failed to save cover letter', err);
      return false;
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

  const filteredJobs = jobs.filter((job) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      job.company.toLowerCase().includes(searchLower) ||
      job.role.toLowerCase().includes(searchLower);

    const matchesStatus = filterStatus === 'ALL' || job.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const jobsByStatus = filteredJobs.reduce((acc, job) => {
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
      <Header onAddJob={handleAddClick} onTemplates={handleTemplateManagerClick} />

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

            {analytics && (
              <div className="glass-panel p-6 border border-[var(--color-border)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-info)]/20 flex items-center justify-center text-[var(--color-info)]">
                    <BarChart3 size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Cover Letter Analytics</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">Performance insights for your cover letters</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[var(--color-primary)]">{analytics.totalWithLetters}</p>
                    <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Applications with Letters</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[var(--color-success)]">{analytics.interviewsWithLetters}</p>
                    <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Interviews</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[var(--color-warning)]">{analytics.offersWithLetters}</p>
                    <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Offers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[var(--color-info)]">{analytics.avgResponseTime.toFixed(1)} days</p>
                    <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Avg Response Time</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-[var(--color-text-muted)]">Interview Rate: </span>
                      <span className="font-semibold text-[var(--color-success)]">{analytics.interviewRate.toFixed(1)}%</span>
                    </div>
                    <div>
                      <span className="text-[var(--color-text-muted)]">Offer Rate: </span>
                      <span className="font-semibold text-[var(--color-warning)]">{analytics.offerRate.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="glass-panel p-6 border border-[var(--color-border)]">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">Kanban-style Status Board</h2>
                  <p className="text-sm text-[var(--color-text-muted)]">Organize your applications by status and act on the ones that need the next follow-up.</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_auto] w-full">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by company or role"
                      className="input-field w-full"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="input-field w-full"
                    >
                      <option value="ALL">All statuses</option>
                      <option value="SAVED">Saved</option>
                      <option value="APPLIED">Applied</option>
                      <option value="INTERVIEW">Interview</option>
                      <option value="OFFER">Offer</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </div>
                  <button onClick={handleAddClick} className="btn-primary px-5 py-2 w-full sm:w-auto">
                    Add New Application
                  </button>
                </div>
              </div>

              <div className="pb-2">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-5">
                {statusColumns.map((column) => (
                  <div key={column.key} className="bg-[#0f172a] rounded-3xl p-4 border border-[var(--color-border)] shadow-inner min-h-[360px] flex flex-col">
                    <div className="flex items-center justify-between mb-4 flex-shrink-0">
                      <div>
                        <p className="text-sm text-[var(--color-text-muted)]">{column.label}</p>
                        <p className="mt-2 text-2xl font-semibold">{jobsByStatus[column.key]?.length || 0}</p>
                      </div>
                      <span className={`${column.color} w-10 h-10 rounded-full flex-shrink-0`} />
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-0">
                      {jobsByStatus[column.key]?.length > 0 ? (
                        jobsByStatus[column.key].map((job) => (
                          <JobCard
                            key={job.id}
                            job={job}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteJob}
                            onGenerateLetter={handleGenerateLetterClick}
                            onViewLetter={handleViewLetterClick}
                            onEditLetter={handleEditLetterClick}
                            onOpenTemplate={handleOpenTemplateForJob}
                          />
                        ))
                      ) : (
                        <div className="flex items-center justify-center h-32 text-center">
                          <p className="text-sm text-[var(--color-text-muted)]">No applications in this column yet.</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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
        onSaveCoverLetter={handleSaveCoverLetter}
        templateContent={selectedTemplateContent}
      />

      <ViewCoverLetterModal
        isOpen={isViewLetterOpen}
        job={selectedJob}
        onClose={() => setIsViewLetterOpen(false)}
      />

      <EditCoverLetterModal
        isOpen={isEditLetterOpen}
        job={selectedJob}
        onClose={() => setIsEditLetterOpen(false)}
        onSave={handleSaveCoverLetter}
      />

      <TemplateManager
        isOpen={isTemplateManagerOpen}
        onClose={() => setIsTemplateManagerOpen(false)}
        onUseTemplate={(templateContent) => {
          if (!selectedJob) {
            alert('Please select a job first by clicking the job card, then use the template.');
            return;
          }
          setSelectedTemplateContent(templateContent);
          setIsTemplateManagerOpen(false);
          setIsCoverLetterOpen(true);
        }}
      />
    </div>
  );
}
