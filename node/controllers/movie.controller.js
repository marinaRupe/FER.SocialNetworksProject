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

  console.log('uso u getUserWatchedMovies--------------------');
  //console.log("backend user id: " + userID);

  const movies = await UserService.getUserWatchedMovies(+page, +pageSize, userID);

  const totalPages = Math.ceil(await MovieService.getMoviesCount() / pageSize);

  const data = { page: +page, totalPages, totalResults: movies.length, results: movies };

  res.send(data);
};

const getUserSavedMovies= async (req, res) => {

  console.log('in saved..');
  const { page = 1, pageSize = defaultValues.DEFAULT_PAGE_SIZE, userID } = req.query;

  const movies = await UserService.getUserSavedMovies(+page, +pageSize, userID);
  const totalPages = Math.ceil(await MovieService.getMoviesCount() / pageSize);

  const data = { page: +page, totalPages, totalResults: movies.length, results: movies };

  res.send(data);
};

const getUserRatedMovies= async (req, res) => {
  const { page = 1, pageSize = defaultValues.DEFAULT_PAGE_SIZE, userID } = req.query;

  const movies = await UserService.getUserRatedMovies(+page, +pageSize, userID);
  const totalPages = Math.ceil(await MovieService.getMoviesCount() / pageSize);

  const data = { page: +page, totalPages, totalResults: movies.length, results: movies };

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
