const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospitals'); // Corrected import path

// Route to get all hospitals
// GET /api/hospitals
router.get('/', async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to search hospitals by name or location
// GET /api/hospitals/search
router.get('/search', async (req, res) => {
  const query = req.query.q.toLowerCase();

  try {
    const filteredHospitals = await Hospital.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } }
      ]
    });
    res.json(filteredHospitals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to get a specific hospital by ID
// GET /api/hospitals/:id
router.get('/:id', async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.json(hospital);
  } catch (error) {
    console.error(error);
    // This handles cases where the ID is not in a valid format
    res.status(500).json({ message: "Error fetching hospital details" });
  }
});

module.exports = router;