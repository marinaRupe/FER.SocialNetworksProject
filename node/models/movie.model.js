const mongoose = require('mongoose');

const { Schema } = mongoose;

const movieSchema = new Schema({
  imdbID: {
    type: String,
    required: [true, 'IMDb ID is required.'],
    trim: true,
  },
  tmdbID: String,
  title: {
    type: String,
    required: [true, 'Title is required.'],
    trim: true,
  },
  released: {
    type: Date,
    required: [true, 'Release date is required.'],
  },
  plot: {
    type: String,
    required: [true, 'Plot is required.'],
  },
  genre: {
    type: [String],
    required: [true, 'Genre is required.'],
  },
  actors: [String],
  poster: String,
  director: String,
  runtime: String,
  languages: [String],
  website: String,
});

module.exports = mongoose.model('Movie', movieSchema);