import axios from 'axios';
import history from '../../history';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';
import { API, APP } from '../../constants/routes';
import { deleteToken, setToken } from '../../utils/auth.utils';
import { actionWrapper } from '../../utils/redux.utils';

import * as actionCreators from '../actionCreators/user.actionCreators';

export function login(user, fbResponse) {
  const action = async (dispatch) => {
    const resp = await axios.post(API.AUTH.LOGIN, { user });
    if (resp.status === 200) {
      await dispatch(actionCreators.login({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
      setToken(fbResponse.authResponse.accessToken, fbResponse.authResponse.expiresIn);
      //history.push(APP.ROOT);
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