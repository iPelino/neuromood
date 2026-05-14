import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileTopBar: React.FC = () => {
  return (
    <header className="flex md:hidden justify-between items-center px-gutter h-16 w-full max-w-7xl mx-auto fixed top-0 z-50 bg-surface shadow-sm">
      <div className="font-headline-md text-headline-md font-semibold text-primary">NeuroMood</div>
      <div className="flex items-center gap-4">
        <button className="text-primary active:scale-95 transition-transform hover:bg-surface-container-low p-2 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="text-primary active:scale-95 transition-transform hover:bg-surface-container-low p-2 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </div>
    </header>
  );
};

export default MobileTopBar;
