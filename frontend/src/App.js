// App.js

import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation, Link, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Profile from "./components/Profile";
import Points from "./components/Points";
import Tasks from "./components/Tasks";


const ProtectedRoute = ({ component: Component, isAdmin, ...rest }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("isAdmin") === "true";
  
  useEffect(() => {
    const handleRedirect = () => {
      if (token) {
        if (isAdmin && !userRole) {
          // User is not an admin but trying to access the AdminDashboard
          return <Navigate to="/userdashboard" state={{ from: location }} replace />;
        } else if (!isAdmin && userRole) {
          // User is an admin but trying to access a non-admin route
          return <Navigate to="/admindashboard" state={{ from: location }} replace />;
        }
      } else {
        return <Navigate to="/login" state={{ from: location }} replace />;
      }
    };

    handleRedirect();
  }, [token, userRole, isAdmin, location]);

  return <Component />;
};

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-gray-800">NextGrowth Labs</h1>
              </div>
              
            </div>
            <div className="hidden sm:flex sm:items-center sm:ml-6">
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              {/* Mobile menu button */}
            </div>
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/userdashboard"
            element={<ProtectedRoute component={UserDashboard} isAdmin={false} />}
          />
          <Route
            path="/admindashboard"
            element={<ProtectedRoute component={AdminDashboard} isAdmin={true} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute component={Profile} isAdmin={false} />}
          />
          <Route
            path="/points"
            element={<ProtectedRoute component={Points} isAdmin={false} />}
          />
          <Route
            path="/completed-tasks"
            element={<ProtectedRoute component={Tasks} isAdmin={false} />}
          />
        </Routes>
      </div>
    </div>
  );
};



export default App;
