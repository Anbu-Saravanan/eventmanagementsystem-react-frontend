import React, { useState } from "react";
import api from "../api/api";

const SearchEvents = () => {
  const [searchType, setSearchType] = useState("location");
  const [query, setQuery] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    let res;

    try {
      if (searchType === "location") {
        res = await api.get(`/api/events/search/location?location=${query}`);
      } else if (searchType === "category") {
        res = await api.get(`/api/events/search/category?category=${query}`);
      } else if (searchType === "date-range") {
        res = await api.get(
          `/api/events/search/date-range?start=${start}&end=${end}`
        );
      }

      setResults(res.data);
    } catch (err) {
      alert("Search failed");
    }
  };

  return (
    <div className="container mt-4">
      <h3>🔍 Search Events</h3>

      <div className="mb-3">
        <label>Search By:</label>
        <select
          className="form-select"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="location">Location</option>
          <option value="category">Category</option>
          <option value="date-range">Date Range</option>
        </select>
      </div>

      {searchType === "location" || searchType === "category" ? (
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder={`Enter ${searchType}`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      ) : (
        <div className="row mb-3">
          <div className="col">
            <label>Start Date & Time</label>
            <input
              type="datetime-local"
              className="form-control"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
          <div className="col">
            <label>End Date & Time</label>
            <input
              type="datetime-local"
              className="form-control"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
        </div>
      )}

      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>

      {results.length > 0 && (
        <div className="mt-4">
          <h5>🔎 Results:</h5>
          <ul className="list-group">
            {results.map((event) => (
              <li key={event.id} className="list-group-item">
                <strong>{event.title}</strong> - {event.category} <br />
                📍 {event.location} | 📅{" "}
                {new Date(event.eventDate).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchEvents;
