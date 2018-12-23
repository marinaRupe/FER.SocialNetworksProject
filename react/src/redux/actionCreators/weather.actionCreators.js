import * as types from '../actionTypes';

export const fetchWeatherByLocation = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_WEATHER_BY_LOCATION,
  };
};
