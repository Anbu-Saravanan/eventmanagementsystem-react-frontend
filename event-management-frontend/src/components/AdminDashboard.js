import React, { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../auth/AuthContext";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await api.get("/api/admin/registrations", {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        });
        setRegistrations(res.data);
      } catch (err) {
        setError("Failed to load registrations.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "ROLE_ADMIN") fetchRegistrations();
  }, [user]);

  if (loading) return <div className="mt-5 container">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-5 container">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📋 Admin Dashboard - Event Registrations</h2>
      {registrations.length === 0 ? (
        <div className="alert alert-info">No registrations found.</div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Event</th>
              <th>Date</th>
              <th>Speakers</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg, index) => (
              <tr key={reg.registrationId}>
                <td>{index + 1}</td>
                <td>{reg.username}</td>
                <td>{reg.email}</td>
                <td>{reg.eventTitle}</td>
                <td>{new Date(reg.registeredAt).toLocaleString()}</td>
                <td>
                  {reg.speakers?.map((s) => s.name).join(", ") || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
