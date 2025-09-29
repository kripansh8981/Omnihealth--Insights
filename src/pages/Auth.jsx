import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UnifiedAuth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [userType, setUserType] = useState('doctor'); // 'doctor', 'patient', 'hospital'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialization: '',
    age: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // Flag to control useEffect redirect
  const [successfulUserRole, setSuccessfulUserRole] = useState(null);

  // Effect to handle navigation only after a successful transaction
  useEffect(() => {
    if (isSuccess && successfulUserRole) {
      if (successfulUserRole === 'patient' && mode === 'signup') {
        navigate('/hospitals');
      } else if (successfulUserRole === 'doctor') {
        navigate('/doctor/dashboard');
      } else if (successfulUserRole === 'hospital') {
        navigate('/hospital/dashboard');
      } else if (successfulUserRole === 'patient') {
        // Patient login redirects to hospital list
        navigate('/hospitals');
      }
    }
  }, [isSuccess, successfulUserRole, mode, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsSuccess(false);

    try {
      const url = `http://localhost:5000/api/auth/${userType}/${mode}`;
      const payload = { email: formData.email, password: formData.password };

      if (mode === 'signup') {
        payload.name = formData.name;
        if (userType === 'doctor') {
          payload.specialization = formData.specialization;
        } else if (userType === 'patient') {
          payload.age = formData.age;
        } else if (userType === 'hospital') {
          payload.address = formData.address;
        }
      }

      const res = await axios.post(url, payload);

      // CRITICAL FIX: Ensure the token exists in the response before proceeding
      if (!res.data.token) {
        throw new Error("Authentication failed: Missing token in server response. Check backend response structure.");
      }
      
      localStorage.setItem('token', res.data.token); 
      setMessage(res.data.message || 'Success! Redirecting...');
      
      // Set flags to trigger the useEffect for reliable navigation
      setSuccessfulUserRole(res.data.user.role);
      setIsSuccess(true); 

    } catch (error) {
      setMessage(error.response?.data?.error || error.message || 'Something went wrong. Try again.');
      // Ensure flags are reset on failure
      setIsSuccess(false);
      setSuccessfulUserRole(null);
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    if (userType === 'doctor') return 'e.g., General Practice';
    if (userType === 'patient') return 'e.g., 30';
    if (userType === 'hospital') return 'e.g., 123 Main St';
    return '';
  };

  const getLabel = () => {
    if (userType === 'doctor') return 'Specialization';
    if (userType === 'patient') return 'Age';
    if (userType === 'hospital') return 'Address';
    return '';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-8 md:p-12 rounded-2xl shadow-2xl">
        {/* Header and User Type Switch */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h1>
          <p className="text-gray-600">
            {mode === 'login' ? 'Sign in to your account' : 'Sign up to get started'}
          </p>
        </div>

        {/* User Type Selection */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setUserType('doctor')}
            className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
              userType === 'doctor' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Doctor
          </button>
          <button
            onClick={() => setUserType('patient')}
            className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
              userType === 'patient' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Patient
          </button>
          <button
            onClick={() => setUserType('hospital')}
            className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
              userType === 'hospital' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Hospital
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {message && (
            <div
              className={`p-4 rounded-lg font-medium text-center ${
                message.includes('Success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {message}
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>

          {mode === 'signup' && (userType === 'doctor' || userType === 'hospital') && (
            <div>
              <label htmlFor={getLabel()} className="block text-sm font-medium text-gray-700 mb-1">
                {getLabel()}
              </label>
              <input
                type="text"
                id={getLabel()}
                name={getLabel().toLowerCase()}
                value={formData[getLabel().toLowerCase()]}
                onChange={handleInputChange}
                required
                placeholder={getPlaceholder()}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
            </div>
          )}
          
           {mode === 'signup' && userType === 'patient' && (
            <div>
              <label htmlFor='age' className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                id='age'
                name='age'
                value={formData.age}
                onChange={handleInputChange}
                required
                placeholder={getPlaceholder()}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg font-bold text-white transition-colors duration-200 ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {/* Mode Switcher */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setMessage('');
              }}
              className="text-blue-600 font-semibold ml-2 hover:underline focus:outline-none"
            >
              {mode === 'login' ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnifiedAuth;