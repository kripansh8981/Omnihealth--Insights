// OPDQueue.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const hospitals = [
  "Apollo Gleneagles",
  "Manipal Hospital (Salt Lake)",
  "AIIMS Kalyani",
];

const OPDQueue = () => {
  const navigate = useNavigate();

  const handleCardClick = (hospitalName) => {
    navigate("/hospitals", {
      state: { from: "opdqueue", hospitalName }, // Pass both
    });
  };

  return (
    <div className="opd-wrapper">
      <h2>Select a Hospital for OPD Queue</h2>
      <div className="opd-card-container">
        {hospitals.map((name, idx) => (
          <div
            key={idx}
            className="opd-card"
            onClick={() => handleCardClick(name)}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OPDQueue;




