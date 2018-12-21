import axios from 'axios';
import history from '../../history';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';
import { API, APP } from '../../constants/routes';
import * as actions from '../actions/appInfoActions';

const appInfoActions = {
  fetchAppInfo() {
    return async (dispatch) => {
      try {
        const resp = await axios.get(API.APP.FETCH_APP_INFO);
        if (resp.status === 200) {
          await dispatch(actions.fetchAppInfo({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
        }
      } catch (error) {
        if (error.status === 400) {
          history.push(APP.NOT_FOUND_ERROR);
        } else {
          history.push(APP.SERVER_ERROR);
        }
      }
    };
  }
};

export default appInfoActions;
