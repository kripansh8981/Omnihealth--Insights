// models/Hospital.js (Example)
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  availability: [String], // Array of available time slots
});

const bedAvailabilitySchema = new mongoose.Schema({
  type: String,  // e.g., "ICU", "General"
  availableBeds: Number,
  totalBeds: Number,
});

const hospitalSchema = new mongoose.Schema({
  name: String,
  location: String,
  specialization: [String], // Array of specializations offered
  image: String,
  doctors: [doctorSchema], // Array of doctors available in the hospital
  bedAvailability: [bedAvailabilitySchema], // Bed availability details
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;

