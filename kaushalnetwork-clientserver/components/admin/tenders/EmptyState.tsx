import React, { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionButton?: ReactNode;
}

export default function EmptyState({ icon, title, description, actionButton }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 text-center">
      <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>
      {actionButton}
    </div>
  );
}
