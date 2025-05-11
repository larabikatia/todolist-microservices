// src/components/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Chargement...' }) => {
  const spinnerSize = size === 'sm' ? 'spinner-border-sm' : '';
  
  return (
    <div className="text-center my-4">
      <div className={`spinner-border ${spinnerSize}`} role="status">
        <span className="visually-hidden">Chargement...</span>
      </div>
      {text && <p className="mt-2">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;