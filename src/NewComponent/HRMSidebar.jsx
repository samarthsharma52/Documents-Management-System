import React from "react";
import { NavLink } from "react-router-dom";
// react-icons library se matching icons import kar rahe hain
import { FaFile, FaCog, FaFileAlt, FaClipboardCheck } from "react-icons/fa";

const HRMSidebar = ({ isOpen, onClose }) => {
  // Sidebar ke items ka data array
  const menuItems = [
    // { name: "DMS", icon: <FaFile />, path: "/dms" },
    { name: "DMS Setup", icon: <FaCog />, path: "/dms/setup" },
    { name: "File Upload", icon: <FaFileAlt />, path: "/dms/upload" },
    { name: "Approval", icon: <FaClipboardCheck />, path: "/dms/approval" },
  ];

  return (
    <aside
      className={`bg-white h-full shadow-md rounded-xl transition-all duration-300 ${
        // Mobile view ke liye isOpen prop handle kiya hai
        isOpen ? "w-64 block" : "hidden md:flex md:w-64"
      } flex-col`}
    >
      <div className="flex flex-col p-3 gap-2 mt-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            onClick={onClose} // Mobile me link par click karte hi sidebar band hone ke liye
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm" // Active state (Blue background)
                  : "text-black hover:bg-gray-100"      // Normal state
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Icon */}
                <span className={`text-lg ${isActive ? "text-white" : "text-black"}`}>
                  {item.icon}
                </span>
                {/* Menu Name */}
                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default HRMSidebar;