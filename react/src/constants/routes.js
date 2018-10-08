const API_VERSION = 'v1.0';

export const API_URL = `/api/${API_VERSION}`;

export const API = {
  AUTH: {
    LOGIN: `${API_URL}/user/login`,
    REGISTER: `${API_URL}/user/register`,
    CHANGE_PASSWORD: `${API_URL}/user/changePassword`,
  }
};

export const APP = {
  ROOT: '/',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  SERVER_ERROR: '/error/500',
  NOT_FOUND_ERROR: '/error/404',
};