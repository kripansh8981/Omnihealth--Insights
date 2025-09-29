import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppointmentForm = () => {
  // Extracts parameters from the URL
  const { hospitalId } = useParams(); 
  const navigate = useNavigate();

  const [hospital, setHospital] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: '',
    email: '',
    appointmentDate: '',
    slotTime: '', // Will be set by the scheduling logic on the backend
    doctorId: '',
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  // 1. Fetch Hospital and Doctor Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch hospital details
        const hospitalResponse = await axios.get(`http://localhost:5000/api/hospitals/${hospitalId}`);
        setHospital(hospitalResponse.data);

        // Fetch list of doctors for the dropdown
        const doctorsResponse = await axios.get(`http://localhost:5000/api/appointment/doctors/${hospitalId}`);
        setDoctors(doctorsResponse.data);
        
      } catch (error) {
        setErrorMessage(error.message || 'Could not load hospital or doctor data.');
      } finally {
        setLoading(false);
      }
    };
    if (hospitalId) {
      fetchData();
    } else {
      setErrorMessage('Invalid hospital ID.');
      setLoading(false);
    }
  }, [hospitalId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Handle Form Submission
  const handleSubmit = async (e) => {
    // CRITICAL FIX: Prevents the browser from navigating away (the blank page error)
    e.preventDefault(); 
    setLoading(true);
    setErrorMessage('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage("Please log in to book an appointment.");
        navigate('/auth');
        return;
      }
      
      const response = await axios.post('http://localhost:5000/api/appointment/book', {
        ...formData,
        hospitalId: hospitalId, // Ensure hospitalId is always sent
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      setConfirmation(response.data.appointment);
    } catch (error) {
      console.error('Failed to book appointment:', error);
      setErrorMessage(error.response?.data?.message || 'Booking failed. No available slots or server error.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading appointment form...</div>;
  }
  if (errorMessage && !confirmation) {
    return <div className="min-h-screen flex items-center justify-center text-red-600 font-bold">{errorMessage}</div>;
  }
  if (!hospital) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Hospital data not available.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Book Appointment at <span className="text-blue-600">{hospital.name}</span>
        </h2>
        
        {/* Error/Confirmation Message */}
        {errorMessage && !confirmation && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg text-center font-medium">
            {errorMessage}
          </div>
        )}

        {confirmation ? (
          <div className="bg-green-100 p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-green-800 mb-2">✅ Appointment Confirmed!</h3>
            <p className="text-green-700">Your appointment has been successfully booked.</p>
            <div className="mt-4 text-left space-y-2">
              <p><strong>Doctor:</strong> {confirmation.doctorName}</p>
              <p><strong>Date:</strong> {new Date(confirmation.appointmentDate).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {confirmation.slotTime}</p>
              <p><strong>Token:</strong> {confirmation.token}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Patient Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
              <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
            </div>

            {/* Doctor Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Doctor</label>
              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">-- Choose Doctor --</option>
                {doctors?.map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    Dr. {doc.name} - {doc.specialization}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
              <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 px-4 font-bold rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-400">
              {loading ? 'Booking...' : 'Confirm Appointment'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AppointmentForm;