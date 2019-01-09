const express = require('express');
const asyncWrap = require('express-async-wrap');
const MovieController = require('../../controllers/movie.controller');

const router = express.Router();

router.get('/most-popular', asyncWrap(MovieController.getMostPopularMovies));

router.get('/most-rated', asyncWrap(MovieController.getMostRatedMovies));

router.get('/recommended', asyncWrap(MovieController.getRecommendedMovies));

router.get('/user-watched', asyncWrap(MovieController.getUserWatchedMovies));

router.get('/user-saved', asyncWrap(MovieController.getUserSavedMovies));

router.get('/user-rated', asyncWrap(MovieController.getUserRatedMovies));

router.delete('/user-saved', asyncWrap(MovieController.deleteUserSavedMovie));

router.delete('/user-rated', asyncWrap(MovieController.deleteUserRatedMovie));

router.delete('/user-watched', asyncWrap(MovieController.deleteUserWatchedMovie));

router.post('/user-watched', asyncWrap(MovieController.addUserWatchedMovie));

router.post('/user-saved', asyncWrap(MovieController.addUserSavedMovie));

router.post('/user-rated', asyncWrap(MovieController.addUserRatedMovie));

module.exports = router;
