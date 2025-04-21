const express = require('express');
const router = express.Router();
const OPDPatient = require('../models/opdPatient'); // Import the OPDPatient model

// Route to get all OPD patients (FIFO order)
router.get('/', async (req, res) => {
  try {
    const patients = await OPDPatient.find().sort({ timeArrived: 1 }); // FIFO
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to add a new OPD patient
router.post('/', async (req, res) => {
  console.log("Incoming POST /api/opdpatients req.body:", req.body);

  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ message: 'Invalid or missing request body' });
  }

  const { name, age, symptoms } = req.body;

  if (!name || !age || !symptoms) {
    return res.status(400).json({ message: 'Please provide name, age, and symptoms' });
  }

  const newPatient = new OPDPatient({
    name,
    age,
    symptoms,
  });

  try {
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to update a patient's status
router.patch('/:id', async (req, res) => {
  try {
    const patient = await OPDPatient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    if (req.body.status) {
      patient.status = req.body.status;
    }

    const updatedPatient = await patient.save();
    res.json(updatedPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;



