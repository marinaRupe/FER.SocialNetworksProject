import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { APP } from '../../../constants/routes';
import { facebookJSSDKSetup, checkLoginState, getToken } from '../../../utils/auth.utils';

class Login extends Component {
  componentDidMount() {
    facebookJSSDKSetup();
  }

  handleClickOnLoginButton = () => {
    window.FB.login(checkLoginState());
  };

  render() {
    if (getToken()) {
      return <Redirect to={APP.ROOT} />;
    }

    return (
      <div className='login-page'>
        <div className='login-page__title'>Login</div>
        <div>
          <div
            className='fb-login-button'
            data-max-rows="1"
            data-size="large"
            data-button-type="continue_with"
            data-show-faces="false"
            data-auto-logout-link="false"
            data-use-continue-as="false"
            onClick={this.handleClickOnLoginButton}
          >
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.users.loggedIn,
  };
};

export default connect(mapStateToProps)(Login);