import React, { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../auth/AuthContext";
import { Link } from "react-router-dom";

const MyRegistrationsPage = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const res = await api.get("/api/registration/my-registrations");
        setEvents(res.data);
      } catch (err) {
        setError("Failed to fetch your registered events.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.accessToken) {
      fetchRegisteredEvents();
    }
  }, [user]);

  if (loading) return <div className="container mt-5">Loading...</div>;

  if (error) return <div className="container mt-5 alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h3 className="mb-4">📋 My Registered Events</h3>
      {events.length === 0 ? (
        <p>You haven't registered for any events yet.</p>
      ) : (
        events.map((event) => (
          <div key={event.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5>{event.title}</h5>
              <p>{event.description}</p>
              <p>📍 {event.location}</p>
              <p>📅 {new Date(event.eventDate).toLocaleString()}</p>
              <Link to={`/events/${event.id}`} className="btn btn-sm btn-outline-primary">
                View Details
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyRegistrationsPage;
