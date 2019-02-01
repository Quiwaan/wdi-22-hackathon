// Require mongoose node module
const mongoose = require('mongoose');

// TODO: Connect to Mongo database
const mongoURI = process.env.MONGDB_URI || 'mongodb://localhost/groceries';
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true }
);

// TODO: Require your other models, and export them

module.exports.User = require('./user');
module.exports.House = require('./house');
