import * as types from './actionTypes';

export const fetchMostPopularMovies = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_MOST_POPULAR_MOVIES,
  };
};

export const fetchActiveMovie = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_ACTIVE_MOVIE,
  };
};