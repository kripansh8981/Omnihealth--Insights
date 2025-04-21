// models/Patient.js

const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  gender: String,
  contact: String,
  symptoms: String,
  visitDate: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Patient', patientSchema);
