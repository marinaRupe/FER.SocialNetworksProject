import initialState from './initialState';
import * as types from '../actions/actionTypes';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';

export default function weatherReducer(state = initialState.weather, action) {
  switch (action.type) {
  case types.FETCH_WEATHER_BY_LOCATION:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        current: action.data
      };
    }
    return { ...state };
  default:
    return { ...state };
  }
}
