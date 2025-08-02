import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const AdminEventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/api/events/all");
      setEvents(res.data);
    } catch (err) {
      setError("Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;
    try {
      await api.delete(`/api/events/delete/${id}`);
      setEvents(events.filter((e) => e.id !== id));
    } catch (err) {
      alert("Delete failed. Try again.");
    }
  };

  const goToEdit = (id) => {
    navigate(`/events/edit/${id}`);
  };

  const goToCreate = () => {
    navigate("/admin/events/create");
  };

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-5 container">{error}</div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <h2>📅 Manage Events</h2>
        <button className="btn btn-primary" onClick={goToCreate}>
          ➕ Create Event
        </button>
      </div>

      {events.length === 0 ? (
        <div className="alert alert-info">No events found.</div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Category</th>
              <th>Speakers</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event.id}>
                <td>{index + 1}</td>
                <td>{event.title}</td>
                <td>{new Date(event.eventDate).toLocaleString()}</td>
                <td>{event.location}</td>
                <td>{event.category}</td>
                <td>
                  {event.speakers?.map((s) => s.name || s).join(", ") || "—"}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => goToEdit(event.id)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(event.id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminEventList;
