import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 md:p-6 flex items-center justify-between shadow-lg">
      <Link to="/" className="text-2xl font-bold text-blue-400">
        OmniHealth
      </Link>
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="hover:text-blue-400 transition-colors duration-200">Home</Link>
        <Link to="/modules" className="hover:text-blue-400 transition-colors duration-200">Modules</Link>
        <Link to="/contact" className="hover:text-blue-400 transition-colors duration-200">Contact</Link>
        <Link to="/hospitals" className="hover:text-blue-400 transition-colors duration-200">Hospitals</Link>
        <Link to="/auth" className="bg-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200">
          Sign Up / Login
        </Link>
      </div>

      {/* Mobile menu (optional, can be expanded later) */}
      <div className="md:hidden">
        {/* You can add a hamburger menu icon here for mobile */}
        <button className="text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;


