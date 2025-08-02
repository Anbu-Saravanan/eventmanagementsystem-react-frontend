import React, { useEffect, useState } from "react";
import api from "../api/api";
import Select from "react-select";
import { useParams, useNavigate } from "react-router-dom";

const EditEventForm = () => {
  const { id } = useParams(); // event ID from route
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    eventDate: "",
    category: "",
    speakerIds: [],
  });

  const [speakers, setSpeakers] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch existing event
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/api/events/${id}`);
        const event = res.data;
        setForm({
          title: event.title,
          description: event.description,
          location: event.location,
          eventDate: event.eventDate.slice(0, 16), // format for datetime-local
          category: event.category,
          speakerIds: event.speakers.map((s) => s.id),
        });
      } catch (err) {
        setMessage("Failed to load event.");
      }
    };

    fetchEvent();
  }, [id]);

  // Fetch available speakers
  useEffect(() => {
    api.get("/api/speakers/all")
      .then((res) => setSpeakers(res.data))
      .catch(() => alert("Failed to load speakers"));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSpeakerSelect = (selectedOptions) => {
    setForm({
      ...form,
      speakerIds: selectedOptions.map((opt) => opt.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/events/update/${id}`, form);
      alert("Event updated!");
      navigate("/admin/events"); // or redirect to list page
    } catch (err) {
      alert("Failed to update event");
    }
  };

  const speakerOptions = speakers.map((s) => ({
    value: s.id,
    label: `${s.name} (${s.expertise})`,
  }));

  return (
    <div className="container mt-4">
      <h4>✏️ Edit Event</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          className="form-control mb-2"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          className="form-control mb-2"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          className="form-control mb-2"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="eventDate"
          className="form-control mb-2"
          value={form.eventDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          className="form-control mb-2"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <label>Select Speakers:</label>
        <Select
          options={speakerOptions}
          isMulti
          className="mb-3"
          onChange={handleSpeakerSelect}
          value={speakerOptions.filter((option) =>
            form.speakerIds.includes(option.value)
          )}
        />

        <button className="btn btn-primary">💾 Update Event</button>
      </form>

      {message && <div className="mt-2 text-danger">{message}</div>}
    </div>
  );
};

export default EditEventForm;
