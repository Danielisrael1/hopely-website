import React from 'react';
import Button3D from './Button3D';

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

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null;

  const progressPercentage = (project.raised / project.budget) * 100;
  const remaining = project.budget - project.raised;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header with image */}
        <div className="relative h-64 md:h-80">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Status badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(project.status)}`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Title and Location */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{project.title}</h2>
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {project.location}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">About This Project</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {project.description}
            </p>
          </div>

          {/* Project Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{project.beneficiaries.toLocaleString()}</div>
              <div className="text-blue-800 font-semibold">People Benefited</div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{formatCurrency(project.raised)}</div>
              <div className="text-green-800 font-semibold">Funds Raised</div>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{Math.round(progressPercentage)}%</div>
              <div className="text-purple-800 font-semibold">Progress</div>
            </div>
          </div>

          {/* Funding Progress */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Funding Progress</h3>
            <div className="bg-gray-200 rounded-full h-4 mb-4">
              <div 
                className="bg-hopely-pink h-4 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Raised: {formatCurrency(project.raised)}</span>
              <span>Goal: {formatCurrency(project.budget)}</span>
            </div>
            {remaining > 0 && (
              <p className="text-center text-gray-700 mt-2">
                <span className="font-semibold">{formatCurrency(remaining)}</span> still needed to reach our goal
              </p>
            )}
          </div>

          {/* Timeline */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Project Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                <div>
                  <span className="font-semibold">Started:</span> {formatDate(project.dateStarted)}
                </div>
              </div>
              
              {project.dateCompleted && (
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                  <div>
                    <span className="font-semibold">Completed:</span> {formatDate(project.dateCompleted)}
                  </div>
                </div>
              )}
              
              {project.status === 'ongoing' && (
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-4 animate-pulse"></div>
                  <div>
                    <span className="font-semibold">Status:</span> Currently in progress
                  </div>
                </div>
              )}
              
              {project.status === 'planning' && (
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-500 rounded-full mr-4"></div>
                  <div>
                    <span className="font-semibold">Status:</span> In planning phase
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div className="border-t pt-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Support This Project</h3>
              <p className="text-gray-600 mb-6">
                Your donation can make a real difference in the lives of {project.beneficiaries} people in {project.location}.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button3D 
                  text="Donate Now" 
                  size="large" 
                  variant="pink" 
                  href="https://gofund.me/266a82aa"
                />
                <button
                  onClick={onClose}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;