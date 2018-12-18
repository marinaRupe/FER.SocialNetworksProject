import axios from 'axios';
import history from '../../history';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';
import { API, APP } from '../../constants/routes';
import * as actions from '../actions/cinemaActions';

const cinemaActions = {
  fetchCinemasByCenterLocation(location) {
    return async (dispatch) => {
      try {
        const resp = await axios.get(API.CINEMA.FETCH_CINEMAS_BY_CENTER_LOCATION(location));
        if (resp.status === 200) {
          await dispatch(actions.fetchCinemasByCenterLocation({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
        }
      } catch (error) {
        if (error.status === 400) {
          history.push(APP.NOT_FOUND_ERROR);
        } else {
          history.push(APP.SERVER_ERROR);
        }
      }
    };
  }
};

export default cinemaActions;
