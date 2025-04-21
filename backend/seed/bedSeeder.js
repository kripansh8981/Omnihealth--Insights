// backend/seed/bedSeeder.js

const mongoose = require('mongoose');
const BedAvailability = require('../models/BedAvailability');

mongoose.connect('mongodb://127.0.0.1:27017/omnihealth')
  .then(() => {
    console.log('✅ Connected to MongoDB (omnihealth)');
    return seedBeds();
  })
  .catch(err => {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  });

const bedData = [
  { hospitalName: 'Manipal Hospital (Salt Lake)', department: 'ICU', availableBeds: 4 },
  { hospitalName: 'Manipal Hospital (Salt Lake)', department: 'General', availableBeds: 12 },
  { hospitalName: 'Apollo Gleneagles', department: 'ICU', availableBeds: 6 },
  { hospitalName: 'Apollo Gleneagles', department: 'Emergency', availableBeds: 3 },
  { hospitalName: 'AIIMS Kalyani', department: 'Pediatrics', availableBeds: 8 },
  { hospitalName: 'AIIMS Kalyani', department: 'General', availableBeds: 15 },
  { hospitalName: 'AMRI Hospital', department: 'Orthopedics', availableBeds: 7 },
  { hospitalName: 'AMRI Hospital', department: 'ICU', availableBeds: 5 },
  { hospitalName: 'Fortis Hospital', department: 'Neurology', availableBeds: 6 },
  { hospitalName: 'Fortis Hospital', department: 'ICU', availableBeds: 4 },
  { hospitalName: 'Ruby General Hospital', department: 'General', availableBeds: 10 },
  { hospitalName: 'Ruby General Hospital', department: 'Urology', availableBeds: 2 },
  { hospitalName: 'Calcutta National Medical College and Hospital', department: 'Emergency', availableBeds: 12 },
  { hospitalName: 'Calcutta National Medical College and Hospital', department: 'General', availableBeds: 18 },
  { hospitalName: 'Manipal Hospital, Salt Lake', department: 'Cardiology', availableBeds: 5 },
  { hospitalName: 'Manipal Hospital, Dhakuria', department: 'Oncology', availableBeds: 4 },
  { hospitalName: 'Manipal Hospital, Dhakuria', department: 'ICU', availableBeds: 3 },
  { hospitalName: 'Fortis Hospital, Rajarhat', department: 'Surgery', availableBeds: 6 },
  { hospitalName: 'Fortis Hospital, Rajarhat', department: 'General', availableBeds: 9 },
  { hospitalName: 'Woodlands Hospital', department: 'Cardiology', availableBeds: 5 },
  { hospitalName: 'Woodlands Hospital', department: 'Pediatric Care', availableBeds: 7 },
];

const seedBeds = async () => {
  try {
    await BedAvailability.deleteMany(); // Clear existing
    await BedAvailability.insertMany(bedData); // Seed new
    console.log('✅ Bed availability data inserted.');
  } catch (err) {
    console.error('❌ Error inserting bed availability data:', err);
  } finally {
    mongoose.connection.close(); // Ensure DB closes
  }
};

