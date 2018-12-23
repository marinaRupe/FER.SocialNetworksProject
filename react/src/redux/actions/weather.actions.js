import axios from 'axios';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';
import { API } from '../../constants/routes';
import { actionWrapper } from '../../utils/redux.utils';
import * as actionCreators from '../actionCreators/weather.actionCreators';

export function fetchWeatherByLocation(location) {
  const action = async (dispatch) => {
    const resp = await axios.get(API.WEATHER.FETCH_WEATHER_BY_LOCATION(location));
    if (resp.status === 200) {
      await dispatch(actionCreators.fetchWeatherByLocation({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action);
}
