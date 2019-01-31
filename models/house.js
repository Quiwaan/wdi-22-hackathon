const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  whenBought: Date,
  whoBought: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  store: String,
});

const houseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: '' }],
  items: [itemSchema],
});

module.exports = mongoose.model('House', houseSchema);
