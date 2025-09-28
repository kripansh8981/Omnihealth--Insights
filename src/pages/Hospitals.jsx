import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/hospitals");
      setHospitals(response.data);
    } catch (err) {
      // Catch specific error types if possible, otherwise use a generic message
      setError("Failed to fetch hospitals. Please ensure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
          Find a Hospital
        </h1>
        <p className="text-gray-600 mb-6 md:mb-8">
          Search for hospitals by name.
        </p>
        <input
          type="text"
          placeholder="Search for a hospital..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-4 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
        />
      </div>
      {loading && (
        <div className="text-center text-lg font-medium text-gray-600">
          Loading hospitals...
        </div>
      )}
      {error && (
        <div className="text-center text-lg font-medium text-red-600">
          Error: {error}
        </div>
      )}
      {!loading && filteredHospitals.length === 0 && (
        <div className="text-center text-lg font-medium text-gray-500">
          No hospitals found.
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHospitals.map((hospital) => (
          <Link to={`/hospitals/${hospital._id}`} key={hospital._id} className="block transform transition-all duration-300 hover:scale-105">
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl p-6 border-l-4 border-blue-500">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {hospital.name}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                <span className="font-medium">Address:</span>{" "}
                {hospital.address || "Not specified"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hospitals;
