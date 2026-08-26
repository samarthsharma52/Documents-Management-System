import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddService from "./AddService";
import AddDoctype from "./AddDoctype";
import AllowedDocs from "./AddAllowedDocs";
import ServiceDocsRelation from "./AddMapping";
import { motion } from "framer-motion";

const DmsSetup = () => {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("AddService");
  const tabs = [
    { id: "AddService", label: "Add Serivce" },
    { id: "AddDoctype", label: "Add Doctype" },
    { id: "AllowedDocs", label: "Add Allowed Doctype" },
    { id: "ServiceDocsRelation", label: "Publish" },
  ];
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  const verifyToken = async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.post(
        "http://13.127.244.118:5001/users/verify-token",
        {
          token: token,
        }
      );
      console.log("Token is valid:", response.data);
    } catch (error) {
      console.error(
        "Token verification failed:",
        error.response ? error.response.data : error.message
      );
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("tokenExpiry");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          console.log("Fetching data for userId:", userId);
          const response = await axios.get(
            `https://devdemo.softtrails.net/users/id_user/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("API Response:", response);
          if (response.data.user) {
            const user = response.data.user;
            setUserData(user);
          } else {
            console.log("No user data found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [token, userId]);

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    // <div className="flex ">
    //   <div className=" w-full">
    //     <div className=" flex space-x-4">
    //       <div className="flex gap-2 w-[70%] rounded-full p-1 relative">

    <div className="flex w-full">
  <div className="w-full">
    {/* Mobile par ek ke neeche ek (flex-col), md (tablet) aur usse bade screen par side-by-side (flex-row) */}
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      
      {/* Mobile par pura 100% width lega, aur badi screens (lg) par 70% width lega. gap-2 ke sath flex-wrap bhi lagaya hai taaki content tute nahi */}
      <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full lg:w-[70%] rounded-full p-1 relative">
            <motion.div
              layoutId="activeTab"
              className="absolute top-1 bottom-1 left-0 bg-gradient-to-r rounded-full transition-all "
              style={{
                width: `calc(100% / ${tabs.length})`,
                left: `${
                  (tabs.findIndex((t) => t.id === activeTab) * 100) /
                  tabs.length
                }%`,
              }}
              transition={{
                type: "spring",
                stiffness: 600,
                damping: 20,
              }}
            />

            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`relative flex-1 px-4 py-2 rounded-full text-center font-medium transition-all duration-300 z-10 ${
                  activeTab === tab.id ? "text-white" : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="app-surface min-w-0 max-w-full overflow-hidden p-4 sm:p-6">
          {activeTab === "AddService" && <AddService />}
          {activeTab === "AddDoctype" && <AddDoctype />}
          {activeTab === "AllowedDocs" && <AllowedDocs />}
          {activeTab === "ServiceDocsRelation" && <ServiceDocsRelation />}
        </div>
      </div>
    </div>
  );
};

export default DmsSetup;
