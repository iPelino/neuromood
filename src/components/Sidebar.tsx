import React from 'react';
import {Link, useLocation} from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const getLinkClasses = (path: string) => {
    const isActive = location.pathname === path;
    if (isActive) {
      return 'flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-full active:scale-[0.98] transition-all font-medium';
    }
    return 'flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full active:scale-[0.98] transition-all';
  };

  const getIconClasses = (path: string) => {
    const isActive = location.pathname === path;
    return `material-symbols-outlined ${isActive ? 'fill' : ''}`;
  };

  return (
    <nav className="hidden md:flex flex-col p-4 gap-stack-sm h-screen w-64 fixed left-0 top-0 bg-surface-container-low shadow-none z-40" aria-label="Primary">
      <div className="px-4 py-6 mb-4">
        <h1 className="font-headline-md text-headline-md font-bold text-primary">NeuroMood</h1>
        <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Wellness Partner</p>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <Link to="/" className={getLinkClasses('/')}>
          <span className={getIconClasses('/')}>dashboard</span>
          Dashboard
        </Link>
        <Link to="/log" className={getLinkClasses('/log')}>
          <span className={getIconClasses('/log')}>edit_note</span>
          Mood Logger
        </Link>
        <Link to="/insights" className={getLinkClasses('/insights')}>
          <span className={getIconClasses('/insights')}>psychology</span>
          AI Insights
        </Link>
        <Link to="/history" className={getLinkClasses('/history')}>
          <span className={getIconClasses('/history')}>history</span>
          History
        </Link>
        <Link to="/settings" className={`${getLinkClasses('/settings')} mt-auto mb-4`}>
          <span className={getIconClasses('/settings')}>settings</span>
          Settings
        </Link>
      </div>

      <Link to="/log" className="w-full py-4 bg-primary-container text-on-primary-container rounded-full font-headline-md text-[16px] font-medium hover:bg-primary active:scale-[0.98] transition-all shadow-sm flex items-center justify-center">
        Log Mood
      </Link>
    </nav>
  );
};

export default Sidebar;
