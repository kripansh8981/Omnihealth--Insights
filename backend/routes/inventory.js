const express = require('express');
const router = express.Router();

// Mock inventory list
let inventory = [
  { item: 'Paracetamol', quantity: 100 },
  { item: 'Gloves', quantity: 200 },
];

// Get inventory
router.get('/', (req, res) => {
  res.json(inventory);
});

module.exports = router;
