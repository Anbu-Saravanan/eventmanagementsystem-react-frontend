import React, { useEffect, useState } from "react";
import api from "../api/api";
import Select from "react-select";

const CreateEventForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    eventDate: "",
    category: "",
    speakerIds: [],
  });
  const [newSpeaker, setNewSpeaker] = useState({
    name: "",
    bio: "",
    expertise: "",
  });

  const [message, setMessage] = useState("");
  const [speakers, setSpeakers] = useState([]);

  // Load all speakers
  useEffect(() => {
    api.get("/api/speakers/all").then((res) => {
      setSpeakers(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSpeakerSelect = (selectedOptions) => {
    setForm({
      ...form,
      speakerIds: selectedOptions.map((option) => option.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/events/create", form);
      setMessage("Event created!");
      setForm({
        title: "",
        description: "",
        location: "",
        eventDate: "",
        category: "",
        speakerIds: [],
      });
    } catch (err) {
      setMessage("Failed to create event");
    }
  };

  const handleAddSpeaker = async () => {
    if (!newSpeaker.name || !newSpeaker.expertise) {
      return alert("Name and expertise are required.");
    }

    try {
      const res = await api.post("/api/speakers/add", newSpeaker);
      setSpeakers((prev) => [...prev, res.data]); // ✅ Use this to update dropdown
      setNewSpeaker({ name: "", bio: "", expertise: "" }); // reset form
      alert("Speaker added!");
    } catch (err) {
      alert("Failed to add speaker");
    }
  };

  const speakerOptions = speakers.map((s) => ({
    value: s.id,
    label: `${s.name} (${s.expertise})`,
  }));

  return (
    <div className="container mt-4">
      <h4>Create Event</h4>
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
        <div className="mt-4 p-3 border rounded">
          <h5>Add New Speaker</h5>

          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={newSpeaker.name}
              onChange={(e) =>
                setNewSpeaker({ ...newSpeaker, name: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <textarea
              className="form-control"
              placeholder="Bio"
              value={newSpeaker.bio}
              onChange={(e) =>
                setNewSpeaker({ ...newSpeaker, bio: e.target.value })
              }
            ></textarea>
          </div>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Expertise"
              value={newSpeaker.expertise}
              onChange={(e) =>
                setNewSpeaker({ ...newSpeaker, expertise: e.target.value })
              }
            />
          </div>

          <button className="btn btn-secondary" onClick={handleAddSpeaker}>
            ➕ Add Speaker
          </button>
        </div>

        <button className="btn btn-primary">Create Event</button>
      </form>

      {message && <div className="mt-2">{message}</div>}
    </div>
  );
};

export default CreateEventForm;
