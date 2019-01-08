import axios from 'axios';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';
import { API } from '../../constants/routes';
import { actionWrapper } from '../../utils/redux.utils';
import * as actionCreators from '../actionCreators/movieReview.actionCreators';

export function fetchReviewsForMovie(movieTitle='') {
  const action = async (dispatch) => {
    const resp = await axios.get(API.REVIEWS.FETCH_REVIEWS_FOR_MOVIE(movieTitle));
    if (resp.status === 200) {
      await dispatch(actionCreators.fetchReviewsForMovie({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action);
}
