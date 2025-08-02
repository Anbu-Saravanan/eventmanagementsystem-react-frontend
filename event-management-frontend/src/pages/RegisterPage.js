import React, { useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "ROLE_USER",
  });

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    try {
      const res = await api.post("/api/auth/register", form);
      setMsg("Registration successful! You can now log in.");
      setForm({ username: "", email: "", password: "", role: "ROLE_USER" }); // ✅ reset fields

    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed. Try again.");
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Register</h2>

      {msg && <div className="alert alert-success">{msg}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

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
          Register
        </button>

        <div className="mt-3 text-center">
          <span>Already have an account? </span>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
