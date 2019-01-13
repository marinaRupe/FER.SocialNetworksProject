import axios from 'axios';
import history from '../../history';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';
import { API, APP } from '../../constants/routes';
import { deleteToken, setToken } from '../../utils/auth.utils';
import { actionWrapper } from '../../utils/redux.utils';
import * as actionCreators from '../actionCreators/user.actionCreators';

export function login(user, authResponse) {
  const action = async (dispatch) => {
    const resp = await axios.post(API.AUTH.LOGIN, { user });
    if (resp.status === 200) {
      await dispatch(actionCreators.login({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
      setToken(authResponse.accessToken, authResponse.expiresIn);
      history.push(APP.ROOT);
    }
  };
  return actionWrapper(action);
}

export function logout() {
  const action = async (dispatch) => {
    await dispatch(actionCreators.logout({ status: ACTION_STATUS.SUCCESS }));
    deleteToken();
    history.push(APP.AUTH.LOGIN);
  };
  return actionWrapper(action);
}

export function savePreferredGenres(userID,genres) {
  const action = async (dispatch) => {
    const resp = await axios.post(API.USER.ADD_PREFERRED_GENRES(userID, genres));
    if (resp.status === 200) {
      await dispatch(actionCreators.updateUserPreferredGenres(
        { status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action);
}

export function fetchUserPreferredGenres(user) {
  const action = async (dispatch) => {
    const resp = await axios.get(API.USER.FETCH_PREFERRED_GENRES ( user.userID));
    if (resp.status === 200) {
      await dispatch(actionCreators.fetchUserPreferredGenres({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action);
}
