import { useEffect } from 'react';

interface ExternalRedirectProps {
  to: string;
}

const ExternalRedirect: React.FC<ExternalRedirectProps> = ({ to }) => {
  useEffect(() => {
    // Replace current location completely with the external URL
    window.location.replace(to);
  }, [to]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
        <p className="text-lg text-gray-700">Redirecting to external site...</p>
        <p className="text-sm text-gray-500">
          If you are not redirected automatically,{' '}
          <a href={to} className="text-blue-500 hover:underline">
            click here
          </a>
        </p>
      </div>
    </div>
  );
};

export default ExternalRedirect;
