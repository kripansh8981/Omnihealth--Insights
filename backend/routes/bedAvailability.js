// routes/bedAvailability.js
const express = require('express');
const router = express.Router();
const BedAvailability = require('../models/BedAvailability');

// ============================
// GET beds (with optional filters)
// ============================
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
    console.error('Error fetching bed availability:', err.message);
    res.status(500).json({ error: 'Failed to fetch bed availability' });
  }
});

// ============================
// Reserve a bed
// ============================
router.post('/reserve', async (req, res) => {
  const { hospitalName, department } = req.body;

  try {
    // Atomically decrement availableBeds if > 0
    const bed = await BedAvailability.findOneAndUpdate(
      { hospitalName, department, availableBeds: { $gt: 0 } },
      { $inc: { availableBeds: -1 } },
      { new: true }
    );

    if (!bed) {
      return res.status(400).json({
        message: 'No available beds for the given hospital and department.',
      });
    }

    res.json({
      message: 'Bed reserved successfully!',
      hospitalName: bed.hospitalName,
      department: bed.department,
      remainingBeds: bed.availableBeds,
    });
  } catch (error) {
    console.error('Error reserving bed:', error.message);
    res.status(500).json({ message: 'Error reserving the bed.' });
  }
});

module.exports = router;
