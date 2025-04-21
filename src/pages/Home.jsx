import React from "react";
import { Link } from "react-router-dom";
import hospitalImage from './image.jpg'; // Local image inside src/pages

const Home = () => {
  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${hospitalImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '20px',
        width: '100%',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          textAlign: 'center',
          zIndex: 2,
          padding: '80px 20px',
          maxWidth: '1200px',
          width: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '10px',
          marginBottom: '40px',
        }}
      >
        <h2 style={{ fontSize: '3rem', marginBottom: '20px', color: '#ffffff' }}>
          Welcome to OmniHealth Insights
        </h2>
        <p style={{ fontSize: '1.25rem', opacity: 0.9, color: '#ffffff' }}>
          A next-gen hospital management solution for OPD, beds, admissions & inventory.
        </p>
      </div>

      {/* Feature Cards */}
      <div
        className="section features"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          zIndex: 2,
          maxWidth: '1200px',
          width: '100%',
          marginBottom: '40px',
        }}
      >
        {/* OPD Queue Card (Redirecting to Hospitals with state from opdqueue) */}
        <Link
          to="/hospitals"
          state={{ from: "opdqueue" }}
          className="feature-card"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <h3>OPD Queue</h3>
          <p>Track live outpatient queues for better patient flow.</p>
        </Link>

        {/* Find Hospitals Card (Redirecting to Hospitals page) */}
        <Link
          to="/hospitals"
          className="feature-card"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <h3>Find Hospitals</h3>
          <p>Search and explore hospitals across the city.</p>
        </Link>

        {/* City-wide Integration Card (Redirecting to Hospitals page) */}
        <Link
          to="/hospitals"
          className="feature-card"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <h3>City-wide Integration</h3>
          <p>Connect with a larger health network seamlessly.</p>
        </Link>

        {/* Bed Availability Card (Redirecting to Bed Availability page) */}
      {/* Bed Availability Card (Redirecting to Bed Availability page) */}
<Link
  to="/bed-availability"  // Corrected the path
  className="feature-card"
  style={{ textDecoration: 'none', color: 'inherit' }}
>
  <h3>Bed Availability</h3>
  <p>Monitor current bed status across departments.</p>
</Link>


        {/* Inventory Card (Redirecting to Inventory page) */}
        <Link
          to="/inventory"
          className="feature-card"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <h3>Inventory</h3>
          <p>Stay stocked with real-time inventory management.</p>
        </Link>

        {/* Emergency Card (Redirecting to Emergency page) */}
        <Link
          to="/emergency"
          className="feature-card emergency-card"
          style={{
            backgroundColor: '#ff4444',
            color: 'white',
            textDecoration: 'none',
          }}
        >
          <h3>🚨 Emergency</h3>
          <p>Quick response for emergency cases and immediate care.</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;














  