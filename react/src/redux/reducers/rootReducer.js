import { combineReducers } from 'redux';
import userReducer from './userReducer';
import movieReducer from './movieReducer';
import movieReviewReducer from './movieReviewReducer';
import cinemaReducer from './cinemaReducer';

export default function rootReducer(asyncReducers) {
  return combineReducers({
    users: userReducer,
    movies: movieReducer,
    reviews: movieReviewReducer,
    cinemas: cinemaReducer,
    ...asyncReducers,
  });
}
