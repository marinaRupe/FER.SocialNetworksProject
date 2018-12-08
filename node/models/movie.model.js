const mongoose = require('mongoose');

const { Schema } = mongoose;

const castSchema = new Schema({
  cast_id: {
    type: Number,
  },
  credit_id: {
    type: String,
  },
  personId: {
    type: Number,
  },
  characterName: {
    type: String,
  },
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
  order: {
    type: Number,
  },
  profileImage: {
    type: String,
  },
});

const crewSchema = new Schema({
  credit_id: {
    type: String,
  },
  personId: {
    type: Number,
  },
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  department: {
    type: String,
  },
  job: {
    type: String,
  }
});

const videoSchema = new Schema({
  name: String,
  key: String,
  url: String,  // `https://www.youtube.com/watch?v=${key}`
});

const movieSchema = new Schema({
  imdbID: {
    type: String,
    required: [true, 'IMDb ID is required.'],
    trim: true,
  },
  tmdbID: String,
  facebookID: {
    type: String,
  },
  twitterID: {
    type: String,
  },
  title: {
    type: String,
    required: [true, 'Title is required.'],
    trim: true,
  },
  alternativeTitles: {
    type: [String],
  },
  year: {
    type: Number,
    required: [true, 'Year is required.'],
  },
  releaseDate: {
    type: Date,
    required: [true, 'Release date is required.'],
  },
  plot: {
    type: String,
    required: [true, 'Plot is required.'],
  },
  genres: {
    type: [String],
    required: [true, 'Genres are required.'],
  },
  keywords: {
    type: [String],
  },

  poster: String,        // poster URL
  videos: [videoSchema], // filter Youtube videos
  website: String,

  cast: [castSchema],
  crew: [crewSchema],

  runtime: String,
  budget: Number,
  revenue: Number,
  productionCompanies: [String],
  productionCountries: [String],

  languages: [String],
  translations: [String],

  tmdbPopularity: Number,
  tmdbVoteAverage: Number,
  tmdbVoteCount: Number,

  imdbRating: String,
  metascore: String,
  rottenTomatoesRating: String,
  awards: String,

  adult: Boolean,
  rated: String, // e.g. PG
});

module.exports = mongoose.model('Movie', movieSchema);