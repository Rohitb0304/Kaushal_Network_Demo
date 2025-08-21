import React from 'react';
import { Button } from '../../../components/ui/button';
import { useNavigate } from 'react-router-dom';

interface RegistrationHeaderProps {
  logoImage: string;
}

const RegistrationHeader: React.FC<RegistrationHeaderProps> = ({ logoImage }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={logoImage} alt="Logo" className="h-10 w-auto" />
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">Business Registration</h1>
              <p className="text-sm text-gray-500">Join the network of growing businesses</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Already registered?</span>
            <Button
              onClick={() => navigate('/login')}
              className="bg-white text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default RegistrationHeader;
