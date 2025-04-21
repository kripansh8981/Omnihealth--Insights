import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const HospitalSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const history = useHistory();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      try {
        const response = await axios.get(`/api/hospitals/search?q=${query}`);
        setResults(response.data); // Set search results
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };

  const handleHospitalClick = (id) => {
    history.push(`/hospital/${id}`); // Redirect to hospital details page
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for hospitals..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div>
        {results.length > 0 ? (
          results.map((hospital) => (
            <div
              key={hospital._id}
              onClick={() => handleHospitalClick(hospital._id)}
              className="hospital-card"
            >
              <h3>{hospital.name}</h3>
              <p>{hospital.location}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default HospitalSearch;
