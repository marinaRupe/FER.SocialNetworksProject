import history from '../history';
import { APP } from '../constants/routes';
import * as values from '../constants/values';

export const getToken = () => (localStorage.getItem(values.TOKEN));

export const setToken = (token, timeout) => {
  localStorage.setItem(values.TOKEN, token);
};

export const deleteToken = () => {
  localStorage.removeItem(values.TOKEN);
};

export const facebookJSSDKSetup = () => {
  window.fbAsyncInit = () => {
    window.FB.init({
      appId      : process.env.REACT_APP_FACEBOOK_APP_ID,
      cookie     : true,
      xfbml      : true,
      version    : process.env.REACT_APP_FACEBOOK_API_VERSION
    });
  
    window.FB.getLoginStatus((response) => {
      statusChangeCallback(response);
    });
  };
  
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
};

export const checkLoginState = () => {
  window.FB.getLoginStatus(response => {
    this.statusChangeCallback(response);
  });
};

const statusChangeCallback = response => {
  console.log('statusChangeCallback');
  console.log(response);

  if (response.status === 'connected') {
    console.log('Welcome!  Fetching your information.... ');
    window.FB.api('/me', response => {
      console.log('Successful login for: ' + response.name);
    });
    setToken(response.authResponse.accessToken, response.authResponse.expiresIn);
  } else if (response.status === 'not_authorized') {
    history.push(APP.AUTH.LOGIN);
  } else {
    history.push(APP.AUTH.LOGIN);
  }
};
