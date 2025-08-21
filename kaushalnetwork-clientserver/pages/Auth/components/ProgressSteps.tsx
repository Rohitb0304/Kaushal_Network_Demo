import React from 'react';

interface ProgressStepsProps {
  currentPage: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentPage }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex-1">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            currentPage >= 1 ? 'bg-blue-500' : 'bg-gray-200'
          }`}
        />
        <p
          className={`mt-2 text-sm font-medium ${
            currentPage >= 1 ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          Basic Information
        </p>
      </div>
      <div className="w-4" />
      <div className="flex-1">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            currentPage >= 2 ? 'bg-blue-500' : 'bg-gray-200'
          }`}
        />
        <p
          className={`mt-2 text-sm font-medium ${
            currentPage >= 2 ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          Company Details
        </p>
      </div>
    </div>
  );
};

export default ProgressSteps;
