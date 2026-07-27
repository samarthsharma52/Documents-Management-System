import React, { useState } from "react";

// import Header from "./NewComponents/Header";
import { Outlet } from "react-router-dom";
import HRMSidebar from "./NewComponent/HRMSidebar";
const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-lightgray p-4">
      <HRMSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col ml-4">
     
        {/* <Header onHamburgerClick={() => setSidebarOpen(true)} /> */}

        <div className="flex-1 overflow-auto scrollbar-hide  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default MainLayout;