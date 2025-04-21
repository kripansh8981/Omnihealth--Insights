const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Hospital = require("../models/hospital");
dotenv.config({ path: '../.env' });

console.log("🔍 MONGO_URI:", process.env.MONGO_URI);


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const hospitals = [
  {
    name: "AIIMS Kalyani",
    location: "Kalyani, Kolkata",
    specialization: ["Neurosciences", "Urology", "Endocrinology", "Obstetrics and Gynecology"],
    image: "https://aiimskalyani.edu.in/images/aiims-img.jpg",
    doctors: [
      {
        name: "Dr. A Roy",
        specialization: "Neurosurgeon",
        availability: ["9:00 AM - 12:00 PM", "1:00 PM - 4:00 PM"],
      },
      {
        name: "Dr. Mita Ghosh",
        specialization: "Gynecologist",
        availability: ["10:00 AM - 1:00 PM", "3:00 PM - 6:00 PM"],
      },
    ],
    bedAvailability: [
      { type: "ICU", availableBeds: 10, totalBeds: 15 },
      { type: "General", availableBeds: 30, totalBeds: 40 },
    ],
  },
  {
    name: "Ruby General Hospital",
    location: "Kasba, Kolkata",
    specialization: ["General Surgery", "Orthopedics", "Urology", "Neurology"],
    image: "https://rubyhospital.com/wp-content/uploads/2018/07/ruby_hospital_kolkata.jpg",
    doctors: [
      {
        name: "Dr. S Banerjee",
        specialization: "General Surgeon",
        availability: ["8:00 AM - 11:00 AM", "2:00 PM - 5:00 PM"],
      },
      {
        name: "Dr. Neel Ahuja",
        specialization: "Neurologist",
        availability: ["9:00 AM - 12:00 PM", "3:00 PM - 6:00 PM"],
      },
    ],
    bedAvailability: [
      { type: "ICU", availableBeds: 6, totalBeds: 10 },
      { type: "General", availableBeds: 20, totalBeds: 25 },
    ],
  },
  {
    name: "Calcutta National Medical College and Hospital",
    location: "Kolkata",
    specialization: ["General Medicine", "Surgery", "Pediatrics", "Emergency Care"],
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Calcutta_National_Medical_College.jpg",
    doctors: [
      {
        name: "Dr. I Chatterjee",
        specialization: "General Physician",
        availability: ["10:00 AM - 1:00 PM", "2:00 PM - 5:00 PM"],
      },
      {
        name: "Dr. R Bose",
        specialization: "Pediatrician",
        availability: ["9:00 AM - 11:00 AM", "1:00 PM - 4:00 PM"],
      },
    ],
    bedAvailability: [
      { type: "ICU", availableBeds: 7, totalBeds: 12 },
      { type: "General", availableBeds: 15, totalBeds: 20 },
    ],
  },
  {
    name: "Manipal Hospital, Dhakuria",
    location: "Dhakuria, Kolkata",
    specialization: ["Multi-specialty", "Cardiology", "Neurology", "Oncology"],
    image: "https://www.manipalhospitals.com/frontend/uploads/facilities/Saltlake_2.jpg", // Replace with unique image if available
    doctors: [
      {
        name: "Dr. T Saha",
        specialization: "Cardiologist",
        availability: ["9:00 AM - 11:00 AM", "1:00 PM - 4:00 PM"],
      },
      {
        name: "Dr. A Mehra",
        specialization: "Oncologist",
        availability: ["10:00 AM - 12:00 PM", "3:00 PM - 5:00 PM"],
      },
    ],
    bedAvailability: [
      { type: "ICU", availableBeds: 4, totalBeds: 8 },
      { type: "General", availableBeds: 12, totalBeds: 18 },
    ],
  },
  {
    name: "Fortis Hospital, Rajarhat",
    location: "Rajarhat, Kolkata",
    specialization: ["Multi-specialty", "Cardiology", "Neurology", "Surgery"],
    image: "https://www.fortishealthcare.com/international/assets/images/hospital/kolkata/anandapur/Kolkata.jpg", // Replace with unique Rajarhat image if available
    doctors: [
      {
        name: "Dr. R Chowdhury",
        specialization: "Neurologist",
        availability: ["8:30 AM - 11:30 AM", "1:30 PM - 4:30 PM"],
      },
      {
        name: "Dr. Sinha Das",
        specialization: "Surgeon",
        availability: ["10:00 AM - 1:00 PM", "2:00 PM - 5:00 PM"],
      },
    ],
    bedAvailability: [
      { type: "ICU", availableBeds: 6, totalBeds: 10 },
      { type: "General", availableBeds: 18, totalBeds: 25 },
    ],
  },
  {
    name: "Woodlands Hospital",
    location: "Alambazar, Kolkata",
    specialization: ["Oncology", "Cardiology", "Orthopedics", "Pediatric Care"],
    image: "https://www.woodlandshospital.in/images/about.jpg", // Replace with correct image if needed
    doctors: [
      {
        name: "Dr. Alok Sen",
        specialization: "Oncologist",
        availability: ["9:00 AM - 11:00 AM", "12:00 PM - 3:00 PM"],
      },
      {
        name: "Dr. Kavita Paul",
        specialization: "Orthopedic Surgeon",
        availability: ["8:00 AM - 10:00 AM", "1:00 PM - 4:00 PM"],
      },
    ],
    bedAvailability: [
      { type: "ICU", availableBeds: 5, totalBeds: 9 },
      { type: "General", availableBeds: 15, totalBeds: 20 },
    ],
  },
];

async function insertHospitals() {
  try {
    for (const hospital of hospitals) {
      const exists = await Hospital.findOne({ name: hospital.name });
      if (!exists) {
        await Hospital.create(hospital);
        console.log(`✅ Inserted: ${hospital.name}`);
      } else {
        console.log(`⚠️ Already exists: ${hospital.name}`);
      }
    }
    console.log("✅ Seeding complete.");
    process.exit();
  } catch (err) {
    console.error("❌ Error inserting data:", err);
    process.exit(1);
  }
}

insertHospitals();

