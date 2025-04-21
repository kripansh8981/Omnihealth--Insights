const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  availability: [
    {
      date: String,  // Date for availability (e.g., "2025-04-17")
      slots: [
        {
          startTime: String,  // "9:00 AM"
          endTime: String,    // "9:15 AM"
          available: { type: Boolean, default: true },
        },
      ],
    },
  ],
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
