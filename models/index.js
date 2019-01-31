// Require mongoose node module
const mongoose = require('mongoose');

// TODO: Connect to Mongo database
const mongoURI = process.env.MONGDB_URI || 'mongodb://localhost/groceries';
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true }
);

// TODO: Require your other models, and export them

// NOTE: Your files can have multiple module.exports statements!
// Make sure to export both your Museum and Piece models!
module.exports.User = require('./model');
module.exports.Item = require('./item');
module.exports.Museum = require('./house');
module.exports.Piece = require('./piece');
