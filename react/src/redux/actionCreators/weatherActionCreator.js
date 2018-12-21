import axios from 'axios';
import history from '../../history';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';
import { API, APP } from '../../constants/routes';
import * as actions from '../actions/weatherActions';

const weatherActions = {
  fetchWeatherByLocation(location) {
    return async (dispatch) => {
      try {
        const resp = await axios.get(API.WEATHER.FETCH_WEATHER_BY_LOCATION(location));
        if (resp.status === 200) {
          await dispatch(actions.fetchWeatherByLocation({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
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

export default weatherActions;
