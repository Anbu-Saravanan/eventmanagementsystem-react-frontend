
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h5 className="card-title">{event.title}</h5>
        <h6 className="card-subtitle text-muted mb-2">
          📅 {new Date(event.eventDate).toLocaleString()}
        </h6>
        <p className="card-text">{event.description}</p>

        {event.location && (
          <p className="mb-1">
            📍 <strong>Location:</strong> {event.location}
          </p>
        )}

        {event.category && (
          <span className="badge bg-primary mb-2">{event.category}</span>
        )}

        {event.speakers?.length > 0 && (
          <p>
            🎤 <strong>Speakers:</strong>{" "}
            {event.speakers.map((s) => s.name).join(", ")}
          </p>
        )}

        <Link
          to={`/events/${event.id}`}
          className="btn btn-outline-primary btn-sm"
        >
          View Details
        </Link>
      </div>
      
    </div>
  );
};

export default EventCard;
