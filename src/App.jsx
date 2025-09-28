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

import Contact from "./pages/Contact";
import Hospitals from "./pages/Hospitals";
import HospitalDetails from "./pages/HospitalDetails";
import AppointmentForm from "./pages/AppointmentForm";
import AllAppointments from './pages/AllAppointments';
import BedAvailability from './pages/BedAvailability';
import Inventory from './pages/Inventory';

// Auth Pages (using the single, unified component)
import UnifiedAuth from "./pages/Auth";

// Dashboard Pages
import DoctorDashboard from "./pages/DoctorDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";

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
        <Route path="/bed-availability/:hospitalId" element={<BedAvailability />} />

        <Route path="/admission" element={<Admission />} />
        
        {/* Unified Authentication Route */}
        <Route path="/auth" element={<UnifiedAuth />} />

        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/hospital/dashboard" element={<HospitalDashboard />} />


        <Route path="/contact" element={<Contact />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/appointments" element={<AllAppointments />} />
        <Route path="/all-appointments" element={<AllAppointments />} />
        
        {/* FIX: Changed parameter name from :hospitalName to :hospitalId */}
        <Route path="/hospitals/:hospitalId" element={<HospitalDetails />} /> 
        
        <Route path="/book-appointment/:hospitalId/:doctorId" element={<AppointmentForm />} />
        
        {/* CLEANUP: Updated other routes to use :hospitalId for consistency */}
        <Route path="/appointments/:hospitalId" element={<AllAppointments />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/allappointments/:hospitalId" element={<AllAppointments />} />
        <Route path="/emergency" element={<EmergencyPage />} />
      </Routes>

      {/* Footer Component */}
      <Footer />
    </Router>
  );
}

export default App;
