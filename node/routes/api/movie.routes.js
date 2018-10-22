const express = require('express');
const asyncWrap = require('express-async-wrap');
const MovieController = require('../../controllers/movie.controller');

const router = express.Router();

router.get('/most-popular/:page', asyncWrap(MovieController.getMostPopularMovies));

module.exports = router;