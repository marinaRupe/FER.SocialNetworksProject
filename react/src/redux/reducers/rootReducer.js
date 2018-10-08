import { combineReducers } from 'redux';
import userReducer from './userReducer';

export default function rootReducer(asyncReducers) {
  return combineReducers({
    users: userReducer,
    ...asyncReducers,
  });
}