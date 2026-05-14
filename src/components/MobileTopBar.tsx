import React from 'react';
import {Link} from 'react-router-dom';
import {getStoredThemePreference, setThemePreference} from '../utils/theme';

const MobileTopBar: React.FC = () => {
  const [themePreference, setThemePreferenceState] = React.useState(getStoredThemePreference());

  const onThemeToggle = () => {
    const nextTheme = themePreference === 'dark' ? 'light' : 'dark';
    setThemePreferenceState(nextTheme);
    setThemePreference(nextTheme);
  };

  return (
    <header className="flex md:hidden justify-between items-center px-gutter h-16 w-full max-w-7xl mx-auto fixed top-0 z-50 bg-surface shadow-sm">
      <div className="font-headline-md text-headline-md font-semibold text-primary">NeuroMood</div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onThemeToggle}
          aria-label="Toggle dark mode"
          className="text-primary active:scale-95 transition-transform hover:bg-surface-container-low p-2 rounded-full flex items-center justify-center"
        >
          <span className="material-symbols-outlined">{themePreference === 'dark' ? 'light_mode' : 'dark_mode'}</span>
        </button>
        <Link to="/settings" aria-label="Open settings" className="text-primary active:scale-95 transition-transform hover:bg-surface-container-low p-2 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined">settings</span>
        </Link>
      </div>
    </header>
  );
};

export default MobileTopBar;
