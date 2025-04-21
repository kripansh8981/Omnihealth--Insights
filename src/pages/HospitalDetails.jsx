// pages/HospitalDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const HospitalDetails = () => {
  const { hospitalName } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospitalDetails = async () => {
      try {
        const response = await axios.get(`/api/hospitals/${encodeURIComponent(hospitalName)}`);
        setHospital(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching hospital details:", err);
        setError('Error fetching hospital details');
        setLoading(false);
      }
    };

    fetchHospitalDetails();
  }, [hospitalName]);

  const handleBookAppointment = () => {
    navigate('/appointment', {
      state: {
        hospitalName: hospital.name,
        doctors: hospital.doctors,
      },
    });
  };

  const handleViewAppointments = () => {
    navigate(`/appointments/${encodeURIComponent(hospital.name)}`);
  };

  if (loading) return <div style={{ textAlign: 'center' }}>Loading hospital details...</div>;
  if (error) return <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>;

  return (
    <div style={{
      padding: '40px',
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '40px',
      alignItems: 'start',
    }}>
      {/* Left Column */}
      <div>
        <img 
          src={hospital.image} 
          alt={hospital.name} 
          style={{ 
            width: '100%', 
            height: 'auto', 
            maxHeight: '400px', 
            objectFit: 'cover', 
            borderRadius: '12px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            marginBottom: '20px'
          }}
        />
        <h2 style={{ fontSize: '2.2rem', marginBottom: '10px' }}>{hospital.name}</h2>
        <p style={{ marginBottom: '8px' }}><strong>📍 Location:</strong> {hospital.location}</p>
        <p style={{ marginBottom: '8px' }}>
          <strong>🔬 Specializations:</strong> {hospital.specialization.join(', ')}
        </p>
      </div>

      {/* Right Column */}
      <div>
        {/* Doctors Section */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>👨‍⚕️ Doctors</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {hospital.doctors.map((doctor, index) => (
              <li key={index} style={{ 
                marginBottom: '15px', 
                padding: '10px', 
                backgroundColor: '#f9f9f9', 
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              }}>
                <strong>{doctor.name}</strong> - {doctor.specialization} <br />
                <small>🕒 Available: {doctor.availability.join(', ')}</small>
              </li>
            ))}
          </ul>
        </div>

        {/* Bed Availability Section */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>🛏️ Bed Availability</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {hospital.bedAvailability.map((bed, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                <strong>{bed.type}</strong>: {bed.availableBeds} / {bed.totalBeds} beds available
              </li>
            ))}
          </ul>
        </div>

        {/* Buttons Section */}
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={handleBookAppointment} 
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              fontSize: '18px',
              borderRadius: '8px',
              cursor: 'pointer',
              marginRight: '20px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              transition: '0.3s ease',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
          >
            💬 Book Appointment Now
          </button>

          <button 
            onClick={handleViewAppointments}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              fontSize: '18px',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              transition: '0.3s ease',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            📋 View Appointments
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails;







