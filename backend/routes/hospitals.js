const express = require('express');
const router = express.Router();
const Hospital = require('../models/hospital'); // Import the Hospital model

// Route to get all hospitals
router.get('/', async (req, res) => {
  try {
    const hospitals = await Hospital.find(); // Fetch all hospitals from MongoDB
    res.json(hospitals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to search hospitals by name or location
router.get('/search', async (req, res) => {
  const query = req.query.q.toLowerCase();

  try {
    const filteredHospitals = await Hospital.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // Case-insensitive regex search
        { location: { $regex: query, $options: "i" } }
      ]
    });
    res.json(filteredHospitals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to get a specific hospital by name (for hospital details page)
// routes/hospitals.js

router.get('/:hospitalName', async (req, res) => {
  const { hospitalName } = req.params;
  try {
    const hospital = await Hospital.findOne({ name: hospitalName });
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.json(hospital);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching hospital details" });
  }
});


module.exports = router;


