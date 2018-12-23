const errors = require('restify-errors');
const MovieService = require('../services/movie.service');
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

module.exports = {
  getMostPopularMovies,
  getMostRatedMovies,
};
