import React from 'react';
import Sidebar from '../components/coordinator/Sidebar';
import { Outlet } from 'react-router-dom';

export default function CoordinatorLayout() {
  return (
    <div className="lg:flex">
      <Sidebar />

      <main className="lg:ml-56 lg:w-full lg:h-screen lg:overflow-y-auto lg:px-4">
        {/* <div className="bg-gray-100 rounded-lg py-3 px-2 sticky top-0 z-10 mx-3 lg:mx-0">
          <Header />
        </div> */}

        <div className="bg-gray-100 rounded-lg py-3 px-2 my-2 mx-3 lg:mx-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
