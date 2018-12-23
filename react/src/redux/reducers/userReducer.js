import initialState from './initialState';
import * as types from '../../constants/actionTypes';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';

export default function userReducer(state = initialState.users, action) {
  switch (action.type) {
  case types.USER_LOGIN:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        currentUser: { ...action.data },
        loggedIn: true,
      };
    }
    return { ...state };
  case types.USER_LOGOUT:
    if (action.status === ACTION_STATUS.SUCCESS) {
      return {
        ...state,
        currentUser: null,
        loggedIn: false,
      };
    }
    return { ...state };
  default:
    return { ...state };
  }
}