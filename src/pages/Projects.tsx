import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
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

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed' | 'planning'>('all');
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    // Sample projects data - in a real app, this would come from an API
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
            
            {/* Admin Login Button */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowAdminLogin(true)}
                className="text-sm text-white/70 hover:text-white transition-colors underline"
              >
                Admin Access
              </button>
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

                    <Button3D 
                      text="Learn More" 
                      size="medium" 
                      variant="pink" 
                      className="w-full"
                    />
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

        {/* Admin Login Modal */}
        {showAdminLogin && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold font-heading text-slate-800 mb-6 text-center">
                Admin Login
              </h3>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Admin Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-hopely-pink focus:border-transparent"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-hopely-pink focus:border-transparent"
                />
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowAdminLogin(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-hopely-pink text-white py-3 rounded-lg font-semibold hover:bg-hopely-pink-dark transition-colors"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Projects;