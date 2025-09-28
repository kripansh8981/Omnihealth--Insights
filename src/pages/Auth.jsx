import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UnifiedAuth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [userType, setUserType] = useState('doctor');
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const url = `http://localhost:5000/api/auth/${userType}/${mode}`;
      const payload = { email: formData.email, password: formData.password };
      
      // Build signup payload
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
      
      // 1. Set token immediately
      localStorage.setItem('token', res.data.token);
      
      // 2. Determine and execute redirection immediately
      if (userType === 'doctor') {
        navigate('/doctor/dashboard');
      } else if (userType === 'patient') {
        navigate('/hospitals');
      } else if (userType === 'hospital') {
        navigate('/hospital/dashboard');
      }

      // We explicitly return here so setLoading(false) is skipped in case of success
      return; 
      // If we reach here, navigation was initiated.

    } catch (error) {
      // If error occurs, set message and loading to false
      setMessage(error.response?.data?.error || 'Something went wrong. Try again.');
      
    } finally {
      // This ensures loading state is always cleared, even after successful navigation
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    if (userType === 'doctor') {
      return 'e.g., General Practice';
    } else if (userType === 'patient') {
      return 'e.g., 30';
    } else if (userType === 'hospital') {
      return 'e.g., 123 Main St';
    }
    return '';
  };

  const getLabel = () => {
    if (userType === 'doctor') {
      return 'Specialization';
    } else if (userType === 'patient') {
      return 'Age';
    } else if (userType === 'hospital') {
      return 'Address';
    }
    return '';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-8 md:p-12 rounded-2xl shadow-2xl">
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
          <button onClick={() => setUserType('doctor')} className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${userType === 'doctor' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
            Doctor
          </button>
          <button onClick={() => setUserType('patient')} className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${userType === 'patient' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
            Patient
          </button>
          <button onClick={() => setUserType('hospital')} className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${userType === 'hospital' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
            Hospital
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {message && (
            <div className={`p-4 rounded-lg font-medium text-center ${message.includes('Success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
          </div>

          {mode === 'signup' && userType === 'doctor' && (
            <div>
              <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
              <input type="text" id="specialization" name="specialization" value={formData.specialization} onChange={handleInputChange} required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
            </div>
          )}
          
          {mode === 'signup' && userType === 'patient' && (
            <div>
              <label htmlFor='age' className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input type="number" id='age' name='age' value={formData.age} onChange={handleInputChange} required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
            </div>
          )}
          
          {mode === 'signup' && userType === 'hospital' && (
            <div>
              <label htmlFor='address' className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input type="text" id='address' name='address' value={formData.address} onChange={handleInputChange} required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
            </div>
          )}

          <button type="submit" disabled={loading} className={`w-full p-4 rounded-lg font-bold text-white transition-colors duration-200 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {/* Mode Switcher */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-blue-600 font-semibold ml-2 hover:underline focus:outline-none">
              {mode === 'login' ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnifiedAuth;