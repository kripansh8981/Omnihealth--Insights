const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospitals');
const { authenticate, authorizeRoles } = require('../middleware/auth');
const mongoose = require('mongoose');

// GET /api/hospitals
// Route to get a list of all hospitals
router.get('/', async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/hospitals/:id
// Route to get a single hospital by its unique ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // CRITICAL FIX: Check if the ID format is potentially invalid BEFORE querying Mongoose
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Hospital not found (Invalid ID format)' });
    }

    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.json(hospital);
  } catch (error) {
    console.error("Error fetching hospital details:", error);
    // If a different server error occurs, handle it gracefully
    res.status(500).json({ message: "Error fetching hospital details" });
  }
});

// PUT /api/hospitals/:id
// Route to update a hospital's main profile (e.g., name, address, image)
router.put('/:id', authenticate, authorizeRoles('hospital'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, phone, website, image } = req.body;

    if (req.user.id !== id) {
      return res.status(403).json({ message: 'Unauthorized access.' });
    }

    const updatedHospital = await Hospital.findByIdAndUpdate(
      id,
      { name, address, phone, website, image },
      { new: true, runValidators: true }
    );

    if (!updatedHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    
    res.json({ message: 'Hospital profile updated successfully', hospital: updatedHospital });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/hospitals/:id/doctors
// Route to add a new doctor to a hospital's profile
router.put('/:id/doctors', authenticate, authorizeRoles('hospital'), async (req, res) => {
  try {
    const { id } = req.params;
    const { doctors } = req.body;

    if (req.user.id !== id) {
      return res.status(403).json({ message: 'Unauthorized access.' });
    }

    const updatedHospital = await Hospital.findByIdAndUpdate(
      id,
      { doctors },
      { new: true, runValidators: true }
    );

    if (!updatedHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    res.json({ message: 'Doctor added successfully', hospital: updatedHospital });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
