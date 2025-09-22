import React, { useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  status: 'ongoing' | 'completed' | 'planning';
  location: string;
  beneficiaries: number;
  dateStarted: string;
  dateCompleted?: string;
  budget: number;
  raised: number;
}

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Omit<Project, 'id'>) => void;
  project?: Project | null;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ isOpen, onClose, onSave, project }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    status: 'planning' as 'ongoing' | 'completed' | 'planning',
    location: '',
    beneficiaries: 0,
    dateStarted: '',
    dateCompleted: '',
    budget: 0,
    raised: 0,
  });

  const [loading, setLoading] = useState(false);

  // Update form data when project prop changes
  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        image: project.image,
        status: project.status,
        location: project.location,
        beneficiaries: project.beneficiaries,
        dateStarted: project.dateStarted,
        dateCompleted: project.dateCompleted || '',
        budget: project.budget,
        raised: project.raised,
      });
    } else {
      // Reset form for new project
      setFormData({
        title: '',
        description: '',
        image: '',
        status: 'planning' as 'ongoing' | 'completed' | 'planning',
        location: '',
        beneficiaries: 0,
        dateStarted: '',
        dateCompleted: '',
        budget: 0,
        raised: 0,
      });
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Project Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hopely-pink focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hopely-pink focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hopely-pink focus:border-transparent"
                placeholder="/img/project-image.jpg"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hopely-pink focus:border-transparent"
              >
                <option value="planning">Planning</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hopely-pink focus:border-transparent"
                placeholder="City, Uganda"
              />
            </div>

            <div>
              <label htmlFor="beneficiaries" className="block text-sm font-medium text-gray-700 mb-1">
                Beneficiaries *
              </label>
              <input
                type="number"
                id="beneficiaries"
                name="beneficiaries"
                value={formData.beneficiaries}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hopely-pink focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="dateStarted" className="block text-sm font-medium text-gray-700 mb-1">
                Date Started *
              </label>
              <input
                type="date"
                id="dateStarted"
                name="dateStarted"
                value={formData.dateStarted}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hopely-pink focus:border-transparent"
              />
            </div>

            {formData.status === 'completed' && (
              <div>
                <label htmlFor="dateCompleted" className="block text-sm font-medium text-gray-700 mb-1">
                  Date Completed
                </label>
                <input
                  type="date"
                  id="dateCompleted"
                  name="dateCompleted"
                  value={formData.dateCompleted}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hopely-pink focus:border-transparent"
                />
              </div>
            )}

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                Budget (USD) *
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hopely-pink focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="raised" className="block text-sm font-medium text-gray-700 mb-1">
                Amount Raised (USD) *
              </label>
              <input
                type="number"
                id="raised"
                name="raised"
                value={formData.raised}
                onChange={handleChange}
                required
                min="0"
                max={formData.budget}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hopely-pink focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-hopely-pink text-white rounded-md hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;