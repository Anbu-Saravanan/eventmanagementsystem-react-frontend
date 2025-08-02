import React, { useEffect, useState } from "react";
import api from "../api/api"; // Axios instance with auth headers

const AdminAttendanceTracker = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [users, setUsers] = useState([]);
  const [attendance, setAttendance] = useState([]);


  // Fetch all events created by admin on component load
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/api/events/admin"); // adjust path if different
        setEvents(res.data);
        console.log("Attendance tracker loaded");
      } catch (err) {
        alert("Failed to fetch events");
      }
    };
    fetchEvents();
  }, []);
  // Load users registered for the selected event
  const loadRegisteredUsers = async () => {
    if (!selectedEventId) return;

    try {
      const res = await api.get(
        `/api/registration/event/${selectedEventId}/users`
      );
      setUsers(res.data);

      // Initialize attendance list
      const initialAttendance = res.data.map((user) => ({
        userId: user.userId,
        eventId: parseInt(selectedEventId),
        present: false,
      }));

      setAttendance(initialAttendance);
    } catch (err) {
      alert("Failed to load users");
    }
  };
  // Auto load users when event is selected
  useEffect(() => {
    if (selectedEventId) {
      loadRegisteredUsers();
    }
    // eslint-disable-next-line
  }, [selectedEventId]);

  // Toggle present/absent for user
  const togglePresent = (userId) => {
    setAttendance((prev) =>
      prev.map((a) => (a.userId === userId ? { ...a, present: !a.present } : a))
    );
  };

  // Submit attendance one-by-one
  const handleSubmit = async () => {
    try {
      for (const entry of attendance) {
        await api.post("/api/attendance/mark", entry);
      }
      alert("Attendance submitted!");
    } catch (err) {
      alert("Error submitting attendance");
    }
  };

  return (
    <div className="container mt-4">
      <h3>📋 Attendance Tracker (Admin)</h3>

      <div className="mb-3">
        <label htmlFor="eventSelect">Select Event:</label>
        <select
          className="form-select"
          id="eventSelect"
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
        >
          <option value="">-- Select an Event --</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title} — {new Date(event.eventDate).toLocaleString()}
            </option>
          ))}
        </select>
      </div>

      {users.length > 0 && (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Username</th>
                <th>Present?</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.username}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={
                        attendance.find((a) => a.userId === user.userId)
                          ?.present || false
                      }
                      onChange={() => togglePresent(user.userId)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn btn-success" onClick={handleSubmit}>
            ✅ Submit Attendance
          </button>
        </>
      )}
    </div>
  );
};

export default AdminAttendanceTracker;
