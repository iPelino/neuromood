import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({message, onRetry}) => {
  return (
    <div className="rounded-DEFAULT border border-error-container bg-error-container/40 p-4 text-on-surface" role="alert">
      <p className="font-medium">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-full bg-surface px-4 py-2 text-primary font-medium hover:bg-surface-container-low transition-colors"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
};

export default ErrorMessage;
