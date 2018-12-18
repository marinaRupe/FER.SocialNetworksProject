const express = require('express');
const asyncWrap = require('express-async-wrap');
const CinemaController = require('../../controllers/cinema.controller');

const router = express.Router();

router.get('/all/:location', asyncWrap(CinemaController.getCinemas));


module.exports = router;
