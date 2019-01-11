import initialState from './initialState';
import * as types from '../actionTypes';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';

export default function movieReducer(state = initialState.movies, action) {
  switch (action.type) {
  case types.FETCH_MOST_POPULAR_MOVIES:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        list: action.data.results,
        page: action.data.page,
        totalPages: action.data.totalPages,
        totalResults: action.data.totalResults,
      };
    }
    return { ...state };
  case types.FETCH_MOST_RATED_MOVIES: // FIXME: either use the route above or save the state somewhere else
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        list: action.data.results,
        page: action.data.page,
        totalPages: action.data.totalPages,
        totalResults: action.data.totalResults,
      };
    }
    return { ...state };
  case types.FETCH_TOP_MOVIES:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        topMovies: {
          list: action.data.results,
          page: action.data.page,
          totalPages: action.data.totalPages,
          totalResults: action.data.totalResults,
        },
      };
    }
    return { ...state };
  case types.FETCH_RECOMMENDED_MOVIES:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        recommendedMovies: {
          list: action.data.results,
          page: action.data.page,
          totalPages: action.data.totalPages,
          totalResults: action.data.totalResults,
        },
      };
    }
    return { ...state };
  case types.SEARCH_MOVIES:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        foundMovies: {
          list: action.data.results,
          page: action.data.page,
          totalPages: action.data.totalPages,
          totalResults: action.data.totalResults,
        },
      };
    }
    return { ...state };
  case types.GET_GENRES:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        genres: action.data,
      };
    }
    return { ...state };
  case types.FETCH_ACTIVE_MOVIE:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        activeMovie: { ...action.data },
      };
    }
    return { ...state };
  case types.FETCH_USER_SAVED_MOVIES:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        list: action.data.results,
        page: action.data.page,
        totalPages: action.data.totalPages,
        totalResults: action.data.totalResults,
      };
    }
    return { ...state };
  case types.FETCH_USER_WATCHED_MOVIES:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        list: action.data.results,
        page: action.data.page,
        totalPages: action.data.totalPages,
        totalResults: action.data.totalResults,
      };
    }
    return { ...state };
  case types.FETCH_USER_RATED_MOVIES:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        list: action.data.results,
        page: action.data.page,
        totalPages: action.data.totalPages,
        totalResults: action.data.totalResults,
      };
    }
    return { ...state };
  case types.FETCH_USER_MOVIE_STATUS:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        activeMovieStatus: { ...action.data },
      };
    }
    return { ...state };
  case types.UPDATE_USER_MOVIE_STATUS:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        activeMovieStatus: { ...state.activeMovieStatus, ...action.data },
      };
    }
    return { ...state };
  default:
    return { ...state };
  }
}
