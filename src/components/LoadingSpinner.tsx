/**
 * Loading Spinner Component
 * Simple loading indicator for async operations
 */

import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-r-2 border-hopely-pink"></div>
    </div>
  );
};

export default LoadingSpinner;
