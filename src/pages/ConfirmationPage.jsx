// ConfirmationPage.jsx

import React from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmationPage = () => {
  const { state } = useLocation();
  const { appointment } = state;

  const handleCancelAppointment = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/appointment/${appointment._id}`);
      alert('Appointment cancelled');
      // Redirect to another page (e.g., home or appointment list)
    } catch (error) {
      alert('Error cancelling appointment');
    }
  };

  const handleRescheduleAppointment = () => {
    // Redirect to the appointment form with pre-filled data to reschedule
    // Pass appointment details to pre-populate the form
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Appointment Confirmed</h2>
      <p><strong>Patient:</strong> {appointment.patientName}</p>
      <p><strong>Doctor:</strong> Dr. {appointment.doctorName}</p>
      <p><strong>Appointment Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
      <p><strong>Time Slot:</strong> {appointment.slot}</p>
      <p><strong>Token Number:</strong> #{appointment.token}</p>

      <div>
        <button onClick={handleCancelAppointment}>Cancel Appointment</button>
        <button onClick={handleRescheduleAppointment}>Reschedule Appointment</button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
