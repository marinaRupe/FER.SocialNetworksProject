import { combineReducers } from 'redux';
import userReducer from './userReducer';
import movieReducer from './movieReducer';

export default function rootReducer(asyncReducers) {
  return combineReducers({
    users: userReducer,
    movies: movieReducer,
    ...asyncReducers,
  });
}