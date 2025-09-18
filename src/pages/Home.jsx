import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900 text-white">
      {/* Background overlay with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-gray-800 opacity-90 z-0"></div>

      {/* Main content container */}
      <div className="relative z-10 text-center p-8 md:p-12 bg-white bg-opacity-10 rounded-3xl shadow-2xl max-w-2xl backdrop-blur-sm transform transition-all duration-300 hover:scale-105">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-md">
          Welcome to OmniHealth Insights
        </h1>
        <p className="text-lg md:text-xl font-light mb-8 opacity-90 leading-relaxed">
          Your modern and efficient solution for comprehensive hospital management.
          Streamline patient care, manage appointments, and optimize resource availability with our integrated platform.
        </p>

        {/* Call-to-Action button */}
        <Link
          to="/auth"
          className="inline-block py-3 px-8 text-lg font-bold rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:scale-105 transform-gpu"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;





  