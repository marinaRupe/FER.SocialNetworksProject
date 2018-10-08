const mongoose = require('mongoose');

const { Schema } = mongoose;

const movieSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required.'],
    trim: true,
  },
  producer: String,
  actors: [String],
  genre: [String]
});

module.exports = mongoose.model('Movie', movieSchema);