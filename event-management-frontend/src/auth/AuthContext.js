import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create context
const AuthContext = createContext();

// Export for use in other components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (data) => {
    const userData = {
      email: data.email,
      role: data.role,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", data.accessToken);
    navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext };
