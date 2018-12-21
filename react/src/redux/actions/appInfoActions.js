import * as types from './actionTypes';

export const fetchAppInfo = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_APP_INFO
  };
};
