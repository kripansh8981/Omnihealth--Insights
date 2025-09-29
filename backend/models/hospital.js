const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Doctor sub-schema removed, as we will use references (ObjectIds)
// const doctorSchema = new mongoose.Schema({ ... }); 

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, default: 'hospital' },
  phone: { type: String },
  website: { type: String },
  image: { type: String },
  
  // CRITICAL FIX: Store references (ObjectIds) to the Doctor collection
  doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }], 

}, { timestamps: true });

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

hospitalSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Hospital', hospitalSchema);
