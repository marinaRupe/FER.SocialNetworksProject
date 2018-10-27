const API_VERSION = 'v1.0';

export const API_URL = `/api/${API_VERSION}`;

export const API = {
  AUTH: {
    LOGIN: `${API_URL}/user/login`,
    REGISTER: `${API_URL}/user/register`,
    CHANGE_PASSWORD: `${API_URL}/user/changePassword`,
  },
  TEST: {
    TEXT: `${API_URL}/test/text`,
  },
  MOVIE: {
    FETCH_MOST_POPUAR_MOVIES: (page) => `${API_URL}/movie/most-popular/${page}`,
    FETCH_MOST_RATED_MOVIES: (page) => `${API_URL}/movie/most-rated/${page}`,
  },
  REVIEWS: {
    MOVIE: {
      FETCH_REVIEWS_FOR_MOVIE: (movieTitle) => `${API_URL}/movie-review/${movieTitle}`
    }
  },
};

export const APP = {
  ROOT: '/',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  MOVIE: {
    DETAILS: (movieId = ':movieId') => `/movie/${movieId}/details`,
    POPULAR_MOVIES: '/movies/most-popular',
    MOST_RATED_MOVIES: '/movies/most-rated',
  },
  PROFILE: '/profile',
  SERVER_ERROR: '/error/500',
  NOT_FOUND_ERROR: '/error/404',
};