const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Hospital = require("../models/Hospitals");

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Helper: Generate Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: "1d" });
};

// ------------------- DOCTOR -------------------

// Doctor Signup
router.post("/doctor/signup", async (req, res) => {
  try {
    const { name, specialization, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const exists = await Doctor.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already registered" });

    // The model's pre-save hook will handle password hashing
    const doctor = new Doctor({
      name,
      specialization,
      email,
      password,
      role: "doctor"
    });
    await doctor.save();

    const token = generateToken(doctor._id, "doctor");
    res.status(201).json({
      message: "Doctor registered successfully",
      token,
      user: { id: doctor._id, name: doctor.name, email: doctor.email, role: doctor.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Doctor Login
router.post("/doctor/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = generateToken(doctor._id, "doctor");
    res.json({
      message: "Login successful",
      token,
      user: { id: doctor._id, name: doctor.name, email: doctor.email, role: doctor.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- PATIENT -------------------

// Patient Signup
router.post("/patient/signup", async (req, res) => {
  try {
    const { name, age, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const exists = await Patient.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already registered" });

    // The model's pre-save hook will handle password hashing
    const patient = new Patient({
      name,
      age,
      email,
      password,
      role: "patient"
    });
    await patient.save();

    const token = generateToken(patient._id, "patient");
    res.status(201).json({
      message: "Patient registered successfully",
      token,
      user: { id: patient._id, name: patient.name, email: patient.email, role: patient.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Patient Login
router.post("/patient/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const patient = await Patient.findOne({ email });
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = generateToken(patient._id, "patient");
    res.json({
      message: "Login successful",
      token,
      user: { id: patient._id, name: patient.name, email: patient.email, role: patient.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- HOSPITAL -------------------

// Hospital Signup
router.post("/hospital/signup", async (req, res) => {
  try {
    const { name, address, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const exists = await Hospital.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already registered" });

    // The model's pre-save hook will handle password hashing
    const hospital = new Hospital({
      name,
      address,
      email,
      password,
      role: "hospital"
    });
    await hospital.save();

    const token = generateToken(hospital._id, "hospital");
    res.status(201).json({
      message: "Hospital registered successfully",
      token,
      user: { id: hospital._id, name: hospital.name, email: hospital.email, role: hospital.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Hospital Login
router.post("/hospital/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hospital = await Hospital.findOne({ email });
    if (!hospital) return res.status(404).json({ error: "Hospital not found" });

    const isMatch = await bcrypt.compare(password, hospital.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = generateToken(hospital._id, "hospital");
    res.json({
      message: "Login successful",
      token,
      user: { id: hospital._id, name: hospital.name, email: hospital.email, role: hospital.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
