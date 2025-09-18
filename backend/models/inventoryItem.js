// models/inventoryItem.js
const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String },
});

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);
module.exports = InventoryItem;

