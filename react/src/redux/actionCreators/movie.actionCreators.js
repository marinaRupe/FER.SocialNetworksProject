import * as types from '../actionTypes';

export const fetchMostPopularMovies = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_MOST_POPULAR_MOVIES,
  };
};

export const fetchMostRatedMovies = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_MOST_RATED_MOVIES,
  };
};

export const fetchActiveMovie = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_ACTIVE_MOVIE,
  };
};

export const fetchTopMovies = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_TOP_MOVIES,
  };
};

export const fetchRecommendedMovies = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_RECOMMENDED_MOVIES,
  };
};

export const fetchUserRatedMovies = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_USER_RATED_MOVIES,
  };
};

export const fetchUserWatchedMovies = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_USER_WATCHED_MOVIES,
  };
};

export const fetchUserSavedMovies = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_USER_SAVED_MOVIES,
  };
};

export const fetchUserMovieStatus = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_USER_MOVIE_STATUS,
  };
};

export const updateUserMovieStatus = ({ status, data }) => {
  return {
    data,
    status,
    type: types.UPDATE_USER_MOVIE_STATUS,
  };
};
