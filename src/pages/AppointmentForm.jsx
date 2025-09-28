import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppointmentForm = () => {
  const { hospitalId } = useParams();
  const navigate = useNavigate();

  const [hospitalName, setHospitalName] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [email, setEmail] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch hospital and doctor data on page load
  useEffect(() => {
    const fetchData = async () => {
      if (!hospitalId) {
        setErrorMessage('Hospital not found. Please select a hospital from the list.');
        return;
      }
      
      try {
        const hospitalResponse = await axios.get(`http://localhost:5000/api/hospitals/${hospitalId}`);
        setHospitalName(hospitalResponse.data.name);
        
        const doctorsResponse = await axios.get(`http://localhost:5000/api/appointment/doctors/${hospitalId}`);
        setDoctors(doctorsResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMessage('Could not load hospital or doctor data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [hospitalId]);

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
    setLoading(true);
    setErrorMessage('');

    if (!patientName || !age || !gender || !selectedDoctor || !email) {
      setErrorMessage("Please fill in all fields.");
      setLoading(false);
      return;
    }
    
    const slotTime = generateSlots()[Math.floor(Math.random() * generateSlots().length)];
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const appointmentDate = today.toISOString().split('T')[0];

    try {
      const response = await axios.post('http://localhost:5000/api/appointment', {
        hospitalName,
        doctorName: selectedDoctor,
        patientName,
        age,
        gender,
        email,
        slotTime,
        appointmentDate
      });
      setConfirmation(response.data.appointment);
    } catch (error) {
      console.error('Failed to book appointment:', error.response?.data || error.message);
      setErrorMessage('Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!hospitalName) {
    return <div className="min-h-screen flex items-center justify-center text-red-600 font-bold">{errorMessage}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Book Appointment at <span className="text-blue-600">{hospitalName}</span>
        </h2>
        {errorMessage && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg text-center font-medium">
            {errorMessage}
          </div>
        )}

        {!confirmation ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient Name
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Doctor
              </label>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
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
              disabled={loading}
              className="w-full py-3 px-4 font-bold rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-400"
            >
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
          </form>
        ) : (
          <div className="bg-green-100 p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-green-800 mb-2">✅ Appointment Confirmed!</h3>
            <p className="text-green-700">Your appointment has been successfully booked.</p>
            <div className="mt-4 text-left space-y-2">
              <p><strong>Hospital:</strong> {confirmation.hospitalName}</p>
              <p><strong>Doctor:</strong> {confirmation.doctorName}</p>
              <p><strong>Patient:</strong> {confirmation.patientName}</p>
              <p><strong>Age:</strong> {confirmation.age}</p>
              <p><strong>Gender:</strong> {confirmation.gender}</p>
              <p><strong>Email:</strong> {confirmation.email}</p>
              <p><strong>Appointment Slot:</strong> {confirmation.slotTime}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentForm;







