const axios = require('axios');

const MOVIE_API_URL = 'https://api.themoviedb.org/3';
const DISCOVER_MOVIE_URL = '/discover/movie/';

const getMostPopularMovies = async (page = 1) => {
  const response = axios.get(`${MOVIE_API_URL}${DISCOVER_MOVIE_URL}`, {
    params: {
      'api_key': process.env.TMDB_API_KEY,
      'sort_by': 'popularity.desc',
      page
    }
  });

  return response;
};

module.exports = {
  getMostPopularMovies
};