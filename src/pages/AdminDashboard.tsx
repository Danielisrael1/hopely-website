import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button3D from '../components/Button3D';

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

const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    image: '',
    status: 'planning',
    location: '',
    beneficiaries: 0,
    dateStarted: '',
    budget: 0,
    raised: 0
  });

  // Sample projects data - in a real app, this would come from an API
  useEffect(() => {
    const sampleProjects: Project[] = [
      {
        id: '1',
        title: 'Clean Water Initiative',
        description: 'Providing clean water access to rural communities through borehole drilling and water purification systems.',
        image: '/img/IMG_4149.png',
        status: 'ongoing',
        location: 'Kampala, Uganda',
        beneficiaries: 500,
        dateStarted: '2024-01-15',
        budget: 15000,
        raised: 12000
      },
      {
        id: '2',
        title: 'School Feeding Program',
        description: 'Daily nutritious meals for children in primary schools to improve attendance and learning outcomes.',
        image: '/img/IMG_4178.png',
        status: 'completed',
        location: 'Jinja, Uganda',
        beneficiaries: 300,
        dateStarted: '2023-09-01',
        dateCompleted: '2024-06-30',
        budget: 8000,
        raised: 8000
      },
      {
        id: '3',
        title: 'Digital Learning Center',
        description: 'Establishing computer labs and internet connectivity in rural schools to bridge the digital divide.',
        image: '/img/hope.jpg',
        status: 'planning',
        location: 'Gulu, Uganda',
        beneficiaries: 200,
        dateStarted: '2024-10-01',
        budget: 20000,
        raised: 5000
      }
    ];
    setProjects(sampleProjects);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'beneficiaries' || name === 'budget' || name === 'raised' 
        ? parseInt(value) || 0 
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProject) {
      // Update existing project
      setProjects(prev => prev.map(project => 
        project.id === editingProject.id 
          ? { ...project, ...formData }
          : project
      ));
    } else {
      // Add new project
      const newProject: Project = {
        id: Date.now().toString(),
        title: formData.title || '',
        description: formData.description || '',
        image: formData.image || '/img/hope.jpg',
        status: formData.status || 'planning',
        location: formData.location || '',
        beneficiaries: formData.beneficiaries || 0,
        dateStarted: formData.dateStarted || new Date().toISOString().split('T')[0],
        budget: formData.budget || 0,
        raised: formData.raised || 0
      };
      setProjects(prev => [...prev, newProject]);
    }

    // Reset form
    setFormData({
      title: '',
      description: '',
      image: '',
      status: 'planning',
      location: '',
      beneficiaries: 0,
      dateStarted: '',
      budget: 0,
      raised: 0
    });
    setShowAddForm(false);
    setEditingProject(null);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData(project);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(project => project.id !== id));
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      status: 'planning',
      location: '',
      beneficiaries: 0,
      dateStarted: '',
      budget: 0,
      raised: 0
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Header Section */}
        <section className="bg-slate-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-white/80">
                  Manage projects and monitor their progress
                </p>
              </div>
              <Button3D 
                text="Add New Project" 
                size="medium" 
                variant="pink"
                onClick={() => setShowAddForm(true)}
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Projects</h3>
                <p className="text-3xl font-bold text-slate-800">{projects.length}</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Ongoing</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {projects.filter(p => p.status === 'ongoing').length}
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Completed</h3>
                <p className="text-3xl font-bold text-green-600">
                  {projects.filter(p => p.status === 'completed').length}
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Budget</h3>
                <p className="text-3xl font-bold text-hopely-pink">
                  ${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Table */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-16">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Budget
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {projects.map((project) => (
                      <tr key={project.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img className="h-10 w-10 rounded-lg object-cover" src={project.image} alt={project.title} />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{project.title}</div>
                              <div className="text-sm text-gray-500">{project.beneficiaries} beneficiaries</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {project.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${project.budget.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-hopely-pink h-2 rounded-full"
                              style={{ width: `${Math.min((project.raised / project.budget) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            ${project.raised.toLocaleString()} / ${project.budget.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleEdit(project)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Add/Edit Project Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full my-8">
              <h3 className="text-2xl font-bold font-heading text-slate-800 mb-6">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-hopely-pink focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-hopely-pink focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-hopely-pink focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-hopely-pink focus:border-transparent"
                    >
                      <option value="planning">Planning</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Beneficiaries
                    </label>
                    <input
                      type="number"
                      name="beneficiaries"
                      value={formData.beneficiaries}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-hopely-pink focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="dateStarted"
                      value={formData.dateStarted}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-hopely-pink focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget ($)
                    </label>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-hopely-pink focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount Raised ($)
                    </label>
                    <input
                      type="number"
                      name="raised"
                      value={formData.raised}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-hopely-pink focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="/img/project-image.jpg"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-hopely-pink focus:border-transparent"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-hopely-pink text-white py-3 rounded-lg font-semibold hover:bg-hopely-pink-dark transition-colors"
                  >
                    {editingProject ? 'Update Project' : 'Add Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;