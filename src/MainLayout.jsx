import React, { useState } from "react";

// import Header from "./NewComponents/Header";
import { Outlet } from "react-router-dom";
import HRMSidebar from "./NewComponent/HRMSidebar";
import { Navigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAuth } from "./AuthContext";
const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="app-shell flex min-h-screen overflow-hidden bg-lightgray p-3 sm:p-4">
      <HRMSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && (
        <button type="button" aria-label="Close navigation" className="sidebar-backdrop fixed inset-0 z-20 bg-slate-950/60 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <div className="flex min-w-0 flex-1 flex-col md:ml-4">
        <div className="mb-3 flex items-center md:hidden">
          <button type="button" aria-label="Open navigation" className="app-icon-button" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <span className="ml-3 text-sm font-semibold text-white">Document Management</span>
        </div>

        <div className="min-w-0 flex-1 overflow-auto scrollbar-hide">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default MainLayout;