const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/omnihealth';
mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.log('❌ MongoDB connection error:', err));

const { authenticate, authorizeRoles } = require('./middleware/auth');

app.get('/api/protected/profile', authenticate, (req, res) => {
  res.json({ message: 'You are authenticated', user: req.user });
});

const opdPatientsRoute = require('./routes/opdPatients');
const contactRoute = require('./routes/contact');
const hospitalsRoute = require('./routes/hospitals');
const appointmentRoutes = require('./routes/appointment');
const bedAvailabilityRoutes = require('./routes/bedAvailability');
const inventoryRoutes = require('./routes/inventory');
const authRoutes = require('./routes/auth');

// Removed the import for the non-existent doctors.js file
// const doctorsRoute = require('./routes/doctors');

app.use('/api/opdpatients', opdPatientsRoute);
app.use('/api/contact', contactRoute);
app.use('/api/hospitals', hospitalsRoute);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/bed-availability', bedAvailabilityRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/auth', authRoutes);

// Removed the use statement for the non-existent doctors route
// app.use('/api/doctors', doctorsRoute);

app.get('/', (req, res) => {
  res.send('Welcome to OmniHealth Insights API 🚑');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
