import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHospital, FaStethoscope, FaBed } from 'react-icons/fa';

const BedAvailability = () => {
  const [beds, setBeds] = useState([]);
  const [hospitalName, setHospitalName] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    fetchBeds();
  }, [hospitalName, department]);

  const fetchBeds = async () => {
    try {
      setFetching(true);
      const response = await axios.get('http://localhost:5000/api/bed-availability', {
        params: {
          hospitalName,
          department,
        },
      });
      setBeds(response.data);
    } catch (error) {
      console.error('Error fetching bed data:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleReserveBed = async (hospitalName, department) => {
    const confirmed = window.confirm("Proceed to payment and reserve a bed?");
    if (!confirmed) return;

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/bed-availability/reserve', {
        hospitalName,
        department,
      });

      alert(response.data.message || 'Bed reserved successfully!');
      fetchBeds();
    } catch (error) {
      alert(error.response?.data?.message || 'Reservation failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-10 px-4">
      {/* Search Section */}
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-lg mb-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">🔍 Search Bed Availability</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Hospital Name</label>
            <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl">
              <FaHospital className="text-gray-500" />
              <input
                type="text"
                placeholder="Enter hospital name"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                className="bg-transparent w-full outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Department</label>
            <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl">
              <FaStethoscope className="text-gray-500" />
              <input
                type="text"
                placeholder="Enter department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="bg-transparent w-full outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Beds Display Section */}
      <div className="max-w-6xl mx-auto">
        {fetching ? (
          <div className="text-center text-lg text-gray-500">Fetching bed availability...</div>
        ) : beds.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {beds.map((bed) => (
              <div
                key={bed._id}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between border border-blue-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <FaHospital /> {bed.hospitalName}
                  </h3>
                  {bed.hospitalAddress && (
                    <p className="text-sm text-gray-500 mb-2">📍 {bed.hospitalAddress}</p>
                  )}
                  <p className="text-gray-700 mb-1">
                    <strong>Department:</strong> {bed.department}
                  </p>
                  <p className="text-gray-700 mb-4 flex items-center gap-1">
                    <FaBed className="text-blue-500" /> <strong>Available Beds:</strong> {bed.availableBeds}
                  </p>
                </div>
                <button
  onClick={() => handleReserveBed(bed.hospitalName, bed.department)}
  disabled={bed.availableBeds <= 0 || loading}
  className={`mt-6 mx-auto w-full py-3 rounded-xl text-lg font-bold transition-all duration-200 ${
    bed.availableBeds > 0
      ? 'bg-yellow-300 hover:bg-yellow-400 text-black shadow-md'
      : 'bg-gray-300 text-gray-700 cursor-not-allowed'
  }`}
>
  {bed.availableBeds > 0 ? 'Reserve Bed' : 'Unavailable'}
</button>


              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg">No data found for selected filters.</div>
        )}
      </div>
    </div>
  );
};

export default BedAvailability;





