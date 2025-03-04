import * as types from '../actionTypes';

export const login = ({ status, data }) => {
  return {
    data,
    status,
    type: types.USER_LOGIN,
  };
};

export const register = ({ status, data }) => {
  return {
    data,
    status,
    type: types.USER_REGISTER,
  };
};

export const logout = ({ status }) => {
  return {
    status,
    type: types.USER_LOGOUT,
  };
};

export const updateUserPreferredGenres = ({status}) =>{
  return {
    status,
    type: types.USER_UPDATE_PREFERRED_GENRES,
  };
};

export const fetchUserPreferredGenres = ({status, data}) =>{
  return {
    data,
    status,
    type: types.FETCH_PREFERRED_GENRES,
  };
};
