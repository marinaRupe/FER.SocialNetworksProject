import axios from 'axios';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';
import { API } from '../../constants/routes';
import { actionWrapper } from '../../utils/redux.utils';
import * as actionCreators from '../actionCreators/appInfo.actionCreators';

export function fetchAppInfo() {
  const action = async (dispatch) => {
    const resp = await axios.get(API.APP.FETCH_APP_INFO);
    if (resp.status === 200) {
      await dispatch(actionCreators.fetchAppInfo({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action);
}
