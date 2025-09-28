const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospitals');
const Appointment = require('../models/Appointment');
const { authenticate, authorizeRoles } = require('../middleware/auth');

// POST /api/doctors/affiliate
// Allows a logged-in doctor to affiliate themselves with a specific hospital
router.post('/affiliate', authenticate, authorizeRoles('doctor'), async (req, res) => {
  try {
    const { hospitalId, name, specialization } = req.body;
    const doctorId = req.user._id;

    if (!hospitalId || !name || !specialization) {
      return res.status(400).json({ message: "Hospital ID, Name, and Specialization are required." });
    }

    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found." });
    }

    // Check if the doctor is already affiliated with this hospital
    const alreadyAffiliated = hospital.doctors.some(doc => doc.name === name && doc.specialization === specialization);
    
    if (alreadyAffiliated) {
      return res.status(400).json({ message: "Doctor is already affiliated with this hospital." });
    }

    // Add the doctor to the hospital's doctors array
    hospital.doctors.push({ 
        name, 
        specialization,
        // In a real application, you might use the doctor's actual database ID here
        _id: doctorId 
    });

    await hospital.save();

    res.status(200).json({ message: "Doctor successfully affiliated with hospital.", hospital });
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
      // Optionally populate the Patient model to show patient names
      // .populate('patientId', 'name email') 
      .exec();

    res.status(200).json(appointments);
  } catch (err) {
    console.error('Error fetching doctor appointments:', err);
    res.status(500).json({ message: "Server error fetching appointments." });
  }
});

module.exports = router;
