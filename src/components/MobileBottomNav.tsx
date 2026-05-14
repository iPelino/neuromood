import React from 'react';
import {Link, useLocation} from 'react-router-dom';

const MobileBottomNav: React.FC = () => {
  const location = useLocation();

  const getLinkClasses = (path: string, basePath?: string) => {
    const isActive = location.pathname === path || (basePath && location.pathname.startsWith(basePath));
    if (isActive) {
      if (path === '/log') {
        return 'flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-2xl px-6 py-2 transition-all active:scale-90 shadow-sm -mt-4';
      }
      return 'flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-2xl px-4 py-1 active:scale-90 transition-transform';
    }
    if (path === '/log') {
      return 'flex flex-col items-center justify-center text-on-secondary-container hover:bg-surface-container-high transition-all active:scale-90 px-4 py-1 rounded-2xl';
    }
    return 'flex flex-col items-center justify-center text-on-secondary-container hover:bg-surface-container-high transition-all rounded-2xl px-4 py-1';
  };

  const getIconClasses = (path: string) => {
    const isActive = location.pathname === path;
    const base = path === '/log' ? 'material-symbols-outlined text-3xl' : 'material-symbols-outlined text-2xl';
    return `${base} ${isActive ? 'fill' : ''}`;
  };

  const getLabelClasses = (path: string) => {
    const isActive = location.pathname === path;
    return `font-label-sm text-label-sm mt-1 ${isActive && path === '/log' ? 'font-medium' : ''}`;
  };

  return (
    <nav className="flex md:hidden fixed bottom-0 left-0 w-full justify-around items-center px-4 pb-safe h-20 bg-surface shadow-[0_-4px_6px_rgba(39,33,60,0.1)] z-50 rounded-t-lg pt-2 pb-4" aria-label="Bottom navigation">
      <Link to="/" className={getLinkClasses('/')}>
        <span className={getIconClasses('/')}>home</span>
        <span className={getLabelClasses('/')}>Home</span>
      </Link>
      <Link to="/log" className={getLinkClasses('/log')}>
        <span className={getIconClasses('/log')}>add_circle</span>
        <span className={getLabelClasses('/log')}>Log</span>
      </Link>
      <Link to="/insights" className={getLinkClasses('/insights')}>
        <span className={getIconClasses('/insights')}>auto_awesome</span>
        <span className={getLabelClasses('/insights')}>AI</span>
      </Link>
      <Link to="/history" className={getLinkClasses('/history')}>
        <span className={getIconClasses('/history')}>trending_up</span>
        <span className={getLabelClasses('/history')}>Trends</span>
      </Link>
      <Link to="/settings" className={getLinkClasses('/settings')}>
        <span className={getIconClasses('/settings')}>settings</span>
        <span className={getLabelClasses('/settings')}>Settings</span>
      </Link>
    </nav>
  );
};

export default MobileBottomNav;
