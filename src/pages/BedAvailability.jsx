import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BedAvailability = () => {
  const [beds, setBeds] = useState([]);
  const [hospitalName, setHospitalName] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // Debounce input to reduce API calls
  const [debouncedHospital, setDebouncedHospital] = useState('');
  const [debouncedDepartment, setDebouncedDepartment] = useState('');

  useEffect(() => {
    fetchBeds();
  }, [hospitalName, department]);
  
  const fetchBeds = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bed-availability', {
        params: {
          hospitalName,
          department,
        },
      });
      console.log("Fetched Beds:", response.data); // DEBUG
      setBeds(response.data);
    } catch (error) {
      console.error('Error fetching bed data:', error);
    }
  };
  

  const handleReserveBed = async (hospitalName, department) => {
    const confirmed = window.confirm("Proceed to payment and reserve a bed?");
    if (!confirmed) return;
  
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/bed-availability/reserve', {
        hospitalName,
        department
      });
  
      alert(response.data.message || 'Bed reserved successfully!');
      fetchBeds(); // Refresh data after successful reservation
    } catch (error) {
      alert(error.response?.data?.message || 'Reservation failed!');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mx-auto p-6">
      {/* Search Filters */}
      <div className="mb-6 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Search Bed Availability</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by Hospital Name"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Beds List */}
      {fetching ? (
        <div className="text-center text-gray-600 py-12">Fetching available beds...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beds.length > 0 ? (
            beds.map((bed) => (
              <div
                key={bed._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-1">{bed.hospitalName}</h3>
                  {bed.hospitalAddress && (
                    <p className="text-sm text-gray-500 mb-1">📍 {bed.hospitalAddress}</p>
                  )}
                  <p className="text-gray-700 mb-1">Department: <strong>{bed.department}</strong></p>
                  <p className="text-gray-700 mb-4">Available Beds: <strong>{bed.availableBeds}</strong></p>
                </div>
                <button
  onClick={() => handleReserveBed(bed.hospitalName, bed.department)}
  disabled={bed.availableBeds <= 0 || loading}
  className={`mt-auto px-6 py-3 rounded-full text-black font-extrabold text-lg tracking-wide shadow-md transition-transform transform hover:scale-105 ${
    bed.availableBeds > 0
      ? 'bg-lightblue-500 hover:bg-lightblue-600'  // light blue background
      : 'bg-gray-400 cursor-not-allowed'
  }`}
>
  {bed.availableBeds > 0 ? 'Reserve Bed' : 'Unavailable'}
</button>


              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No data available for the selected filters.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BedAvailability;



