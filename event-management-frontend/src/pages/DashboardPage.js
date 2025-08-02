import React from "react";
import { useAuth } from "../auth/AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="container mt-5">
      <div className="alert alert-success">
        <h4>Welcome, {user?.email || "User"}!</h4>
        <p>Your role is: <strong>{user?.role}</strong></p>
        <p>You have successfully logged in and reached the protected dashboard.</p>
      </div>
    </div>
  );
};

export default DashboardPage;
