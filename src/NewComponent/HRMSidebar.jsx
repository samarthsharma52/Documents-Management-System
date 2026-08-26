import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
// react-icons library se matching icons import kar rahe hain
import { FaCog, FaFileAlt, FaClipboardCheck, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../AuthContext";

const HRMSidebar = ({ isOpen, onClose }) => {
  const { userId, logout } = useAuth();
  const navigate = useNavigate();
  // Sidebar ke items ka data array
  const menuItems = [
    // { name: "DMS", icon: <FaFile />, path: "/dms" },
    { name: "DMS Setup", icon: <FaCog />, path: "/dms/setup" },
    { name: "File Upload", icon: <FaFileAlt />, path: "/dms/upload" },
    { name: "Approval", icon: <FaClipboardCheck />, path: "/dms/approval" },
  ];

  return (
    <aside
    // Mobile view ke liye isOpen prop handle kiya hai
      className={`sidebar-panel fixed inset-y-3 left-3 z-30 h-[calc(100vh-1.5rem)] w-[min(18rem,calc(100vw-1.5rem))] shadow-md rounded-xl transition-transform duration-300 md:static md:inset-auto md:z-auto md:h-auto md:min-h-[calc(100vh-2rem)] md:w-64 md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-[calc(100%+1rem)] md:flex"
      } flex-col`}
        
        
    >
      <div className="border-b border-app-border px-5 py-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-app-primary text-white shadow-primary-soft"><FaUserCircle size={22} /></span>
          <div className="min-w-0">
            <p className="text-xs text-app-muted">Signed in as</p>
            <p className="truncate text-sm font-semibold text-white" title={String(userId || "User")}>{userId || "User"}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-3">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            onClick={onClose} // Mobile me link par click karte hi sidebar band hone ke liye
            className={({ isActive }) =>
              `sidebar-link flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? " text-white shadow-sm" // Active state (Blue background)
                  : "text-gray-700 hover:bg-gray-100"      // Normal state
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Icon */}
                <span className="text-lg">
                  {item.icon}
                </span>
                {/* Menu Name */}
                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
      <div className="mt-auto border-t border-app-border p-3">
        <button type="button" className="sidebar-logout flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-red-300 transition-colors" onClick={() => { logout(); onClose(); navigate('/login', { replace: true }); }}>
          <FaSignOutAlt className="text-base" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default HRMSidebar;