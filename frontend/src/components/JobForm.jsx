import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function JobForm({ job, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    salary: '',
    status: 'SAVED',
    description: '',
    dateApplied: new Date().toISOString().split('T')[0],
    dateInterviewScheduled: '',
    dateOfferReceived: '',
    dateRejected: '',
    interviewNotes: '',
    rejectionReason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (job) {
      setFormData({
        ...job,
        salary: job.salary || '',
        dateApplied: job.dateApplied ? new Date(job.dateApplied).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        dateInterviewScheduled: job.dateInterviewScheduled ? new Date(job.dateInterviewScheduled).toISOString().split('T')[0] : '',
        dateOfferReceived: job.dateOfferReceived ? new Date(job.dateOfferReceived).toISOString().split('T')[0] : '',
        dateRejected: job.dateRejected ? new Date(job.dateRejected).toISOString().split('T')[0] : '',
        interviewNotes: job.interviewNotes || '',
        rejectionReason: job.rejectionReason || ''
      });
    } else {
      setFormData({
        company: '',
        role: '',
        salary: '',
        status: 'SAVED',
        description: '',
        dateApplied: new Date().toISOString().split('T')[0],
        dateInterviewScheduled: '',
        dateOfferReceived: '',
        dateRejected: '',
        interviewNotes: '',
        rejectionReason: ''
      });
    }
  }, [job, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSave(formData);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="glass-panel w-full max-w-2xl relative z-10 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5 sticky top-0 bg-[var(--color-surface)]/80 backdrop-blur -m-6 p-6 pb-5 z-10">
          <h2 className="text-xl font-bold">{job ? 'Edit Application' : 'Add Application'}</h2>
          <button onClick={onClose} className="p-2 text-[var(--color-text-muted)] hover:text-white transition-colors rounded-full hover:bg-white/5">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-text">Company Name</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="input-field"
              placeholder="e.g. Google"
            />
          </div>

          <div>
            <label className="label-text">Role / Title</label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="input-field"
              placeholder="e.g. Frontend Engineer"
            />
          </div>

          <div>
            <label className="label-text">Salary</label>
            <input
              type="text"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              className="input-field"
              placeholder="e.g. $90,000 or 50k-70k"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-text">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="input-field"
              >
                <option value="SAVED">Saved</option>
                <option value="APPLIED">Applied</option>
                <option value="INTERVIEW">Interviewing</option>
                <option value="OFFER">Offer</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
            <div>
              <label className="label-text">Date Applied</label>
              <input
                type="date"
                required
                value={formData.dateApplied}
                onChange={(e) => setFormData({ ...formData, dateApplied: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="label-text">Job Description</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field h-20 resize-none"
              placeholder="Paste job description here..."
            />
          </div>

          <div className="border-t border-[var(--color-border)] pt-4 mt-4">
            <h3 className="text-sm font-semibold text-[var(--color-text-muted)] mb-3 uppercase tracking-wide">Timeline & Progress</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-text">Interview Scheduled</label>
                <input
                  type="date"
                  value={formData.dateInterviewScheduled}
                  onChange={(e) => setFormData({ ...formData, dateInterviewScheduled: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-text">Offer Received</label>
                <input
                  type="date"
                  value={formData.dateOfferReceived}
                  onChange={(e) => setFormData({ ...formData, dateOfferReceived: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="label-text">Interview Notes</label>
              <textarea
                value={formData.interviewNotes || ''}
                onChange={(e) => setFormData({ ...formData, interviewNotes: e.target.value })}
                className="input-field h-16 resize-none"
                placeholder="e.g. Topics discussed, interviewer names, follow-up items..."
              />
            </div>

            <div className="mt-4">
              <label className="label-text">Rejection Date</label>
              <input
                type="date"
                value={formData.dateRejected}
                onChange={(e) => setFormData({ ...formData, dateRejected: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="mt-4">
              <label className="label-text">Rejection Reason</label>
              <textarea
                value={formData.rejectionReason || ''}
                onChange={(e) => setFormData({ ...formData, rejectionReason: e.target.value })}
                className="input-field h-16 resize-none"
                placeholder="What feedback or reason was given?"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 sticky bottom-0 bg-[var(--color-surface)]/80 backdrop-blur -m-6 p-6 pt-4 -mt-4">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? 'Saving...' : 'Save Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
