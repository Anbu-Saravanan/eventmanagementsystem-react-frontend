import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  console.log("Logged in user:", user);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link
          className="navbar-brand fw-bold"
          to={isAuthenticated ? "/dashboard" : "/"}
        >
          Event Management System
        </Link>
        <div>
          {user?.role === "ROLE_ADMIN" && (
            <Link to="/admin" className="btn btn-light btn-sm me-2">
              Admin Panel
            </Link>
          )}
        </div>
        <div>
          {user?.role === "ROLE_ADMIN" && (
            <Link to="/admin/events" className="btn btn-light btn-sm me-2">
              Manage Events
            </Link>
          )}
        </div>

        <Link
          to="/admin/attendance"
          className="btn btn-light btn-sm me-2"
        >
          Mark Attendance
        </Link>
        <Link className="btn btn-light btn-sm me-2" to="/events">
          Events Browsing
        </Link>
        <Link to="/my-registrations" className="btn btn-light btn-sm me-2">
          My Events
        </Link>
        <Link to="/search-events" className="btn btn-light btn-sm">
          🔍 Search Events
        </Link>

        <div className="d-flex ms-auto align-items-center">
          {isAuthenticated && (
            <>
              <span className="text-white me-3">
                Logged in as <strong>{user?.email || "Unknown"}</strong>
              </span>
              <button
                className="btn btn-outline-light btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Link to="/login" className="btn btn-outline-light btn-sm me-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-light btn-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
