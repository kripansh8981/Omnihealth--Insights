import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const HospitalDetails = () => {
  const { hospitalId } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospitalDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hospitals/${hospitalId}`);
        setHospital(response.data);
      } catch (err) {
        setError('Failed to fetch hospital details. Please ensure the backend server is running and the ID is valid.');
      } finally {
        setLoading(false);
      }
    };
    if (hospitalId) {
      fetchHospitalDetails();
    } else {
      setError('Hospital ID not found.');
      setLoading(false);
    }
  }, [hospitalId]);

  // Function to handle redirection to the AppointmentForm (passes only Hospital ID)
  const handleBookAppointmentClick = () => {
    // Navigates to a generalized booking page for this specific hospital
    navigate(`/appointment/book/${hospitalId}`);
  };
  
  // Function to handle redirection to Bed Availability
  const handleCheckBedAvailabilityClick = () => {
    navigate(`/bed-availability/${hospitalId}`);
  };


  if (loading) {
    return <div className="container mx-auto p-8 text-center text-gray-600">Loading hospital details...</div>;
  }
  if (error) {
    return <div className="container mx-auto p-8 text-center text-red-600">Error: {error}</div>;
  }
  if (!hospital) {
    return <div className="container mx-auto p-8 text-center text-gray-500">Hospital not found.</div>;
  }

  const defaultImage = 'https://placehold.co/600x300/a3b1c6/ffffff?text=Hospital+Image';
  const hasDoctors = hospital.doctors && hospital.doctors.length > 0;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        
        {/* Hospital Header Section */}
        <div className="relative p-6 md:p-10 bg-blue-700 text-white shadow-lg">
          <h1 className="text-4xl md:text-5xl font-extrabold">{hospital.name}</h1>
          <p className="text-blue-200 mt-1">{hospital.address || "Location not specified"}</p>
        </div>

        <div className="p-6 md:p-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 border-b pb-8">
            
            {/* Contact and Image Section */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-md col-span-1 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Profile & Contact</h2>
                <img
                  src={hospital.image || defaultImage}
                  alt={`${hospital.name} cover`}
                  className="w-full h-auto rounded-lg shadow-md mb-4"
                  onError={(e) => { e.target.onerror = null; e.target.src = defaultImage; }}
                />
                <p className="text-gray-700 mb-3">
                  <span className="font-semibold text-blue-600">Phone:</span> {hospital.phone || "Not specified"}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold text-blue-600">Email:</span> {hospital.email}
                </p>
              </div>
            </div>

            {/* Action Buttons Section */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Appointment Booking Button */}
              <div className="bg-green-50 p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-green-800 mb-4">Doctor Appointment</h2>
                <p className="text-gray-700 mb-4">Select a specialist and book your visit instantly.</p>
                <button
                  onClick={handleBookAppointmentClick}
                  className="w-full py-3 px-4 font-bold rounded-lg text-white transition-colors duration-200 bg-green-600 hover:bg-green-700"
                >
                  Book Appointment
                </button>
              </div>
              
              {/* Bed Availability Button */}
              <div className="bg-purple-50 p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-purple-800 mb-4">Bed Availability</h2>
                <p className="text-gray-700 mb-4">View real-time bed status before visiting the hospital.</p>
                <button
                  onClick={handleCheckBedAvailabilityClick}
                  className="w-full py-3 px-4 font-bold rounded-lg text-white transition-colors duration-200 bg-purple-600 hover:bg-purple-700"
                >
                  Check Bed Availability
                </button>
              </div>
              
            </div>
            
          </div>
          
          {/* List of Doctors (Simple Listing) */}
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Specialists</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hasDoctors ? (
              hospital.doctors.map((doctor, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-4 shadow-sm border border-gray-200">
                  <h4 className="font-bold text-lg text-gray-900">Dr. {doctor.name}</h4>
                  <p className="text-sm text-gray-600">{doctor.specialization}</p>
                </div>
              ))
            ) : (
              <div className="col-span-4 text-center p-4 bg-gray-50 rounded-lg text-gray-500">No doctors have been added yet by the hospital management.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HospitalDetails;
