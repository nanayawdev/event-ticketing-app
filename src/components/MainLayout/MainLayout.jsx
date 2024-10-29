import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
