import * as types from '../actionTypes';

export const fetchReviewsForMovie = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_REVIEWS_FOR_MOVIE,
  };
};
