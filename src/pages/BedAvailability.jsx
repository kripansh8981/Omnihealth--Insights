import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BedAvailability = () => {
  const { hospitalId } = useParams();
  const [bedData, setBedData] = useState(null);
  const [hospitalName, setHospitalName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBedAvailability = async () => {
      try {
        const bedResponse = await axios.get(`http://localhost:5000/api/bed-availability/${hospitalId}`);
        setBedData(bedResponse.data);

        const hospitalResponse = await axios.get(`http://localhost:5000/api/hospitals/${hospitalId}`);
        setHospitalName(hospitalResponse.data.name);
      } catch (err) {
        setError('Failed to fetch bed availability. Please check the hospital ID and server connection.');
      } finally {
        setLoading(false);
      }
    };
    if (hospitalId) {
      fetchBedAvailability();
    } else {
      setError('Hospital ID not found.');
      setLoading(false);
    }
  }, [hospitalId]);

  if (loading) {
    return <div className="container mx-auto p-8 text-center text-gray-600">Loading bed availability...</div>;
  }
  if (error) {
    return <div className="container mx-auto p-8 text-center text-red-600">Error: {error}</div>;
  }
  
  const occupiedBeds = bedData.totalBeds - bedData.availableBeds;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-12 mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Bed Availability at {hospitalName}
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
          <div className="bg-blue-100 rounded-full p-8 w-48 h-48 flex flex-col items-center justify-center shadow-lg">
            <p className="text-5xl font-extrabold text-blue-600">{bedData.availableBeds}</p>
            <p className="text-lg text-blue-800 font-semibold mt-2">Available Beds</p>
          </div>
          <div className="bg-red-100 rounded-full p-8 w-48 h-48 flex flex-col items-center justify-center shadow-lg">
            <p className="text-5xl font-extrabold text-red-600">{occupiedBeds}</p>
            <p className="text-lg text-red-800 font-semibold mt-2">Occupied Beds</p>
          </div>
          <div className="bg-gray-100 rounded-full p-8 w-48 h-48 flex flex-col items-center justify-center shadow-lg">
            <p className="text-5xl font-extrabold text-gray-600">{bedData.totalBeds}</p>
            <p className="text-lg text-gray-800 font-semibold mt-2">Total Beds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BedAvailability;
