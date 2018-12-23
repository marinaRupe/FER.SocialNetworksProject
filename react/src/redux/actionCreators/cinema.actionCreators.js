import * as types from '../actionTypes';

export const fetchCinemasByCenterLocation = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_CINEMAS_BY_CENTER_LOCATION,
  };
};
