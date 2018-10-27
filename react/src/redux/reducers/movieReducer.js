import initialState from './initialState';
import * as types from '../actions/actionTypes';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';

export default function movieReducer(state = initialState.movies, action) {
  switch (action.type) {
  case types.FETCH_MOST_POPULAR_MOVIES:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        list: action.data.results,
        page: action.data.page,
        totalPages: action.data.total_pages,
        totalResults: action.data.total_results,
      };
    }
    return { ...state };
  case types.FETCH_MOST_RATED_MOVIES:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        list: action.data.results,
        page: action.data.page,
        totalPages: action.data.total_pages,
        totalResults: action.data.total_results,
      };
    }
    return { ...state };
  case types.FETCH_ACTIVE_MOVIE:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        activeMovie: { ...state.list.find(m => m.imdbID.toString() === action.data) }
      };
    }
    return { ...state };
  default:
    return { ...state };
  }
}