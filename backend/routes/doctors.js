const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospitals');
const Doctor = require('../models/Doctor'); // Ensure Doctor model is imported
const Appointment = require('../models/Appointment');
const { authenticate, authorizeRoles } = require('../middleware/auth');

// POST /api/doctors/affiliate
// Allows a logged-in doctor to affiliate themselves with a specific hospital
router.post('/affiliate', authenticate, authorizeRoles('doctor'), async (req, res) => {
  try {
    const { hospitalId } = req.body;
    const doctorId = req.user._id;

    if (!hospitalId) {
      return res.status(400).json({ message: "Hospital ID is required." });
    }

    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found." });
    }
    
    // Check if already affiliated
    const alreadyAffiliated = hospital.doctors.some(docId => docId.toString() === doctorId.toString());
    if (alreadyAffiliated) {
      return res.status(400).json({ message: "Doctor is already affiliated with this hospital." });
    }

    // 1. Update Hospital: Add doctor's ID to the Hospital's doctors array
    hospital.doctors.push(doctorId);
    await hospital.save();

    // 2. Update Doctor: Add the hospital affiliation link to the Doctor's profile
    // CRITICAL FIX: Use { new: true } to return the updated document, and ensure the structure matches the model.
    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, {
        hospitalAffiliation: {
            hospitalId: hospital._id,
            hospitalName: hospital.name
        }
    }, { new: true }); // Use { new: true } to get the updated document

    if (!updatedDoctor) {
        return res.status(404).json({ message: "Doctor profile not found for update." });
    }

    res.status(200).json({ 
        message: "Doctor successfully affiliated with hospital.", 
        hospitalName: hospital.name,
        doctor: updatedDoctor // Optionally return updated doctor data
    });
  } catch (err) {
    console.error('Error during doctor affiliation:', err);
    res.status(500).json({ message: "Server error during affiliation." });
  }
});

// GET /api/doctors/appointments
// Allows a logged-in doctor to check appointments booked to them
router.get('/appointments', authenticate, authorizeRoles('doctor'), async (req, res) => {
  try {
    const doctorId = req.user._id;

    const appointments = await Appointment.find({ doctorId: doctorId })
      .sort({ appointmentDate: 1, slotTime: 1 })
      .exec();

    res.status(200).json(appointments);
  } catch (err) {
    console.error('Error fetching doctor appointments:', err);
    res.status(500).json({ message: "Server error fetching appointments." });
  }
});

module.exports = router;
