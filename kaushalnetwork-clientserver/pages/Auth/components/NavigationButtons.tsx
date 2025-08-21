import React from 'react';
import { Button } from '../../../components/ui/button';

interface NavigationButtonsProps {
  page: number;
  onBack: () => void;
  onNext: (e: React.MouseEvent) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  isPageValid: boolean | '';
  hasSubmitted: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  page,
  onBack,
  onNext,
  onSubmit,
  isSubmitting,
  isPageValid,
  hasSubmitted,
}) => {
  return (
    <div className="flex justify-between items-center pt-6 border-t">
      {page === 2 && (
        <Button
          type="button"
          onClick={onBack}
          className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
          disabled={isSubmitting} // Disable when submitting
        >
          Back
        </Button>
      )}
      {page === 1 ? (
        <Button
          type="button"
          onClick={onNext}
          className="ml-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          disabled={!isPageValid || isSubmitting} // Disable if page is not valid or if already submitting
        >
          Next
        </Button>
      ) : (
        <Button
          type="submit"
          onClick={onSubmit}
          className="ml-auto px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
          disabled={isSubmitting || hasSubmitted} // Disable on submitting or after submission
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;