import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileTopBar from './MobileTopBar';
import MobileBottomNav from './MobileBottomNav';

const Layout: React.FC = () => {
  return (
    <div className="bg-background-main font-body-base text-body-base text-on-background min-h-screen overflow-x-hidden antialiased">
      <MobileTopBar />
      <Sidebar />
      <Outlet />
      <MobileBottomNav />
    </div>
  );
};

export default Layout;
