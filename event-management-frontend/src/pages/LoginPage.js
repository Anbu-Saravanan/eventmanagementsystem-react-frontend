import React, { useState } from "react";
import api from "../api/api";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { login } = useAuth();
  //const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/api/auth/login", form);
      // Example response: { token, refreshToken, email, role }

      // Save to context + localStorage
      const { token, refreshToken, email, role } = response.data;
      const userData = { email, role, token, refreshToken };
      login(userData);
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
        <div className="mt-3 text-center">
          <span>Don't have an account? </span>
          <Link to="/register">Register here</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
