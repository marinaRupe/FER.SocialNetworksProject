const axios = require('axios');

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getCurrentWeather = async (lat, lon) => {
  const response = await axios.get(WEATHER_API_URL, {
    params: {
      'lat': lat,
      'lon': lon,
      'appid': process.env.OPEN_WEATHER_API_KEY,
      'units': 'metric',
    },
  });
  return response;
};

module.exports = {
  getCurrentWeather,
};
