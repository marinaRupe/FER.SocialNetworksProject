const axios = require('axios');

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getCurrentWeather = async (location='') => {
  console.info('Fetching current weather...');
  
  const response = axios.get(WEATHER_API_URL, {
    params: {
      'lat':location.split(',')[0],
      'lon': location.split(',')[1],
      'appid': process.env.OPEN_WEATHER_API_KEY,
      'units': 'metric'
    }
  });
  return response;
};

module.exports = {
  getCurrentWeather
};
