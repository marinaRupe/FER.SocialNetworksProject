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

  res.send(response.data);
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

  res.send(response.data);
};

module.exports = {
  getMostPopularMovies,
  getMostRatedMovies,
};