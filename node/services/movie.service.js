const Movie = require('../models/movie.model');
const defaultValues = require('../constants/defaultValues.constants');

const existsMovieWithImdbID = async imdbID => (await Movie.countDocuments({ imdbID })) > 0;

const existsMovieWithTmdbID = async tmdbID => (await Movie.countDocuments({ tmdbID })) > 0;

const getMovieWithImdbID = async imdbID => (await Movie.findOne({ imdbID }).exec());

const getMovieWithTmdbID = async tmdbID => (await Movie.findOne({ tmdbID }).exec());

const getMoviesByPopularity = async (page, pageSize = defaultValues.DEFAULT_PAGE_SIZE) => (await Movie.find()
  .skip((page - 1) * pageSize)
  .limit(pageSize)
  .sort({ 'tmdbPopularity' : 'desc' })
  .exec()
);

const getMoviesByImdbRating = async (page, pageSize = defaultValues.DEFAULT_PAGE_SIZE) =>
  (await Movie.find({ 'imdbRating': { '$nin': [null, 'N/A'] } })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .sort({ 'imdbRating' : 'desc' })
    .exec()
  );

const getMoviesByReleaseDate = async (page, pageSize = defaultValues.DEFAULT_PAGE_SIZE) => (await Movie.find()
  .skip((page - 1) * pageSize)
  .limit(pageSize)
  .sort({ 'releaseDate' : 'desc' })
  .exec()
);

const getMoviesByFilter = async (page, pageSize = defaultValues.DEFAULT_PAGE_SIZE, filter) =>
  (await Movie.find(filter)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .sort({ 'imdbRating' : 'desc' })
    .exec()
  );

const getMoviesWithNoOmdbData = async (page, pageSize = defaultValues.DEFAULT_PAGE_SIZE) =>
  (await Movie.find({ 'awards': null })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
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

const makeFilter = (gender, age=0, likes=[]) =>{
  const filter={};
  if (gender === 'female') {
    filter['genres']= { '$in': ['romance', 'family'] };
  }else if (gender === 'male'){
    filter['genres']= { '$in': ['action', 'horror'] };
  }

  if (age >= 18) {
    filter['adult']= { '$nin': [true] };
  }

  if (likes.length > 0) {
    filter['title']=likes.split(',').map(x => new RegExp(x, 'gi'));
  }

  return filter;
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
  getMoviesByImdbRating,
  getMoviesByReleaseDate,
  getMoviesWithNoOmdbData,
  getMoviesCount,
  getMoviesByFilter,
  makeFilter,
};
