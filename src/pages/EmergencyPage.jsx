import React from "react";

const Emergency = () => {
  return (
    <div
      className="container"
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Emergency Services</h2>
      <p style={{ fontSize: '1.25rem', marginBottom: '20px' }}>
        For any emergency, please reach out to the following helpline numbers:
      </p>

      {/* Customer Support Helpline Section */}
      <div
        className="emergency-helpline"
        style={{
          backgroundColor: '#ff4444',
          color: 'white',
          padding: '20px',
          borderRadius: '10px',
          fontSize: '1.5rem',
          maxWidth: '400px',
          width: '100%',
          marginBottom: '20px',
        }}
      >
        <h3>🚨 Customer Support Helpline</h3>
        <p>For immediate assistance, call:</p>
        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>+1-800-123-4567</p>
        <p>Our team is available 24/7 to assist you.</p>
      </div>

      {/* Ambulance Service Section */}
      <div
        className="emergency-ambulance"
        style={{
          backgroundColor: '#28a745',
          color: 'white',
          padding: '20px',
          borderRadius: '10px',
          fontSize: '1.5rem',
          maxWidth: '400px',
          width: '100%',
          marginBottom: '20px',
        }}
      >
        <h3>🚑 Ambulance Service</h3>
        <p>For ambulance services, call:</p>
        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>+1-800-987-6543</p>
        <p>Ambulance services are available 24/7 for emergency transportation.</p>
      </div>

      {/* Optionally, add a contact form or further instructions */}
      <div style={{ marginTop: '30px' }}>
        <p>If you are unable to reach us through the helplines, please use the contact form on our website.</p>
      </div>
    </div>
  );
};

export default Emergency;


