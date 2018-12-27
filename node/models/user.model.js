const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const settings = require('../constants/constraints.constants');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required.'],
    match: [settings.EMAIL_REGEX, 'Email is invalid.'],
    trim: true,
  },
  userID: {
    type: String,
    required: [true, 'User ID is required.'],
  },
  token: {
    type: String,
    required: [true, 'Accedd token is required.'],
  },
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
  },
  name: {
    type: String,
    required: [true, 'Name is required.'],
  },
  picture: String,
  birthday: Date,
  ageRange: Object,
  gender: String,
  location: Object,
  likedPages: Object,
});

userSchema.methods.setPassword = function setPassword(newPassword) {
  this.password = bcrypt.hashSync(newPassword, 10);
};

userSchema.methods.validatePassword = function validatePassword(password) {
  const isPasswordCorrect = bcrypt.compareSync(password, this.password);
  return isPasswordCorrect;
};

userSchema.methods.setToken = function setToken() {
  const token = this.email + Date.now();
  this.token = bcrypt.hashSync(token, 10);
};

module.exports = mongoose.model('User', userSchema);
