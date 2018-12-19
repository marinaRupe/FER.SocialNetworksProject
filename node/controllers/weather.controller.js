const errors = require('restify-errors');
const weatherService = require('../services/weather.service');

const getCurrentWeather = async (req, res) => {
  const { location } = req.params;

  const response = await weatherService.getCurrentWeather(location);

  if (response.status !== 200) {
    throw new errors.BadRequestError('Bad request.');
  }

  res.send(response.data.results);
};

module.exports = {
  getCurrentWeather
};
