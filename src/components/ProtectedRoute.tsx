import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginModal from './LoginModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hopely-pink mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-hopely-pink/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-hopely-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin Access Required</h2>
              <p className="text-gray-600 mb-6">
                You need to be logged in to access the admin dashboard. Please sign in with your admin credentials.
              </p>
              <button
                onClick={() => setShowLoginModal(true)}
                className="w-full bg-hopely-pink text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
              >
                Sign In
              </button>
              <a
                href="/"
                className="block mt-4 text-gray-500 hover:text-gray-700 text-sm"
              >
                ← Back to Home
              </a>
            </div>
          </div>
        </div>
        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      </>
    );
  }

  // User is authenticated, render children
  return <>{children}</>;
};

export default ProtectedRoute;
