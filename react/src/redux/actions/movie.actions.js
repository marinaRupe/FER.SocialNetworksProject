import axios from 'axios';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';
import { API } from '../../constants/routes';
import { actionWrapper } from '../../utils/redux.utils';
import * as actionCreators from '../actionCreators/movie.actionCreators';

export function fetchActiveMovie(movieId) {
  const action = async (dispatch) => {
    await dispatch(actionCreators.fetchActiveMovie({ status: ACTION_STATUS.SUCCESS, data: movieId }));
  };
  return actionWrapper(action);
}

export function fetchMostPopularMovies(page = 1, pageSize = 30) {
  const action = async (dispatch) => {
    const resp = await axios.get(API.MOVIE.FETCH_MOST_POPULAR_MOVIES(page, pageSize));
    if (resp.status === 200) {
      await dispatch(actionCreators.fetchMostPopularMovies({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action);
}

export function fetchMostRatedMovies(page = 1, pageSize = 30) {
  const action = async (dispatch) => {
    const resp = await axios.get(API.MOVIE.FETCH_MOST_RATED_MOVIES(page, pageSize));
    if (resp.status === 200) {
      await dispatch(actionCreators.fetchMostRatedMovies({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action);
}

export function fetchNowPlayingMovies(page = 1, pageSize = 30) {
  const action = async (dispatch) => {
    const resp = await axios.get(API.MOVIE.FETCH_MOST_RATED_MOVIES(page, pageSize));
    if (resp.status === 200) {
      await dispatch(actionCreators.fetchMostRatedMovies({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action);
}

export function fetchTopMovies(page = 1, pageSize = 5) {
  const action = async (dispatch) => {
    const resp = await axios.get(API.MOVIE.FETCH_MOST_POPULAR_MOVIES(page, pageSize));
    if (resp.status === 200) {
      await dispatch(actionCreators.fetchTopMovies({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action);
}

export function fetchRecommendedMovies(page = 1, pageSize = 5, user) {
  const action = async (dispatch) => {
    const names = [];
    user.likedPages.pages.forEach((element) => {
      names.push(element.name);
    });

    const resp = await axios.get(
      API.MOVIE.FETCH_RECOMMENDED_MOVIES(page, pageSize, user.gender, user.ageRange.min, names)); // TODO: change

    if (resp.status === 200) {
      await dispatch(actionCreators.fetchRecommendedMovies({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action);
}

export function fetchUserSavedMovies(page = 1, pageSize = 30, user) {
  const action = async (dispatch) => {
    const resp = await axios.get(API.MOVIE.FETCH_USER_SAVED_MOVIES (page, pageSize, user.userID));
    if (resp.status === 200) {
      await dispatch(actionCreators.fetchUserSavedMovies({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action);
}

export function fetchUserWatchedMovies(page = 1, pageSize = 30, user) {
  const action = async (dispatch) => {
    const resp = await axios.get(API.MOVIE.FETCH_USER_WATCHED_MOVIES(page, pageSize, user.userID));
    if (resp.status === 200) {
      await dispatch(actionCreators.fetchUserWatchedMovies({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action);
}

export function fetchUserRatedMovies(page = 1, pageSize = 30, user) {
  const action = async (dispatch) => {
    const resp = await axios.get(API.MOVIE.FETCH_USER_RATED_MOVIES(page, pageSize, user.userID));

    if (resp.status === 200) {
      await dispatch(actionCreators.fetchUserRatedMovies({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action);
}

export function addToWatchedList(userID, movieID) {
  const action = async (dispatch) => {
    const resp = await axios.post(API.MOVIE.ADD_MOVIE_TO_WATCHED_LIST(userID, movieID));

    if (resp.status === 200) {
      await dispatch(actionCreators.addMovieToWatchedList({ status: ACTION_STATUS.SUCCESS, data: { movieID } }));
    }
  };
  return actionWrapper(action);
}

export function addToSavedList(userID, movieID) {
  const action = async (dispatch) => {
    const resp = await axios.post(API.MOVIE.ADD_MOVIE_TO_SAVED_LIST(userID, movieID));

    if (resp.status === 200) {
      await dispatch(actionCreators.addMovieToSavedList({ status: ACTION_STATUS.SUCCESS, data: { movieID } }));
    }
  };
  return actionWrapper(action);
}

export function addToRatedList(userID, movieID, score) {
  const action = async (dispatch) => {
    const resp = await axios.post(API.MOVIE.ADD_MOVIE_TO_RATED_LIST(userID, movieID, score));

    if (resp.status === 200) {
      await dispatch(actionCreators.addMovieToRatedList({ status: ACTION_STATUS.SUCCESS, data: { movieID, score } }));
    }
  };
  return actionWrapper(action);
}
