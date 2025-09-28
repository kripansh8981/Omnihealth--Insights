import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HospitalDashboard = () => {
  const navigate = useNavigate();
  const [hospital, setHospital] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    website: '',
    image: '',
  });
  const [newDoctor, setNewDoctor] = useState({ name: '', specialization: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/auth');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/protected/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fetchedHospital = response.data.user;
        setHospital(fetchedHospital);
        setFormData({
          name: fetchedHospital.name || '',
          email: fetchedHospital.email || '',
          address: fetchedHospital.address || '',
          phone: fetchedHospital.phone || '',
          website: fetchedHospital.website || '',
          image: fetchedHospital.image || '',
        });
      } catch (err) {
        console.error('Failed to fetch hospital data:', err);
        navigate('/auth');
      } finally {
        setLoading(false);
      }
    };

    fetchHospital();
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDoctorChange = (e) => {
    setNewDoctor({ ...newDoctor, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.put(`http://localhost:5000/api/hospitals/${hospital._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage('Hospital details updated successfully!');
      setHospital(response.data.hospital);
    } catch (err) {
      console.error('Error updating hospital details:', err);
      setMessage('Failed to update details.');
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const updatedDoctors = [...(hospital.doctors || []), newDoctor];

      const response = await axios.put(`http://localhost:5000/api/hospitals/${hospital._id}/doctors`, { doctors: updatedDoctors }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage('Doctor added successfully!');
      setHospital(response.data.hospital);
      setNewDoctor({ name: '', specialization: '' });
    } catch (err) {
      console.error('Error adding doctor:', err);
      setMessage('Failed to add doctor.');
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  if (!hospital) {
    return <div className="p-8 text-center text-red-600">You must be logged in as a hospital to view this page.</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-12 mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Hospital Dashboard
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Manage your hospital's profile and doctors.
        </p>

        {message && (
          <div className={`p-4 rounded-lg font-medium text-center mb-4 ${
            message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        {/* Hospital Profile Form */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Update Profile</h2>
        <form onSubmit={handleProfileSubmit} className="space-y-6 mb-12">
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Hospital Name
              </label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required readOnly className="w-full p-3 rounded-lg border border-gray-300 bg-gray-200 cursor-not-allowed" />
            </div>
          </div>
          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* New fields: Phone, Website, Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input type="text" name="website" value={formData.website} onChange={handleInputChange} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input type="text" name="image" value={formData.image} onChange={handleInputChange} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {formData.image && (
              <img src={formData.image} alt="Hospital preview" className="mt-4 rounded-lg shadow-md max-w-xs" />
            )}
          </div>

          <button type="submit" className="w-full p-4 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
            Update Profile
          </button>
        </form>

        <hr className="my-8" />

        {/* Doctor Management Section */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Manage Doctors</h2>
        <form onSubmit={handleAddDoctor} className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Doctor's Name
              </label>
              <input type="text" name="name" value={newDoctor.name} onChange={handleDoctorChange} required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
                Specialization
              </label>
              <input type="text" name="specialization" value={newDoctor.specialization} onChange={handleDoctorChange} required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <button type="submit" className="w-full p-4 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700 transition-colors duration-200">
            Add Doctor
          </button>
        </form>

        {/* List of Doctors */}
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Current Doctors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {hospital.doctors?.length > 0 ? (
            hospital.doctors.map((doctor, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4 shadow-sm">
                <h4 className="font-bold text-gray-900">Dr. {doctor.name}</h4>
                <p className="text-sm text-gray-600">{doctor.specialization}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">No doctors have been added yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
