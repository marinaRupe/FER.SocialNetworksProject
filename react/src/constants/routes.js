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
    FETCH_RECOMMENDED_MOVIES: (page, pageSize, gender, age, likes) => `${API_URL}/movie/recommended/?page=${page}&pageSize=${pageSize}&gender=${gender}&age=${age}&likes=${likes}`,
    SEARCH: (page, pageSize, parameters) => `${API_URL}/movie/search/?page=${page}&pageSize=${pageSize}${toQueryStringParameters(parameters)}`,
    GENRES: `${API_URL}/movie/genres`,
  },
  REVIEWS: {
    FETCH_REVIEWS_FOR_MOVIE: (movieTitle) => `${API_URL}/movie-review/${movieTitle}`,
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
