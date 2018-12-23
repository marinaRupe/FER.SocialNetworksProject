import initialState from './initialState';
import * as types from '../../constants/actionTypes';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';

export default function appInfoReducer(state = initialState.app, action) {
  switch (action.type) {
  case types.FETCH_APP_INFO:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        info: action.data,
      };
    }
    return { ...state };
  default:
    return { ...state };
  }
}
