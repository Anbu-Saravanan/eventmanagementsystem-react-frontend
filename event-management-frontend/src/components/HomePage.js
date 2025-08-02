import React, { useEffect, useState } from "react";
import api from "../api/api";
import EventCard from "./EventCard";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/api/events/all");
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch events");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="container mt-5">Loading events...</div>;
  }

  if (error) {
    return <div className="container mt-5 alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Upcoming Events</h2>

      <ul className="row">
        {events.map((event) => (
          <div key={event.id} className="col-md-6">
            <EventCard event={event} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
