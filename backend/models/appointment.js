const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  hospitalName: { type: String, required: true },
  doctorName: { type: String, required: true },
  patientName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  slot: { type: String, required: true }, // The 15-minute time slot
  token: { type: Number, required: true },
  slotTime: { type: String, required: true }, // Add this field
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;





