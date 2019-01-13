import initialState from './initialState';
import * as types from '../actionTypes';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';

export default function movieReviewReducer(state = initialState.reviews, action) {
  switch (action.type) {
  case types.FETCH_REVIEWS_FOR_MOVIE:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        activeMovieReviews: action.data,
      };
    }
    return { ...state };
  default:
    return { ...state };
  }
}
