const errors = require('restify-errors');
const tmdbService = require('../services/tmdb.service');

const getMostPopularMovies = async (req, res) => {
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