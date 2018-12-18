const axios = require('axios');

const CINEMAS_API_URL = 'https://places.cit.api.here.com/places/v1/discover/explore';

const getCinemas = async (location='') => {
  console.info('Fetching all cinemas...');

  const response = axios.get(CINEMAS_API_URL, {
    params: {
      'cat':'cinema',
      'at': location,
      'app_id': process.env.HERE_API_ID,
      'app_code': process.env.HERE_APP_CODE
    }
  });

  return response;
};

module.exports = {
  getCinemas
};
