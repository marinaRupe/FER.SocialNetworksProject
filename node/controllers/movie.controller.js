const errors = require('restify-errors');
const MovieService = require('../services/movie.service');
const UserService = require('../services/user.service');
const defaultValues = require('../constants/defaultValues.constants');

const getMostPopularMovies = async (req, res) => {
  const { page = 1, pageSize = defaultValues.DEFAULT_PAGE_SIZE } = req.query;

  const movies = await MovieService.getMoviesByPopularity(+page, +pageSize);
  const totalPages = Math.ceil(await MovieService.getMoviesCount() / pageSize);

  const data = { page: +page, totalPages, totalResults: movies.length, results: movies };

  res.send(data);
};

const getMostRatedMovies = async (req, res) => {
  const { page = 1, pageSize = defaultValues.DEFAULT_PAGE_SIZE } = req.query;

  const movies = await MovieService.getMoviesByImdbRating(+page, +pageSize);
  const totalPages = Math.ceil(
    await MovieService.getMoviesCount({ 'imdbRating': { '$nin': [null, 'N/A'] } }) / pageSize
  );

  const data = { page: +page, totalPages, totalResults: movies.length, results: movies };

  res.send(data);
};

const getRecommendedMovies = async (req, res) => {
  const { page = 1, pageSize = defaultValues.DEFAULT_PAGE_SIZE ,gender, age, likes} = req.query;

  const filter = MovieService.makeFilter(gender, age, likes);
  const movies = await MovieService.getMoviesByFilter(+page, +pageSize, filter);

  const totalPages = Math.ceil(
    await MovieService.getMoviesCount(filter) / pageSize
  );

  const data = { page: +page, totalPages, totalResults: movies.length, results: movies };

  res.send(data);
};

const getUserWatchedMovies= async (req, res) => {
  const { page = 1, pageSize = defaultValues.DEFAULT_PAGE_SIZE, userID } = req.query;

  const watchedMoviesIDs = await UserService.getUserWatchedMovies(+page, +pageSize, userID);
  const watchedMovies = [];

  for (let i = 0; i < watchedMoviesIDs.length; i++) {
    watchedMovies[i] = (await MovieService.getMovieWithImdbID(watchedMoviesIDs[i]));
  }

  const totalPages = Math.ceil(watchedMoviesIDs.length / pageSize);
  const data = { page: +page, totalPages, totalResults: watchedMoviesIDs.length, results: watchedMovies };

  res.send(data);
};

const getUserSavedMovies= async (req, res) => {
  const { page = 1, pageSize = defaultValues.DEFAULT_PAGE_SIZE, userID } = req.query;

  const savedMoviesIDs = await UserService.getUserSavedMovies(+page, +pageSize, userID);
  const savedMovies = [];

  for (let i = 0; i < savedMoviesIDs.length; i++) {
    savedMovies[i] = (await MovieService.getMovieWithImdbID(savedMoviesIDs[i]));
  }

  const totalPages = Math.ceil(savedMoviesIDs.length / pageSize);
  const data = { page: +page, totalPages, totalResults: savedMoviesIDs.length, results: savedMovies };

  res.send(data);
};

const getUserRatedMovies = async (req, res) => {
  const { page = 1, pageSize = defaultValues.DEFAULT_PAGE_SIZE, userID } = req.query;

  const ratedMoviesIDs = await UserService.getUserRatedMovies(+page, +pageSize, userID);
  const ratedMovies = [];

  for (let i = 0; i < ratedMoviesIDs.length; i++) {
    ratedMovies[i] = (await MovieService.getMovieWithImdbID(ratedMoviesIDs[i]));
  }

  const totalPages = Math.ceil(ratedMoviesIDs.length / pageSize);
  const data = { page: +page, totalPages, totalResults: ratedMoviesIDs.length, results: ratedMovies };

  res.send(data);
};

module.exports = {
  getMostPopularMovies,
  getMostRatedMovies,
  getRecommendedMovies,
  getUserWatchedMovies,
  getUserSavedMovies,
  getUserRatedMovies,
};
