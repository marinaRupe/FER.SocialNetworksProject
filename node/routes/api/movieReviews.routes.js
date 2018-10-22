const express = require('express');
const asyncWrap = require('express-async-wrap');
const MovieReviewController = require('../../controllers/movieReviews.controller');

const router = express.Router();

router.get('/', asyncWrap(MovieReviewController.getReviews));

module.exports = router;