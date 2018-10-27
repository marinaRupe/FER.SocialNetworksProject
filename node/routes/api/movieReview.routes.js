const express = require('express');
const asyncWrap = require('express-async-wrap');
const MovieReviewController = require('../../controllers/movieReview.controller');

const router = express.Router();

router.get('/:movieTitle', asyncWrap(MovieReviewController.getReviews));

module.exports = router;