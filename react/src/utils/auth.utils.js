/* eslint-disable no-console */
import axios from 'axios';
import { API } from '../constants/routes';
import * as values from '../constants/values';
import * as userActions from '../redux/actions/user.actions';

export const getToken = () => (localStorage.getItem(values.TOKEN));

export const setToken = (token, timeout) => {
  localStorage.setItem(values.TOKEN, token);
};

export const deleteToken = () => {
  localStorage.removeItem(values.TOKEN);
};

export const getLocation = async (res) => {
  if (res.location) {
    const location = await axios.get(API.LOCATION.FIND(res.location.name))
      .then((_res) => {return {
        id: res.location.id,
        name: res.location.name,
        coordinates: {
          latitude: +_res.data.lat,
          longitude: +_res.data.lng,
        },
      };
      });

    return location;
  }
};

export const facebookJSSDKSetup = dispatch => {
  //console.log('facebookJSSDKSetup');
  window.fbAsyncInit = () => {
    window.FB.init({
      appId      : process.env.REACT_APP_FACEBOOK_APP_ID,
      cookie     : true,
      xfbml      : true,
      version    : process.env.REACT_APP_FACEBOOK_API_VERSION,
    });

    window.FB.getLoginStatus(response => {
      statusChangeCallback(response, dispatch);
    }, true);
  };

  (function(d, s, id) {
    let js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
};

export const checkLoginState = dispatch => {
  //console.log('checkLoginState');
  window.FB.getLoginStatus(response => {
    statusChangeCallback(response, dispatch);
  }, true);
};

const statusChangeCallback = (response, dispatch) => {
  console.log('statusChangeCallback');
  console.log(response);

  if (response.status === 'connected') {
    if (!getToken()) {
      login(response, dispatch);
    }
  } else {
    dispatch(userActions.logout());
  }
};

const login = (response, dispatch) => {
  window.FB.api('/me', {
    fields: 'name,first_name,last_name,age_range,email,gender,location,likes',
  },
  async res => {
    const location = await getLocation(res);

    const likedPages = {
      pages: (res.likes && res.likes.data) || [],
      paging: res.likes && res.likes.paging,
    };

    window.FB.api(`/${res.id}/picture`, 'GET', { redirect: false, type: 'large'}, (imageResponse) => {
      const user = {
        token: response.authResponse.accessToken,
        firstName: res.first_name,
        lastName: res.last_name,
        name: res.name,
        email: res.email,
        userID: res.id,
        picture: imageResponse.data ? imageResponse.data.url : res.data.url,
        gender: res.gender,
        ageRange: res.age_range,
        location,
        likedPages,
      };

      dispatch(userActions.login(user, response.authResponse));
    });
  });
};

export const logout = dispatch => {
  window.FB.getLoginStatus(response => {
    console.log('getLoginStatus', response);
    if (response.status === 'connected') {
      window.FB.logout(_ => {
        dispatch(userActions.logout());
      });
    } else {
      dispatch(userActions.logout());
    }
  }, true);
};
