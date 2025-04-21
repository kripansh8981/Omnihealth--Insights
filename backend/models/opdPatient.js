// backend/models/opdPatient.js

const mongoose = require('mongoose');

// Define the schema for OPD patients
const opdPatientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    symptoms: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Waiting', 'In Progress', 'Completed'],
      default: 'Waiting',
    },
    timeArrived: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create the model from the schema
// The third parameter ensures Mongoose uses the exact collection name "OPDPatient"
const OPDPatient = mongoose.model('OPDPatient', opdPatientSchema, 'OPDPatient');

module.exports = OPDPatient;


