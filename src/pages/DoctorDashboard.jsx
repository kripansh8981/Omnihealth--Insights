import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [affiliateData, setAffiliateData] = useState({ hospitalId: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  // 1. Fetch User Data, Hospitals, and Appointments
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        navigate('/auth');
        return;
      }
      try {
        // Fetch User Profile
        const userResponse = await axios.get('http://localhost:5000/api/protected/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userResponse.data.user);

        // Fetch Hospital List for Affiliation Form
        const hospitalResponse = await axios.get('http://localhost:5000/api/hospitals');
        setHospitals(hospitalResponse.data);

        // Fetch Appointments booked to this doctor
        const appointmentResponse = await axios.get('http://localhost:5000/api/doctors/appointments', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(appointmentResponse.data);

      } catch (err) {
        console.error('Error fetching doctor data:', err);
        setMessage('Failed to load dashboard data. Please log in again.');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, token]);

  const handleAffiliationSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!affiliateData.hospitalId) {
      setMessage('Please select a hospital.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/doctors/affiliate', {
        hospitalId: affiliateData.hospitalId,
        name: user.name, // Doctor's name from their profile
        specialization: user.specialization, // Doctor's specialization from their profile
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Affiliation failed. Check if you are already affiliated.');
    }
  };

  const formatAppointmentDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  if (loading) {
    return <div className="p-8 text-center">Loading Doctor Dashboard...</div>;
  }

  if (!user) {
    return <div className="p-8 text-center text-red-600">You must be logged in to view this page.</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
        Dr. {user.name}'s Dashboard
      </h1>
      <p className="text-xl text-gray-600 mb-8">{user.specialization}</p>

      {message && (
        <div className={`p-4 rounded-lg font-medium text-center mb-4 ${
          message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}

      {/* Hospital Affiliation Section */}
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b pb-2">Hospital Affiliation</h2>
        <p className="text-gray-600 mb-6">Register your profile with a hospital to start accepting appointments.</p>
        
        <form onSubmit={handleAffiliationSubmit} className="flex flex-col md:flex-row gap-4">
          <select 
            value={affiliateData.hospitalId} 
            onChange={(e) => setAffiliateData({ hospitalId: e.target.value })}
            className="w-full md:w-2/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Hospital --</option>
            {hospitals.map((hospital) => (
              <option key={hospital._id} value={hospital._id}>
                {hospital.name} ({hospital.address})
              </option>
            ))}
          </select>
          <button 
            type="submit"
            className="w-full md:w-1/3 p-3 font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400"
            disabled={!affiliateData.hospitalId}
          >
            Affiliate Me
          </button>
        </form>
      </div>

      {/* Upcoming Appointments Section */}
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Upcoming Appointments</h2>
        
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appt) => (
              <div key={appt._id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 grid grid-cols-3 md:grid-cols-5 gap-4 items-center">
                <div className="col-span-2 md:col-span-1">
                  <p className="text-xs text-gray-500 font-semibold">DATE</p>
                  <p className="font-bold text-lg text-gray-800">{formatAppointmentDate(appt.appointmentDate)}</p>
                </div>
                <div className="col-span-1">
                  <p className="text-xs text-gray-500 font-semibold">TIME</p>
                  <p className="font-bold text-lg text-gray-800">{appt.slotTime}</p>
                </div>
                <div className="col-span-3 md:col-span-2">
                  <p className="text-xs text-gray-500 font-semibold">PATIENT</p>
                  <p className="text-lg text-gray-800">Patient ID: {appt.patientId}</p>
                </div>
                <div className="col-span-3 md:col-span-1 text-right">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-yellow-500 rounded-full">
                        Token: {appt.token}
                    </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-lg">
            You have no appointments booked yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
