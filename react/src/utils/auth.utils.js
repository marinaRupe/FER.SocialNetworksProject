import history from '../history';
import { APP } from '../constants/routes';
import * as values from '../constants/values';
import userActions from '../redux/actionCreators/userActionCreator';

export const getToken = () => (localStorage.getItem(values.TOKEN));

export const setToken = (token, timeout) => {
  localStorage.setItem(values.TOKEN, token);
};

export const deleteToken = () => {
  localStorage.removeItem(values.TOKEN);
};

export const facebookJSSDKSetup = dispatch => {
  window.fbAsyncInit = () => {
    window.FB.init({
      appId      : process.env.REACT_APP_FACEBOOK_APP_ID,
      cookie     : true,
      xfbml      : true,
      version    : process.env.REACT_APP_FACEBOOK_API_VERSION
    });
  
    window.FB.getLoginStatus(response => {
      statusChangeCallback(response, dispatch);
    });
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
  window.FB.getLoginStatus(response => {
    statusChangeCallback(response, dispatch);
    window.location.reload(true);
  });
};

const statusChangeCallback = (response, dispatch) => {
  console.log('statusChangeCallback');
  console.log(response);

  if (response.status === 'connected') {
    console.log('Fetching user data...');

    window.FB.api('/me', {
      fields: 'name,first_name,last_name,birthday,age_range,email,gender,relationship_status',
    },
    res => {
      console.log('Successful login for: ' + res.name);
      console.log(res);

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
          birthday: res.birthday,
          ageRange: res.age_range,
        };
        if (dispatch) {
          dispatch(userActions.login(user, response));
        }
      }); 
      
    });
  } else if (response.status === 'not_authorized') {
    history.push(APP.AUTH.LOGIN);
  } else {
    history.push(APP.AUTH.LOGIN);
  }
};
