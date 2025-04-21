import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Hospitals.css"; // Ensure this CSS file exists

// Dummy data of hospitals (replace with your actual data source)
const hospitals = [
  {
    name: "Manipal Hospital (Salt Lake)",
    location: "Salt Lake, Kolkata",
    specialization: "Multispecialty, Cardiology, Orthopedics, Neurology",
    image: "https://www.manipalhospitals.com/frontend/uploads/facilities/Saltlake_2.jpg",
  },
  {
    name: "Apollo Gleneagles",
    location: "Kolkata",
    specialization: "Cardiology, Gastroenterology, Neurosurgery, Oncology",
    image: "https://content.jdmagicbox.com/comp/kolkata/s1/033pxx33.xx33.180328182335.r7s1/catalogue/apollo-gleneagles-hospital-kolkata-salt-lake-city-kolkata-multispeciality-hospitals-wf14g.jpg",
  },
  {
    name: "AIIMS Kalyani",
    location: "Kalyani, Kolkata",
    specialization: "Neurosciences, Urology, Endocrinology, Obstetrics and Gynecology",
    image: "https://aiimskalyani.edu.in/images/aiims-img.jpg",
  },
  {
    name: "AMRI Hospital",
    location: "Dhakuria, Kolkata",
    specialization: "Cardiac Surgery, Orthopedics, Plastic Surgery, Nephrology",
    image: "https://www.amrihospitals.in/images/banner/dhakuria.jpg",
  },
  {
    name: "Fortis Hospital",
    location: "Anandapur, Kolkata",
    specialization: "Cardiology, Orthopedics, Neurology, Pediatrics",
    image: "https://www.fortishealthcare.com/international/assets/images/hospital/kolkata/anandapur/Kolkata.jpg",
  },
  {
    name: "Ruby General Hospital",
    location: "Kasba, Kolkata",
    specialization: "General Surgery, Orthopedics, Urology, Neurology",
    image: "https://rubyhospital.com/wp-content/uploads/2018/07/ruby_hospital_kolkata.jpg",
  },
  {
    name: "Calcutta National Medical College and Hospital",
    location: "Kolkata",
    specialization: "General Medicine, Surgery, Pediatrics, Emergency Care",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Calcutta_National_Medical_College.jpg",
  },
  {
    name: "Manipal Hospital, Salt Lake",
    location: "Salt Lake, Kolkata",
    specialization: "Cardiology, Neurology, Orthopedics, Gastroenterology",
    image: "gg", // replace with actual image
  },
  {
    name: "Manipal Hospital, Dhakuria",
    location: "Dhakuria, Kolkata",
    specialization: "Multi-specialty, Cardiology, Neurology, Oncology",
    image: "gg", // replace with actual image
  },
  {
    name: "Fortis Hospital, Rajarhat",
    location: "Rajarhat, Kolkata",
    specialization: "Multi-specialty, Cardiology, Neurology, Surgery",
    image: "ghg", // replace with actual image
  },
  {
    name: "Woodlands Hospital",
    location: "Alambazar, Kolkata",
    specialization: "Oncology, Cardiology, Orthopedics, Pediatric Care",
    image: "j", // replace with actual image
  },
];
const Hospitals = () => {
  const [search, setSearch] = useState("");
  const [filteredHospitals, setFilteredHospitals] = useState(hospitals);

  const location = useLocation();
  const fromOPDQueue = location.state?.from === "opdqueue"; // Check if coming from OPDQueue

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilteredHospitals(
        hospitals.filter(
          (hospital) =>
            hospital.name.toLowerCase().includes(search.toLowerCase()) ||
            hospital.location.toLowerCase().includes(search.toLowerCase())
        )
      );
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <div className="hospital-wrapper">
      <input
        type="text"
        placeholder="Search by name or location..."
        className="hospital-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="hospital-container">
        {filteredHospitals.length === 0 ? (
          <p>No hospitals found</p>
        ) : (
          filteredHospitals.map((hospital, index) => {
            const destination = fromOPDQueue
              ? `/appointments/${encodeURIComponent(hospital.name)}` // Redirect to appointment page
              : `/hospitals/${encodeURIComponent(hospital.name)}`; // Default redirect to hospital details page

            return (
              <Link key={index} to={destination} className="hospital-card">
                <div
                  className="hospital-image"
                  style={{
                    backgroundImage: hospital.image
                      ? `url(${hospital.image})`
                      : "linear-gradient(to right, #e0f7fa, #e0f2f1)",
                  }}
                >
                  {!hospital.image && <div className="no-image">No Image</div>}
                </div>
                <div className="card-content">
                  <h3>{hospital.name}</h3>
                  <p className="specialization">{hospital.specialization}</p>
                  <p className="location">{hospital.location}</p>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Hospitals;