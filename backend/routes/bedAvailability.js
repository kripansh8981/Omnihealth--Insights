// routes/bedAvailability.js
const express = require('express');
const router = express.Router();
const BedAvailability = require('../models/BedAvailability');

// GET beds with optional filtering by hospitalName and department
router.get('/', async (req, res) => {
  try {
    const { hospitalName, department } = req.query;
    console.log('Filters:', { hospitalName, department }); // DEBUG LOG

    const query = {};
    if (hospitalName) {
      query.hospitalName = { $regex: hospitalName, $options: 'i' };
    }
    if (department) {
      query.department = { $regex: department, $options: 'i' };
    }

    const beds = await BedAvailability.find(query);
    res.json(beds);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bed availability' });
  }
});
router.post('/reserve', async (req, res) => {
  const { hospitalName, department } = req.body;

  try {
    // Find the bed availability by hospital and department
    const bed = await BedAvailability.findOne({ hospitalName, department });

    if (!bed) {
      return res.status(404).json({ message: 'Bed data not found for the given hospital and department.' });
    }

    if (bed.availableBeds <= 0) {
      return res.status(400).json({ message: 'No available beds for reservation.' });
    }

    // Update available beds
    bed.availableBeds -= 1;
    await bed.save();

    res.json({ message: 'Bed reserved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error reserving the bed.' });
  }
});

module.exports = router;


