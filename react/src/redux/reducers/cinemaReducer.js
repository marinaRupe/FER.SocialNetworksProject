import initialState from './initialState';
import * as types from '../../constants/actionTypes';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';

export default function cinemaReducer(state = initialState.cinemas, action) {
  switch (action.type) {
  case types.FETCH_CINEMAS_BY_CENTER_LOCATION:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        list: action.data.items,
      };
    }
    return { ...state };
  default:
    return { ...state };
  }
}
