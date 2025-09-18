const mongoose = require("mongoose");
const dotenv = require("dotenv");
const InventoryItem = require("../models/inventoryItem"); // Adjust path if needed
dotenv.config({ path: '../.env' });
console.log("🔍 MONGO_URI:", process.env.MONGO_URI);

const seedInventory = async () => {
  const inventoryItems = [
    {
      name: "Surgical Mask",
      description: "Disposable medical mask",
      quantity: 50,
      price: 10, // Price in Rs.
    },
    {
      name: "Hand Sanitizer",
      description: "Antiseptic hand wash",
      quantity: 100,
      price: 150, // Price in Rs.
    },
    {
      name: "Gloves",
      description: "Latex examination gloves",
      quantity: 75,
      price: 200, // Price in Rs.
    },
    {
      name: "Thermometer",
      description: "Digital thermometer for body temperature",
      quantity: 30,
      price: 500, // Price in Rs.
    },
    {
      name: "Stethoscope",
      description: "High-quality stethoscope for auscultation",
      quantity: 20,
      price: 1200, // Price in Rs.
    },
    {
      name: "Bandages",
      description: "Sterile medical bandages",
      quantity: 120,
      price: 50, // Price in Rs.
    },
    {
      name: "Antibiotics",
      description: "Antibiotic tablets for infection control",
      quantity: 200,
      price: 400, // Price in Rs.
    },
    {
      name: "Syringe",
      description: "Disposable syringes of various sizes",
      quantity: 150,
      price: 20, // Price in Rs.
    },
    {
      name: "Oxygen Mask",
      description: "Oxygen mask for respiratory patients",
      quantity: 30,
      price: 350, // Price in Rs.
    },
    {
      name: "Blood Pressure Monitor",
      description: "Digital blood pressure monitor",
      quantity: 10,
      price: 2500, // Price in Rs.
    },
  ];

  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to database");

    // Clear existing inventory
    await InventoryItem.deleteMany({});

    // Insert new sample items
    await InventoryItem.insertMany(inventoryItems);

    console.log("Inventory seeded successfully");
    mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding inventory:", err);
    mongoose.disconnect();
  }
};

// Run the seeding function
seedInventory();
