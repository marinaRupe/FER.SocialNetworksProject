import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { APP } from '../../../constants/routes';
import { facebookJSSDKSetup, checkLoginState, getToken } from '../../../utils/auth.utils';
import { buttonTypes } from '../../../enums/buttonTypes.enum';
import ButtonComponent from '../../../components/ButtonComponent';

class Login extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    facebookJSSDKSetup(dispatch);
  }

  handleClickOnLoginButton = () => {
    const { dispatch } = this.props;
    window.FB.login(() =>
    {
      checkLoginState(dispatch);
    },
    {
      scope: 'email,user_gender,user_likes,user_location,user_birthday,user_age_range'
    });
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
            data-max-rows='1'
            data-size='large'
            data-button-type='login_with'
            data-show-faces='true'
            data-auto-logout-link='true'
            data-use-continue-as='false'
            onClick={this.handleClickOnLoginButton}
          >
            <ButtonComponent
              action={this.logout}
              text='Login with Facebook'
              type={buttonTypes.primary}
            />
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