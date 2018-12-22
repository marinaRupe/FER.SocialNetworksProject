import axios from 'axios';
import history from '../../history';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';
import { API, APP } from '../../constants/routes';
import * as actions from '../actions/movieActions';

const movieActions = {
  fetchActiveMovie(movieId) {
    return async (dispatch) => {
      try {
        await dispatch(actions.fetchActiveMovie({ status: ACTION_STATUS.SUCCESS, data: movieId }));
      } catch (error) {
        if (error.status === 400) {
          history.push(APP.NOT_FOUND_ERROR);
        } else {
          history.push(APP.SERVER_ERROR);
        }
      }
    };
  },
  fetchMostPopularMovies(page = 1, pageSize = 30) {
    return async (dispatch) => {
      try {
        const resp = await axios.get(API.MOVIE.FETCH_MOST_POPUAR_MOVIES(page, pageSize));
        if (resp.status === 200) {
          await dispatch(actions.fetchMostPopularMovies({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
        }
      } catch (error) {
        if (error.status === 400) {
          history.push(APP.NOT_FOUND_ERROR);
        } else {
          history.push(APP.SERVER_ERROR);
        }
      }
    };
  },

  fetchMostRatedMovies(page = 1, pageSize = 30) {
    return async (dispatch) => {
      try {
        const resp = await axios.get(API.MOVIE.FETCH_MOST_RATED_MOVIES(page, pageSize));
        if (resp.status === 200) {
          await dispatch(actions.fetchMostRatedMovies({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
        }
      } catch (error) {
        if (error.status === 400) {
          history.push(APP.NOT_FOUND_ERROR);
        } else {
          history.push(APP.SERVER_ERROR);
        }
      }
    };
  },

  fetchNowPlayingMovies() {
    const page = 1;

    return async (dispatch) => {
      try {
        const resp = await axios.get(API.MOVIE.FETCH_MOST_RATED_MOVIES(page));
        if (resp.status === 200) {
          await dispatch(actions.fetchMostRatedMovies({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
        }
      } catch (error) {
        if (error.status === 400) {
          history.push(APP.NOT_FOUND_ERROR);
        } else {
          history.push(APP.SERVER_ERROR);
        }
      }
    };
  },

  fetchTopMovies(page = 1, pageSize = 5) {
    return async (dispatch) => {
      try {
        const resp = await axios.get(API.MOVIE.FETCH_MOST_POPUAR_MOVIES(page, pageSize));
        if (resp.status === 200) {
          await dispatch(actions.fetchTopMovies({ status: ACTION_STATUS.SUCCESS, data: resp.data })); // TODO: change
        }
      } catch (error) {
        if (error.status === 400) {
          history.push(APP.NOT_FOUND_ERROR);
        } else {
          history.push(APP.SERVER_ERROR);
        }
      }
    };
  },

  fetchRecommendedMovies(page = 1, pageSize = 5) {
    return async (dispatch) => {
      try {
        const resp = await axios.get(API.MOVIE.FETCH_MOST_RATED_MOVIES(page, pageSize)); // TODO: change
        if (resp.status === 200) {
          await dispatch(actions.fetchRecommendedMovies({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
        }
      } catch (error) {
        if (error.status === 400) {
          history.push(APP.NOT_FOUND_ERROR);
        } else {
          history.push(APP.SERVER_ERROR);
        }
      }
    };
  },
};

export default movieActions;
