import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, FilePenLine, Eye, EyeOff, Copy } from 'lucide-react';
import { getTemplates, getMyTemplates, createTemplate, updateTemplate, deleteTemplate } from '../services/api';

export default function TemplateManager({ isOpen, onClose, onUseTemplate }) {
  const [templates, setTemplates] = useState([]);
  const [myTemplates, setMyTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchTemplates();
    }
  }, [isOpen]);

  const fetchTemplates = async () => {
    setIsLoading(true);
    try {
      const [allRes, myRes] = await Promise.all([
        getTemplates(),
        getMyTemplates()
      ]);
      setTemplates(allRes.data);
      setMyTemplates(myRes.data);
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTemplate = async (id) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        await deleteTemplate(id);
        await fetchTemplates();
      } catch (error) {
        console.error('Failed to delete template:', error);
        alert('Failed to delete template');
      }
    }
  };

  const handleUseTemplate = (template) => {
    onUseTemplate(template.templateContent);
    onClose();
  };

  const currentTemplates = activeTab === 'my' ? myTemplates : templates;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="glass-panel w-full max-w-6xl h-[85vh] flex flex-col relative z-10 overflow-hidden shadow-2xl">

        <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-success)]/20 flex items-center justify-center text-[var(--color-success)] shadow-inner">
              <FilePenLine size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Cover Letter Templates</h2>
              <p className="text-sm text-[var(--color-text-muted)]">Save and reuse your best cover letters</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg transition-colors"
            >
              <Plus size={16} />
              New Template
            </button>
            <button onClick={onClose} className="p-2 text-[var(--color-text-muted)] hover:text-white transition-colors rounded-full hover:bg-white/5">
              ×
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="p-5 h-full flex flex-col">
            <div className="flex gap-2 mb-4 shrink-0">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'all'
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'text-[var(--color-text-muted)] hover:text-white hover:bg-white/5'
                }`}
              >
                All Templates ({templates.length})
              </button>
              <button
                onClick={() => setActiveTab('my')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'my'
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'text-[var(--color-text-muted)] hover:text-white hover:bg-white/5'
                }`}
              >
                My Templates ({myTemplates.length})
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : currentTemplates.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 bg-[var(--color-surface)] rounded-full flex items-center justify-center mb-4 text-[var(--color-text-muted)] shadow-inner">
                    <FilePenLine size={32} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No templates yet</h3>
                  <p className="text-[var(--color-text-muted)] max-w-md">
                    {activeTab === 'my'
                      ? 'Create your first template to save time on future applications.'
                      : 'No public templates available yet.'
                    }
                  </p>
                  {activeTab === 'my' && (
                    <button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="mt-4 btn-primary px-6 py-2"
                    >
                      Create First Template
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentTemplates.map((template) => (
                    <div key={template.id} className="glass-panel p-4 group hover:-translate-y-1 transition-all duration-300">
                      <div className="flex items-start justify-between mb-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-white mb-1 line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">
                            {template.name}
                          </h3>
                          {template.isPublic && (
                            <span className="inline-flex items-center gap-1 text-xs text-[var(--color-success)]">
                              <Eye size={12} />
                              Public
                            </span>
                          )}
                        </div>
                        {activeTab === 'my' && (
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => setEditingTemplate(template)}
                              className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-info)] hover:bg-[var(--color-info)]/10 rounded"
                              title="Edit Template"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteTemplate(template.id)}
                              className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 rounded"
                              title="Delete Template"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}
                      </div>

                      {template.description && (
                        <p className="text-sm text-[var(--color-text-muted)] mb-3 line-clamp-2">
                          {template.description}
                        </p>
                      )}

                      <div className="text-xs text-[var(--color-text-muted)] mb-4">
                        {new Date(template.createdAt).toLocaleDateString()}
                      </div>

                      <button
                        onClick={() => handleUseTemplate(template)}
                        className="w-full flex items-center justify-center gap-2 text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20 px-3 py-2 rounded-md transition-colors"
                      >
                        <Copy size={14} />
                        Use Template
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <TemplateFormModal
        isOpen={isCreateModalOpen || editingTemplate !== null}
        template={editingTemplate}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingTemplate(null);
        }}
        onSave={async (templateData) => {
          try {
            if (editingTemplate) {
              await updateTemplate(editingTemplate.id, templateData);
            } else {
              await createTemplate(templateData);
            }
            await fetchTemplates();
            setIsCreateModalOpen(false);
            setEditingTemplate(null);
          } catch (error) {
            console.error('Failed to save template:', error);
            alert('Failed to save template');
          }
        }}
      />
    </div>
  );
}

function TemplateFormModal({ isOpen, template, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    templateContent: '',
    isPublic: false
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (template) {
      setFormData({
        name: template.name || '',
        description: template.description || '',
        templateContent: template.templateContent || '',
        isPublic: template.isPublic || false
      });
    } else {
      setFormData({
        name: '',
        description: '',
        templateContent: '',
        isPublic: false
      });
    }
  }, [template]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.templateContent.trim()) return;

    setIsSaving(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Failed to save template:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="glass-panel w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl">

        <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
          <h3 className="text-lg font-bold">
            {template ? 'Edit Template' : 'Create New Template'}
          </h3>
          <button onClick={onClose} className="p-2 text-[var(--color-text-muted)] hover:text-white transition-colors rounded-full hover:bg-white/5">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
              Template Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="input-field"
              placeholder="e.g., Software Engineer Template"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="input-field"
              placeholder="Brief description of this template"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
              Template Content *
            </label>
            <textarea
              value={formData.templateContent}
              onChange={(e) => setFormData({...formData, templateContent: e.target.value})}
              className="input-field min-h-[200px] font-serif"
              placeholder="Paste your cover letter content here..."
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPublic"
              checked={formData.isPublic}
              onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
              className="rounded border-[var(--color-border)] bg-[#0f172a]/50"
            />
            <label htmlFor="isPublic" className="text-sm text-[var(--color-text-muted)]">
              Make this template public (other users can see and use it)
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[var(--color-text-muted)] hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || !formData.name.trim() || !formData.templateContent.trim()}
              className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : (template ? 'Update Template' : 'Create Template')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}