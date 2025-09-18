import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './HospitalCard.css'; // Assuming you’ve got styles for the card

const HospitalCard = ({ hospital }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/hospitals/${hospital._id}`);
  };

  return (
    <div className="hospital-card" onClick={handleClick}>
      <div className="hospital-image">
        {hospital.image ? (
          <img src={hospital.image} alt={hospital.name} />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>
      <div className="card-content">
        <h3>{hospital.name}</h3>
        <p className="location">{hospital.location}</p>
        <p className="specialization">{hospital.specialization.join(', ')}</p>
      </div>
    </div>
  );
};

export default HospitalCard;
