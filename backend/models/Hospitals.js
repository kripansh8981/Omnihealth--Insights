const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const doctorSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  specialization: { type: String },
  // Optional: you can add real-time availability here
  // e.g., availability: [{ date: String, timeSlot: String }]
});

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, default: 'hospital' },
  // New fields for additional functionality
  phone: { type: String },
  website: { type: String },
  doctors: [doctorSchema],
  bedStatus: {
    totalBeds: { type: Number, default: 0 },
    availableBeds: { type: Number, default: 0 },
    occupiedBeds: { type: Number, default: 0 },
  },
}, { timestamps: true });

// Hash password before saving
hospitalSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Hospital', hospitalSchema);
