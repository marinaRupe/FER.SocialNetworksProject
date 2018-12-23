import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { MDBJumbotron, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
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
    if (!!getToken()) {
      return <Redirect to={APP.ROOT} />;
    }

    return (
      <div className='login-page'>
        <MDBContainer className='mt-5 text-center'>
          <MDBRow>
            <MDBCol>
              <MDBJumbotron className='login-page__jumbotron'>
                <h2 className='h1 display-3'>Hello, movie lover!</h2>
                <p className='lead'>
                  If you enjoy watching movies, this is the app for you.
                </p>
                <p>
                  Login with Facebook and explore movies.
                </p>
                <div className='lead'>
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
                      action={() => null}
                      text='Login with Facebook'
                      type={buttonTypes.primary}
                    />
                  </div>
                </div>
              </MDBJumbotron>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
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