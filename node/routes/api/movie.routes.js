const express = require('express');
const asyncWrap = require('express-async-wrap');
const MovieController = require('../../controllers/movie.controller');

const router = express.Router();

router.get('/most-popular', asyncWrap(MovieController.getMostPopularMovies));

router.get('/most-rated', asyncWrap(MovieController.getMostRatedMovies));

router.get('/recommended', asyncWrap(MovieController.getRecommendedMovies));

router.get('/search', asyncWrap(MovieController.getMoviesForSearch));

router.get('/genres', asyncWrap(MovieController.getAllGenres));

module.exports = router;
