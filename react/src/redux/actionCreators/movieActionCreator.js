import axios from 'axios';
import history from '../../history';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';
import { API, APP } from '../../constants/routes';
import * as actions from '../actions/movieActions';

const movieActions = {
  fetchMostPopularMovies() {
    const page = 1;

    return async (dispatch) => {
      try {
        const resp = await axios.get(API.MOVIE.FETCH_MOST_POPUAR_MOVIES(page));
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
};

export default movieActions;