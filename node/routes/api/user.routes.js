const express = require('express');
const asyncWrap = require('express-async-wrap');
const UserController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/login', asyncWrap(UserController.loginWithFacebook));

router.get('/:userID/movie/:movieID', asyncWrap(UserController.getMovieStatus));

router.post('/:userID/preferred_genres/:genres', asyncWrap(UserController.addPreferredGenres));

router.get('/:userID/preferred_genres', asyncWrap(UserController.getPreferredGenres));

module.exports = router;
