import React, { Component } from 'react';
import { connect } from 'react-redux';
import { facebookJSSDKSetup } from '../../utils/auth.utils';
import userActions from '../../redux/actionCreators/userActionCreator';
import { buttonTypes } from '../../enums/buttonTypes.enum';
import Button from '../../components/Button';

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

  renderProfileData = () => {
    const { currentUser } = this.props;

    if (currentUser) {
      return (
        <div className='profile__user-info'>
          {currentUser.picture &&
            <img src={currentUser.picture} alt='' />
          }
          <div>First name: {currentUser.firstName}</div>
          <div>Last name: {currentUser.lastName}</div>
          <div>Email: {currentUser.email}</div>
          <div>Birthday: {currentUser.birthday || '-'}</div>
          <div>Gender: {currentUser.gender || '-'}</div>
        </div>
      );
    }

    return <div />;
  }

  render() {
    return (
      <div className='profile'>
        <div className='profile__title'>Profile</div>
        {this.renderProfileData()}
        <div>
          <Button
            action={this.logout}
            text='Logout'
            type={buttonTypes.secondary}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser,
  };
};

export default connect(mapStateToProps)(Profile);