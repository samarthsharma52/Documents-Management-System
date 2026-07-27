import { useState } from 'react'
import reactLogo from './assests/react.svg'
import viteLogo from './assests/vite.svg'
import heroImg from './assests/hero.png'
import './App.css'
import DMSRouter from './DMS/DMSRouter'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from  './Pages/Login'
import MainLayout from './MainLayout'
import DMSSetup from './DMS/Setup/DMSSetup'
import DMSUpload from './DMS/Upload/DMSUpload'
import DMSApproval from './DMS/Approval/DMSApproval'

const appRouter = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <Login /> },
  {
    path: "/dms/*",
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="setup" replace /> },
      { path: "setup", element: <DMSSetup /> },
      { path: "upload", element: <DMSUpload /> },
      { path: "approval", element: <DMSApproval /> },
    ],
  },
]);
function App({ employeeId, userId }) {
    return <RouterProvider router={appRouter} />;
}

export default App


