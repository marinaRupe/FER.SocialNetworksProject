const axios = require('axios');

const RECOMMENDED_MOVIES_URL = ytsID => `https://yts.am/api/v2/movie_suggestions.json?movie_id=${ytsID}`;
const YTS_ID_FROM_IMDB_ID = imdbID => `https://yts.am/api/v2/list_movies.json?query_term=${imdbID}`;

const getRecommendedMoviesForMovie = async ytsID => {
  const response = axios.get(`${RECOMMENDED_MOVIES_URL(ytsID)}`);

  return response;
};

const getYtsIdFromImdbId = async imdbID => {
  const response = axios.get(`${YTS_ID_FROM_IMDB_ID(imdbID)}`);

  return response;
};

const getRecommendedMoviesForMovieImdbIDsList = async movieImdbIDsList => {
  const recommendedMovies = [];

  for (const imdbID of movieImdbIDsList) {
    const response = await getYtsIdFromImdbId(imdbID);

    if (response.status !== 200 || !response.data.data.movies || response.data.data.movies.length === 0) {
      continue;
    }

    const ytsID = response.data.data.movies[0].id;
    const recommendedMoviesResponse = await getRecommendedMoviesForMovie(ytsID);

    if (recommendedMoviesResponse.status !== 200
      || !recommendedMoviesResponse.data.data.movies
      || recommendedMoviesResponse.data.data.movies.length === 0) {
      continue;
    }

    recommendedMovies.push.apply(recommendedMovies, recommendedMoviesResponse.data.data.movies);
  }

  return recommendedMovies;
};

module.exports = {
  getRecommendedMoviesForMovie,
  getYtsIdFromImdbId,
  getRecommendedMoviesForMovieImdbIDsList,
};
