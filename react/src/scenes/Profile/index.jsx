import React, { Component } from 'react';
import { connect } from 'react-redux';
import { facebookJSSDKSetup } from '../../utils/auth.utils';
import userActions from '../../redux/actionCreators/userActionCreator';

class Profile extends Component {
  componentDidMount() {
    facebookJSSDKSetup();
  }

  logout = () => {
    const { dispatch } = this.props;
    window.FB.logout(response => {
      dispatch(userActions.logout());
   });
  }

  render() {
    return (
      <div className='profile'>
        <div className='profile__title'>Profile</div>
        <div className='profile__user-info'>
          <div>First name: </div>
          <div>Last name: </div>
        </div>
        <div>
          <button
            onClick={this.logout}
            className='btn-primary'
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(Profile);