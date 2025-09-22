import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Button3D from '../components/Button3D';
import LoginModal from '../components/LoginModal';
import ProjectForm from '../components/ProjectForm';
import ProjectDetailsModal from '../components/ProjectDetailsModal';
import { useAuth } from '../hooks/useAuth';
import { projectService, type Project } from '../services/projectService';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed' | 'planning'>('all');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const projectsData = await projectService.getProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback to sample data if Appwrite is not configured
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
    }
  };

  // Project management functions
  const handleSaveProject = async (projectData: Omit<Project, 'id'>) => {
    try {
      if (editingProject) {
        // Update existing project
        await projectService.updateProject(editingProject.id, projectData);
      } else {
        // Add new project
        await projectService.createProject(projectData);
      }
      // Refresh the projects list
      await fetchProjects();
      setEditingProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project. Please try again.');
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.deleteProject(projectId);
        // Refresh the projects list
        await fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project. Please try again.');
      }
    }
  };

  const handleLearnMore = (project: Project) => {
    setSelectedProject(project);
    setShowProjectDetails(true);
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressPercentage = (raised: number, budget: number) => {
    return Math.min((raised / budget) * 100, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-800 to-slate-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-16 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
              Our Projects
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Discover the impactful projects we're working on to transform lives and communities across Uganda
            </p>
            
            {/* Admin Controls */}
            <div className="flex justify-center">
              {isAuthenticated ? (
                <div className="flex gap-4 items-center">
                  <button
                    onClick={() => {
                      setEditingProject(null);
                      setShowProjectForm(true);
                    }}
                    className="bg-white text-hopely-pink px-6 py-2 rounded-md hover:bg-gray-100 transition-colors font-semibold"
                  >
                    Add New Project
                  </button>
                  <button
                    onClick={logout}
                    className="text-sm text-white/70 hover:text-white transition-colors underline"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="text-sm text-white/70 hover:text-white transition-colors underline"
                >
                  Admin Access
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-16">
            <div className="flex flex-wrap justify-center gap-4">
              {(['all', 'ongoing', 'completed', 'planning'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-6 py-2 rounded-full font-semibold transition-colors capitalize ${
                    filter === status
                      ? 'bg-hopely-pink text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {status === 'all' ? 'All Projects' : status}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-heading text-slate-800 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Location:</span>
                        <span className="font-semibold">{project.location}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Beneficiaries:</span>
                        <span className="font-semibold">{project.beneficiaries} people</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Started:</span>
                        <span className="font-semibold">{new Date(project.dateStarted).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500">Funding Progress</span>
                        <span className="font-semibold">${project.raised.toLocaleString()} / ${project.budget.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-hopely-pink h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getProgressPercentage(project.raised, project.budget)}%` }}
                        ></div>
                      </div>
                      <div className="text-right text-xs text-gray-500 mt-1">
                        {getProgressPercentage(project.raised, project.budget).toFixed(0)}% funded
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <Button3D 
                        text="Learn More" 
                        size="medium" 
                        variant="pink" 
                        className="w-full"
                        onClick={() => handleLearnMore(project)}
                      />
                      
                      {/* Admin Controls */}
                      {isAuthenticated && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditProject(project)}
                            className="flex-1 px-3 py-2 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="flex-1 px-3 py-2 text-sm border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold text-gray-600 mb-4">No projects found</h3>
                <p className="text-gray-500">Try adjusting your filter to see more projects.</p>
              </div>
            )}
          </div>
        </section>

        {/* Modals */}
        <LoginModal 
          isOpen={showAdminLogin} 
          onClose={() => setShowAdminLogin(false)} 
        />
        
        <ProjectForm
          isOpen={showProjectForm}
          onClose={() => {
            setShowProjectForm(false);
            setEditingProject(null);
          }}
          onSave={handleSaveProject}
          project={editingProject}
        />

        <ProjectDetailsModal
          isOpen={showProjectDetails}
          onClose={() => {
            setShowProjectDetails(false);
            setSelectedProject(null);
          }}
          project={selectedProject}
        />
      </main>
    </div>
  );
};

export default Projects;