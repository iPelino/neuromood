import React from 'react';

interface LoadingSpinnerProps {
  label?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({label = 'Loading...'}) => {
  return (
    <div className="flex items-center gap-3 text-on-surface-variant" role="status" aria-live="polite">
      <span className="w-5 h-5 border-2 border-primary-container border-t-transparent rounded-full animate-spin" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
};

export default LoadingSpinner;
