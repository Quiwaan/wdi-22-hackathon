const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 99,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength: 99,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 99,
  },
});

userSchema.set('toJSON', {
  transform: (doc, user) => {
    const userJson = {
      id: user._id,
      email: user.email,
      name: user.name,
    };
    return userJson;
  },
});

userSchema.methods.isAuthenticated = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, 12);
  next();
});

module.exports = mongoose.model('User', userSchema);
