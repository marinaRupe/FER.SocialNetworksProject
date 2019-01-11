const mongoose = require('mongoose');

const { Schema } = mongoose;

const personSchema = new Schema({
  personID: {
    type: Number,
    required: [true, 'Person ID is required.'],
  },
  imdbID: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'Name is required.'],
  },
  alsoKnownAs: {
    type: [String],
  },
  birthDate: {
    type: Date,
  },
  deathDate: {
    type: Date,
  },
  placeOfBirth: {
    type: String,
  },
  gender: {
    type: String,
  },
  biography: {
    type: String,
    trim: true,
  },
  profileImage: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Person', personSchema);
