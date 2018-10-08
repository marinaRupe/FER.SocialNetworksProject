import initialState from './initialState';
import * as types from '../actions/actionTypes';
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
  default:
    return { ...state };
  }
}