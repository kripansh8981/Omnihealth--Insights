// routes/inventory.js
const express = require('express');
const InventoryItem = require('../models/inventoryItem'); // Ensure correct path
const router = express.Router();

// Your routes to handle inventory operations
router.get("/", async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post('/', async (req, res) => {
  try {
    const newItem = new InventoryItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await InventoryItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).send(err);
  }
});


module.exports = router;



