import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Importing Pages
import Home from "./pages/Home";
import Modules from "./pages/Modules";
import OPDQueue from "./pages/OPDQueue";

import Admission from "./pages/Admission";
import Inventory from "./pages/Inventory";
import Contact from "./pages/Contact";
import Hospitals from "./pages/Hospitals"; // Add this import
import HospitalDetails from "./pages/HospitalDetails"; // Import the HospitalDetails page
import AppointmentForm from "./pages/AppointmentForm"; // Corrected import for AppointmentForm
import AllAppointments from './pages/AllAppointments';
import BedAvailability from './pages/BedAvailability';


import EmergencyPage from "./pages/EmergencyPage"; // Import EmergencyPage
function App() {
  return (
    <Router>
      {/* Navbar Component */}
      <Navbar />

      {/* Main Content Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/opdqueue" element={<OPDQueue />} />
        <Route path="/bed-availability" element={<BedAvailability />} />

        <Route path="/admission" element={<Admission />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/appointments" element={<AllAppointments />} />
        <Route path="/all-appointments" element={<AllAppointments />} />
        <Route path="/hospitals/:hospitalName" element={<HospitalDetails />} /> {/* Hospital Details Page */}
        <Route path="/appointment" element={<AppointmentForm />} /> {/* Appointment Page */}
        <Route path="/appointments/:hospitalName" element={<AllAppointments />} />
        <Route path="/allappointments/:hospitalName" element={<AllAppointments />} />
        <Route path="/emergency" element={<EmergencyPage />} />



      </Routes>

      {/* Footer Component */}
      <Footer />
    </Router>
  );
}

export default App;




