import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppointmentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { hospitalName, doctors } = location.state || {};

  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    if (!hospitalName || !doctors) {
      navigate('/');
    }
  }, [hospitalName, doctors, navigate]);

  // Generate slots from 9:00 AM to 3:45 PM in 15-minute intervals
  const generateSlots = () => {
    const slots = [];
    let hour = 9;
    let minute = 0;

    while (hour < 16) {
      const suffix = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const time = `${String(displayHour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${suffix}`;
      slots.push(time);

      minute += 15;
      if (minute === 60) {
        minute = 0;
        hour += 1;
      }
    }
    return slots;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientName || !age || !gender || !selectedDoctor) {
      alert("Please fill in all fields.");
      return;
    }

    const slotTime = generateSlots()[Math.floor(Math.random() * generateSlots().length)];
    const today = new Date();
    const appointmentDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format

    try {
      const response = await axios.post('http://localhost:5000/api/appointment', {
        hospitalName,
        doctorName: selectedDoctor,
        patientName,
        age,
        gender,
        slotTime, 
        appointmentDate
      });

      setConfirmation(response.data.appointment);
    } catch (error) {
      console.error('Failed to book appointment:', error.response?.data || error.message);
      alert('Failed to book appointment');
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '40px auto',
      padding: '30px',
      border: '1px solid #ddd',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      backgroundColor: '#ffffff',
    }}>
      <h2 style={{ marginBottom: '25px', textAlign: 'center' }}>
        Book Appointment at <span style={{ color: '#007BFF' }}>{hospitalName}</span>
      </h2>

      {!confirmation ? (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label><strong>Patient Name</strong></label><br />
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label><strong>Age</strong></label><br />
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label><strong>Gender</strong></label><br />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label><strong>Select Doctor</strong></label><br />
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
            >
              <option value="">Choose Doctor</option>
              {doctors?.map((doc, index) => (
                <option key={index} value={doc.name}>
                  {doc.name} — {doc.specialization}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
          >
            Book Appointment
          </button>
        </form>
      ) : (
        <div style={{
          backgroundColor: '#eaffea',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
          marginTop: '20px'
        }}>
          <h3>✅ Appointment Confirmed!</h3>
          <p><strong>Hospital:</strong> {confirmation.hospitalName}</p>
          <p><strong>Doctor:</strong> {confirmation.doctorName}</p>
          <p><strong>Patient:</strong> {confirmation.patientName}</p>
          <p><strong>Age:</strong> {confirmation.age}</p>
          <p><strong>Gender:</strong> {confirmation.gender}</p>
          <p><strong>Appointment Slot:</strong> {confirmation.slotTime}</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentForm;









