const Movie = require('../models/movie.model');

const existsMovieWithImdbID = async imdbID => (await Movie.countDocuments({ imdbID })) > 0;

const existsMovieWithTmdbID = async tmdbID => (await Movie.countDocuments({ tmdbID })) > 0;

const getMovieWithImdbID = async imdbID => (await Movie.findOne({ imdbID }).exec());

const getMovieWithTmdbID = async tmdbID => (await Movie.findOne({ tmdbID }).exec());

const saveMovie = async movie => {
  const newMovie = new Movie({
    ...movie,
  });

  await newMovie.save();
};

const saveMovieList = async movies => {
  console.info('Saving movies...');

  for (const movie of movies) {
    if (!(await existsMovieWithImdbID(movie.imdbID))) {
      try {
        await saveMovie(movie);
        console.info(`The movie with imdb ID ${movie.imdbID} is saved (tmdbID: ${movie.tmdbID})!`);
      } catch (err) {
        console.info(`The movie with imdb ID ${movie.imdbID} is NOT saved (tmdbID: ${movie.tmdbID})!`);
        console.error(err.message);
      }
    }
  }
};

module.exports = {
  existsMovieWithImdbID,
  existsMovieWithTmdbID,
  getMovieWithImdbID,
  getMovieWithTmdbID,
  saveMovie,
  saveMovieList,
};