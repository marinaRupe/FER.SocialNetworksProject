import axios from 'axios';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';
import { API } from '../../constants/routes';
import { actionWrapper } from '../../utils/redux.utils';
import * as actionCreators from '../actionCreators/cinema.actionCreators';

export function fetchCinemasByCenterLocation(location) {
  const action = async (dispatch) => {
    const resp = await axios.get(API.CINEMA.FETCH_CINEMAS_BY_CENTER_LOCATION(location));
    if (resp.status === 200) {
      await dispatch(actionCreators.fetchCinemasByCenterLocation({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action);
}
