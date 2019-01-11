/* eslint-disable max-len */
const API_VERSION = 'v1.0';

export const API_URL = `/api/${API_VERSION}`;

export const API = {
  AUTH: {
    LOGIN: `${API_URL}/user/login`,
    REGISTER: `${API_URL}/user/register`,
    CHANGE_PASSWORD: `${API_URL}/user/changePassword`,
  },
  MOVIE: {
    FETCH_MOST_POPULAR_MOVIES: (page, pageSize) => `${API_URL}/movie/most-popular/?page=${page}&pageSize=${pageSize}`,
    FETCH_MOST_RATED_MOVIES: (page, pageSize) => `${API_URL}/movie/most-rated/?page=${page}&pageSize=${pageSize}`,

    SEARCH: (page, pageSize, parameters) =>
      `${API_URL}/movie/search/?page=${page}&pageSize=${pageSize}${toQueryStringParameters(parameters)}`,

    GENRES: `${API_URL}/movie/genres`,

    FETCH_RECOMMENDED_MOVIES: (page, pageSize, gender, age, likes) =>
      `${API_URL}/movie/recommended/?page=${page}&pageSize=${pageSize}&gender=${gender}&age=${age}&likes=${likes}`,
    FETCH_USER_WATCHED_MOVIES: (page, pageSize, userID) =>
      `${API_URL}/movie/user-watched/?page=${page}&pageSize=${pageSize}&userID=${userID}`,
    FETCH_USER_RATED_MOVIES: (page, pageSize, userID) =>
      `${API_URL}/movie/user-rated/?page=${page}&pageSize=${pageSize}&userID=${userID}`,
    FETCH_USER_SAVED_MOVIES: (page, pageSize, userID) =>
      `${API_URL}/movie/user-saved/?page=${page}&pageSize=${pageSize}&userID=${userID}`,

    ADD_TO_WATCHED_LIST: (userID, movieID) =>
      `${API_URL}/movie/user-watched/?userID=${userID}&movieID=${movieID}`,
    ADD_TO_SAVED_LIST: (userID, movieID) =>
      `${API_URL}/movie/user-saved/?userID=${userID}&movieID=${movieID}`,
    ADD_TO_RATED_LIST: (userID, movieID, score) =>
      `${API_URL}/movie/user-rated/?userID=${userID}&movieID=${movieID}&score=${score}`,
    REMOVE_FROM_WATCHED_LIST: (userID, movieID) =>
      `${API_URL}/movie/user-watched/?userID=${userID}&movieID=${movieID}`,
    REMOVE_FROM_SAVED_LIST: (userID, movieID) =>
      `${API_URL}/movie/user-saved/?userID=${userID}&movieID=${movieID}`,
    REMOVE_FROM_RATED_LIST: (userID, movieID, score) =>
      `${API_URL}/movie/user-rated/?userID=${userID}&movieID=${movieID}&score=${score}`,

    FETCH_MOVIE_DETAILS: (movieID) => `${API_URL}/movie/${movieID}`,
  },
  USER: {
    FETCH_USER_MOVIE_STATUS: (userID, movieID) =>
      `${API_URL}/user/${userID}/movie/${movieID}`,
  },
  REVIEWS: {
    FETCH_REVIEWS_FOR_MOVIE: (movieTitle, tmdbId) => `${API_URL}/movie-review/?title=${movieTitle}&tmdbId=${tmdbId}`,
  },
  CINEMA: {
    FETCH_CINEMAS_BY_CENTER_LOCATION: (location) => `${API_URL}/cinema/all/${location}`,
  },
  WEATHER: {
    FETCH_WEATHER_BY_LOCATION: (location) => `${API_URL}/weather/${location}`,
  },
  LOCATION: {
    FIND: (query = '') => `${API_URL}/location/find?q=${encodeURIComponent(query)}`,
  },
  APP:{
    FETCH_APP_INFO: `${API_URL}/app/info`,
  },
};

export const APP = {
  ROOT: '/',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  PRIVACY_POLICY: '/privacy-policy',
  CONTACT_US: '/contact-us',
  MOVIE: {
    DETAILS: (movieId = ':movieId') => `/movie/${movieId}/details`,
    POPULAR_MOVIES: '/movies/most-popular',
    MOST_RATED_MOVIES: '/movies/most-rated',
    NOW_PLAYING_MOVIES: '/movies/now-playing',
    SEARCH: '/movies/search',
    PERSONAL: {
      USER_RATED_MOVIES: '/movies/rated',
      USER_WATCHED_MOVIES: '/movies/watched',
      USER_SAVED_MOVIES: '/movies/saved',
      RECOMMENDED_MOVIES: '/movies/recommended',
    },
  },
  PROFILE: '/profile',
  SERVER_ERROR: '/error/500',
  NOT_FOUND_ERROR: '/error/404',
};

const toQueryStringParameters = dict =>
  Object.keys(dict).reduce((str, key) => `${str}&${key}=${encodeURIComponent(JSON.stringify(dict[key] || null))}`, '');
