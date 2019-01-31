const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  items: { type: [mongoose.Schema.Types.ObjectId], ref: 'Item' },
  date: Date,
  who: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  price: number,
});

module.exports = mongoose.model('House', houseSchema);
