const errors = require('restify-errors');
const weatherService = require('../services/weather.service');
const WeatherViewModel = require('../dataTransferObjects/viewModels/weather.viewModel');

const getCurrentWeather = async (req, res) => {
  const { location } = req.params;

  const response = await weatherService.getCurrentWeather(location);

  if (response.status !== 200) {
    throw new errors.BadRequestError('Bad request.');
  }

  res.json(new WeatherViewModel(response.data));
};

module.exports = {
  getCurrentWeather
};
