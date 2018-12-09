const errors = require('restify-errors');
const tmdbService = require('../services/tmdb.service');
const MovieService = require('../services/movie.service');

const getMostPopularMovies = async (req, res) => {
  const { page } = req.params;

  const movies = await MovieService.getMoviesByPopularity(page);

  // TODO: calculate total pages, results
  const data = { page, totalPages: 1, totalResults: movies.length, results: movies };

  res.send(data);
};

const getMostRatedMovies = async (req, res) => {
  const { page } = req.params;

  const response = await tmdbService.getMostPopularMovies(page);

  if (response.status === 400) {
    throw new errors.NotFoundError('Movies not found.');
  }

  if (response.status !== 200) {
    throw new errors.BadRequestError('Bad request.');
  }

  const movies = await tmdbService.getDetailedMovies(response.data.results);

  const data = { ...response.data, results: movies };

  res.send(data);

  await tmdbService.saveMovieList(movies);
};

module.exports = {
  getMostPopularMovies,
  getMostRatedMovies,
};