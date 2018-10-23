import axios from 'axios';
import history from '../../history';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';
import { API, APP } from '../../constants/routes';
import { deleteToken } from '../../utils/auth.utils';
import * as actions from '../actions/userActions';

const userActions = {
  login(user) {
    return async (dispatch) => {
      try {
        const resp = await axios.post(API.AUTH.LOGIN, { user });
        if (resp.status === 200) {
          await dispatch(actions.login({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
          history.push(APP.ROOT);
        }
      } catch (error) {
        history.push(APP.SERVER_ERROR);
      }
    };
  },
  logout() {
    return async (dispatch) => {
      await dispatch(actions.logout({ status: ACTION_STATUS.SUCCESS }));
      deleteToken();
      history.push(APP.AUTH.LOGIN);
    };
  },
};

export default userActions;