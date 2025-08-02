import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../auth/AuthContext";

const EventDetailsPage = () => {
  const { user } = useContext(AuthContext); // ✅ Get user from context
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await api.get(`/api/events/${id}`);
        setEvent(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch event details.");
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleRegister = async () => {
    if (!user?.accessToken) return;
    setRegistering(true);
    setRegisterMessage("");
    try {
      await api.post("/api/registration/register", { eventId: event.id });
      setRegisterMessage("✅ Successfully registered! Check your email as a reminder.");
      setRegistered(true);
      // Optional: reset registered state after 3 seconds
      setTimeout(() => {
        setRegistered(false); // 👈 enable button again
        setRegisterMessage(""); // 👈 clear message if you want
      }, 3000);
    } catch (err) {
      setRegisterMessage(
        err.response?.data?.message || "Already registered or error occurred."
      );
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return <div className="container mt-5">Loading event details...</div>;
  }

  if (error || !event) {
    return (
      <div className="container mt-5 alert alert-danger">
        {error || "Event not found."}
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <Link to="/events" className="btn btn-secondary btn-sm mb-3">
        ← Back to Events
      </Link>

      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title">{event.title}</h3>
          <h6 className="text-muted">
            📅 {new Date(event.eventDate).toLocaleString()}
          </h6>
          <hr />

          <p>{event.description}</p>

          {event.location && (
            <p>
              📍 <strong>Location:</strong> {event.location}
            </p>
          )}

          {event.category && (
            <p>
              🏷️ <strong>Category:</strong>{" "}
              <span className="badge bg-primary">{event.category}</span>
            </p>
          )}

          {event.speakers?.length > 0 && (
            <div>
              🎤 <strong>Speakers:</strong>{" "}
              {event.speakers.map((s) => s.name).join(", ")}
            </div>
          )}

          {user?.accessToken && (
            <div className="mt-4">
              <button
                className="btn btn-success"
                onClick={handleRegister}
                disabled={registering || registered}
              >
                {registered ? "✅ Registered" : "Register for Event"}
              </button>
              {registerMessage && (
                <div className="mt-2 alert alert-info">{registerMessage}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
