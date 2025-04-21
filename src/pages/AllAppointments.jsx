import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AllAppointments = () => {
  const { hospitalName } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/appointment?hospitalName=${encodeURIComponent(hospitalName)}`
        );
        setAppointments(response.data);
        setFilteredAppointments(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Failed to fetch appointments');
        setLoading(false);
      }
    };

    if (hospitalName) {
      fetchAppointments();
    } else {
      setError('No hospital name provided');
      setLoading(false);
    }
  }, [hospitalName]);

  useEffect(() => {
    const filtered = appointments.filter(
      (a) =>
        a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAppointments(filtered);
  }, [searchTerm, appointments]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  if (loading) return <div>Loading appointments...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>
        Appointments for <em>{decodeURIComponent(hospitalName)}</em>
      </h2>

      <input
        type="text"
        placeholder="Search by patient or doctor name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          marginBottom: '20px',
          borderRadius: '8px',
          border: '1px solid #ccc',
        }}
      />

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredAppointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          filteredAppointments.map((appointment, index) => (
            <li
              key={appointment._id || index}
              style={{
                marginBottom: '15px',
                padding: '15px',
                backgroundColor: '#f9f9f9',
                borderRadius: '10px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}
            >
              <strong>🧾 Token #{appointment.token}</strong><br />
              <strong>{appointment.patientName}</strong> with <strong>Dr. {appointment.doctorName}</strong><br />
              <span>🕒 Slot: {appointment.slot}</span><br />
              <span>📅 Date: {appointment.appointmentDate ? formatDate(appointment.appointmentDate) : 'N/A'}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AllAppointments;










