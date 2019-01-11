const errors = require('restify-errors');
const nyTimesService = require('../services/nyTimes.service');
const tmdbService = require('../services/tmdb.service');

const getReviews = async (req, res) => {
  const { title, tmdbId } = req.query;

  const reviews = {
    nyTimesReviews: [],
    tmdbReviews: [],
  };

  const nyTimesResponse = await nyTimesService.getReviews(title);

  if (nyTimesResponse.status === 200) {
    reviews.nyTimesReviews = nyTimesResponse.data.results;
  }

  const tmdbIdsResponse = await tmdbService.getMovieReviews(tmdbId);

  if (tmdbIdsResponse.status === 200) {
    reviews.tmdbReviews = tmdbIdsResponse.data.results;
  }

  res.send(reviews);
};

module.exports = {
  getReviews,
};
