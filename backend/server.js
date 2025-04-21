// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize the app and configure dotenv
const app = express();  // Initialize express app
dotenv.config();  // Load environment variables from .env file

// Middleware setup
app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json());  // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true }));  // Parse incoming URL-encoded data

// Port setup
const PORT = process.env.PORT || 5000;

// MongoDB Connection using environment variable (IPv4 fallback)
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/omnihealth';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Import Routes (Ensure these paths are correct)
const opdPatientsRoute = require('./routes/opdPatients');

 
const inventoryRoute = require('./routes/inventory');
const contactRoute = require('./routes/contact');
const hospitalsRoute = require('./routes/hospitals'); // Import the hospitals route
// server.js
const appointmentRoutes = require('./routes/appointment');

const bedAvailabilityRoutes = require('./routes/bedAvailability');
app.use('/api/bed-availability', bedAvailabilityRoutes);


// Use Routes
app.use('/api/opdpatients', opdPatientsRoute);

// app.use('/api/admission', admissionRoute);
app.use('/api/inventory', inventoryRoute);
app.use('/api/contact', contactRoute);
app.use('/api/hospitals', hospitalsRoute);  // Add the hospitals route
 // Make sure the path is correct
 app.use('/api/appointment', appointmentRoutes);

// Root Route (Optional)
app.get('/', (req, res) => {
  res.send('Welcome to OmniHealth Insights API');
});

// Error Handling Middleware (Optional but recommended for production)
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log error details to the console
  res.status(500).json({ message: 'Internal Server Error' });  // Send a generic error message
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




