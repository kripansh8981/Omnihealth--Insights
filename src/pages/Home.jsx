import React from "react";
import { Link } from "react-router-dom";
import hospitalImage from "./image.jpg";

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${hospitalImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        overflowX: "hidden",
        position: "relative",
        color: "#fff",
      }}
    >
      {/* Overlay for dark background effect */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          padding: "60px 40px",
          borderRadius: "12px",
          maxWidth: "1200px",
          width: "100%",
          boxShadow: "0 0 30px rgba(0,0,0,0.7)",
          textAlign: "center",
        }}
      >
        {/* Main Title */}
        <h1 style={{ fontSize: "3rem", marginBottom: "12px" }}>Welcome to OmniHealth Insights</h1>
        {/* Subtitle */}
        <p style={{ fontSize: "1.3rem", marginBottom: "40px", opacity: 0.85 }}>
          A next-gen hospital management solution for OPD, beds, admissions & inventory.
        </p>
        {/* Login Options as Buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {/* Doctor Login */}
          <Link
            to="/doctor/auth"
            style={{
              padding: "14px 20px",
              width: "180px",
              backgroundColor: "#007bff",
              color: "white",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "600",
              textAlign: "center",
              textDecoration: "none",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              transition: "background-color 0.3s, transform 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Doctor Login
          </Link>

          {/* Patient Login */}
          <Link
            to="/patient/auth"
            style={{
              padding: "14px 20px",
              width: "180px",
              backgroundColor: "#28a745",
              color: "white",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "600",
              textAlign: "center",
              textDecoration: "none",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e7e34")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
          >
            Patient Login
          </Link>

          {/* Hospital Login */}
          <Link
            to="/hospital/auth"
            style={{
              padding: "14px 20px",
              width: "180px",
              backgroundColor: "#17a2b8",
              color: "white",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "600",
              textAlign: "center",
              textDecoration: "none",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#117a8b")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#17a2b8")}
          >
            Hospital Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;











  