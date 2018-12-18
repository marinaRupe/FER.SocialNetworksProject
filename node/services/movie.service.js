const Movie = require('../models/movie.model');

const existsMovieWithImdbID = async imdbID => (await Movie.countDocuments({ imdbID })) > 0;

const existsMovieWithTmdbID = async tmdbID => (await Movie.countDocuments({ tmdbID })) > 0;

const getMovieWithImdbID = async imdbID => (await Movie.findOne({ imdbID }).exec());

const getMovieWithTmdbID = async tmdbID => (await Movie.findOne({ tmdbID }).exec());

const getMoviesByPopularity = async page => (await Movie.find()
  .skip((page - 1) * 40)
  .limit(40)
  .sort({ 'tmdbPopularity' : 'desc' })
  .exec()
);

const getMoviesByReleaseDate = async page => (await Movie.find()
  .skip((page - 1) * 40)
  .limit(40)
  .sort({ 'releaseDate' : 'desc' })
  .exec()
);

const getMoviesWithNoOmdbData = async page => (await Movie.find({ 'awards': null })
  .skip((page - 1) * 40)
  .limit(40)
  .exec()
);

const getMoviesCount = async (filter = {}) => (await Movie.countDocuments(filter));

const saveMovie = async movie => {
  const newMovie = new Movie({
    ...movie,
  });

  await newMovie.save();
};

const updateMovie = async movie => {
  await Movie.findByIdAndUpdate(movie._id, { $set: movie });
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
        console.info(err.message);
      }
    } else {
      try {
        await updateMovie(movie);
        console.info(`The movie with imdb ID ${movie.imdbID} is updated (tmdbID: ${movie.tmdbID})!`);
      } catch (err) {
        console.info(`The movie with imdb ID ${movie.imdbID} is NOT updated (tmdbID: ${movie.tmdbID})!`);
        console.info(err.message);
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
  updateMovie,
  getMoviesByPopularity,
  getMoviesByReleaseDate,
  getMoviesWithNoOmdbData,
  getMoviesCount,
};