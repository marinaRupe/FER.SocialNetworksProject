const axios = require('axios');

const MOVIE_REVIEWS_API_URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json';

const getReviews = async (movieTitle='') => {
  const response = axios.get(MOVIE_REVIEWS_API_URL, {
    params: {
      'api-key': process.env.NY_TIMES_API_KEY,
      query: `'${movieTitle}'`,
    }
  });

  return response;
};

module.exports = {
  getReviews
};