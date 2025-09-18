import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorAuth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/doctor/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Save token in localStorage for authenticated requests
      localStorage.setItem("token", data.token);

      // Redirect to doctor dashboard
      navigate("/doctor/dashboard");
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
      <form
        onSubmit={handleLogin}
        style={{
          background: "#f8f9fa",
          padding: "30px",
          borderRadius: "10px",
          width: "350px",
          boxShadow: "0 0 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Doctor Login
        </h2>

        {error && (
          <p style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            background: "#007bff",
            color: "#fff",
            fontWeight: "600",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default DoctorAuth;