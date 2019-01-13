const Movie = require('../models/movie.model');
const defaultValues = require('../constants/defaultValues.constants');

const existsMovieWithImdbID = async imdbID => (await Movie.countDocuments({ imdbID })) > 0;

const existsMovieWithTmdbID = async tmdbID => (await Movie.countDocuments({ tmdbID })) > 0;

const getMovieWithImdbID = async imdbID => (await Movie.findOne({ imdbID }).exec());

const getMovieWithTmdbID = async tmdbID => (await Movie.findOne({ tmdbID }).exec());

const getMoviesByPopularity = async (page, pageSize = defaultValues.DEFAULT_PAGE_SIZE, filter) => {
  if (!filter) {
    filter = {
      'tmdbPopularity': { '$nin': [null] },
    };
  }

  return (await Movie.find(filter)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .sort({ 'tmdbPopularity' : 'desc' })
    .exec()
  );
};

const getMoviesByImdbRating = async (page, pageSize = defaultValues.DEFAULT_PAGE_SIZE, filter) => {
  if (!filter) {
    filter = {
      'imdbRating': { '$nin': [null, 'N/A'] },
    };
  }

  return (await Movie.find(filter)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .sort({ 'imdbRating' : 'desc' })
    .exec()
  );
};

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
    .sort({ 'tmdbPopularity' : 'desc' })
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

const makeFilter = (gender, age=0, likes = []) =>{
  const filter = {};
  if (gender === 'female') {
    filter['genres'] = { '$in': ['romance', 'family'] };
  } else if (gender === 'male') {
    filter['genres'] = { '$in': ['action', 'horror'] };
  }

  if (age < 18 && age != 0) {
    filter['adult'] = { '$nin': [true] };
  }

  if (likes.length > 0) {
    filter['title'] = likes.split(',').map(x => new RegExp(x, 'gi'));
    const orFilter = { '$or': [
      { 'genres': filter['genres'] },
      { 'title': filter['title'] },
    ]};

    if (filter['adult']) {
      orFilter['adult'] = filter['adult'];
    }
    return {...orFilter, 'imdbRating': { '$nin': [null, 'N/A'] }};
  }

  return {...filter, 'imdbRating': { '$nin': [null, 'N/A'] }};
};

const findMovies = async (parameters, page = 1, pageSize = defaultValues.DEFAULT_PAGE_SIZE) => {
  const { text, fromDate, toDate, genres } = parameters;

  const filter = {
    $or: [
      { genres: { $regex: `^${text}`, $options: 'i' } },
      { keywords: { $regex: `^${text}`, $options: 'i' } },
      { alternativeTitles: { $regex: `^${text}`, $options: 'i' } },
      { $text: { $search: text } },
    ],
  };

  if (!!fromDate && !!toDate) {
    filter.releaseDate = { $gte: fromDate, $lte: toDate };
  } else if (fromDate) {
    filter.releaseDate = { $gte: fromDate };
  } else if (toDate) {
    filter.releaseDate = { $lte: toDate };
  }

  if (genres && genres.length > 0) {
    filter.genres = { $in: genres };
  }

  const count = await Movie.countDocuments(filter);

  const movies = await Movie
    .find(filter, { textScore: { $meta: 'textScore' } })
    .sort({ textScore: { $meta: 'textScore' }, tmdbPopularity: 'desc' })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .exec();

  return {
    pagesCount: Math.ceil(count / pageSize),
    movies,
  };
};

const getAllGenres = async () => ((await Movie.aggregate([
  { $unwind: '$genres' },
  { $group: { _id: 0, genres: { $addToSet: '$genres' } } },
]).exec())[0] || {}).genres || [];

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
  findMovies,
  getAllGenres,
};
