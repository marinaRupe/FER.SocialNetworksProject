import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardImage, CardTitle, CardText, Col, Row } from 'mdbreact';
import * as userActions from '../../redux/actions/user.actions';
import { buttonTypes } from '../../enums/buttonTypes.enum';
import ButtonComponent from '../../components/ButtonComponent';
import backgroundImage from '../../images/popcorn.jpg';
import { facebookJSSDKSetup } from '../../utils/auth.utils';

class Profile extends Component {
  componentDidMount() {
    facebookJSSDKSetup();
  }

  logout = () => {
    const { logout } = this.props;
    window.FB.logout(response => {
      logout();
    });
  }

  renderProfileData = () => {
    const { currentUser } = this.props;

    if (currentUser) {
      //console.log("user id is: " + currentUser.userID);
      return (
        <div className='profile__user-info'>
          <Row>
            <Col md='3' className='offset-md-3'>
              <Card style={{ width: '35rem' }}>
                <CardImage
                  className='img-fluid'
                  src={backgroundImage}
                  waves
                />
                <div className='profile__image-container'>
                  <img
                    className='profile__image'
                    src={currentUser.picture}
                    alt=''
                  />
                </div>
                <CardBody>
                  <CardTitle>{currentUser.name}</CardTitle>
                  <CardText>
                    { currentUser.email &&
                      <span className='profile__user-info--item'>
                        <i className='material-icons'>email</i>
                        {currentUser.email}
                      </span>
                    }
                    { currentUser.birthday &&
                      <span className='profile__user-info--item'>
                        <i className='material-icons'>cake</i>
                        <span>{currentUser.birthday}</span>
                      </span>
                    }
                    { currentUser.gender &&
                      <span className='profile__user-info--item'>
                        <i className='material-icons'>accessibility</i>
                        <span>{currentUser.gender}</span>
                      </span>
                    }
                  </CardText>
                  <div className='profile__btn-container'>
                    <ButtonComponent
                      action={this.logout}
                      text='Logout'
                      type={buttonTypes.secondary}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }

    return <div />;
  }

  render() {
    return (
      <div className='profile page'>
        <div className='profile__title'>Profile</div>
        {this.renderProfileData()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser,
  };
};

const mapDispatchToProps = {
  logout: userActions.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
