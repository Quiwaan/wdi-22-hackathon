const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  item_name: { type: String, required: true },
  house: { type: mongoose.Schema.Types.ObjectId, ref: 'House' },
  who_asked: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  when_bought: { type: Date },
  who_bought: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  store: { type: string },
});

module.exports = mongoose.model('Item', itemSchema);
