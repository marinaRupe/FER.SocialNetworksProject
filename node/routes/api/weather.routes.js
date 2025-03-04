const express = require('express');
const asyncWrap = require('express-async-wrap');
const WeatherController = require('../../controllers/weather.controller');

const router = express.Router();

router.get('/:location', asyncWrap(WeatherController.getCurrentWeather));


module.exports = router;
