const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

hospitalSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

hospitalSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Hospitals', hospitalSchema);
