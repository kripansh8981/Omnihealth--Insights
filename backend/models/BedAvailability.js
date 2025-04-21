// models/BedAvailability.js
const mongoose = require("mongoose");

const bedAvailabilitySchema = new mongoose.Schema({
  hospitalName: { type: String, required: true },
  department: { type: String, required: true },
  availableBeds: { type: Number, required: true },
});

module.exports = mongoose.model("BedAvailability", bedAvailabilitySchema);
