import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
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
  
  console.log(userRole,isAdmin)

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
    <div>
      <h1>Next labs</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userdashboard" element={<ProtectedRoute component={UserDashboard} isAdmin={false} />} />
        <Route path="/admindashboard" element={<ProtectedRoute component={AdminDashboard} isAdmin={true} />} />
        <Route path="/profile" element={<ProtectedRoute component={Profile} isAdmin={false} />} />
        <Route path="/points" element={<ProtectedRoute component={Points} isAdmin={false} />} />
        <Route path="/completed-tasks" element={<ProtectedRoute component={Tasks} isAdmin={false} />} />
      </Routes>
    </div>
  );
}

export default App;