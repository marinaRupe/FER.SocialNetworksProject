import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Card, CardBody, CardImage, CardTitle, CardText, Col, Row} from 'mdbreact';
import { buttonTypes } from '../../enums/buttonTypes.enum';
import ButtonComponent from '../../components/ButtonComponent';
import backgroundImage from '../../images/popcorn.jpg';
import { logout } from '../../utils/auth.utils';
import { APP } from '../../constants/routes';
import * as userActions from '../../redux/actions/user.actions';

class Profile extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  async componentDidMount() {
    const { currentUser } = this.props;
    await this.props.fetchUserPreferredGenres(currentUser);
  }

  logout = () => {
    logout(this.props.dispatch);
  }

  renderProfileData = () => {
    const { currentUser } = this.props;
    const { preferred_genres } = this.props;

    if (currentUser) {
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
                    { currentUser.location &&
                      <span className='profile__user-info--item'>
                        <i className='material-icons'>home</i>
                        <span>{currentUser.location.name}</span>
                      </span>
                    }
                    { currentUser.ageRange &&
                      <span className='profile__user-info--item'>
                        <i className='material-icons'>cake</i>
                        <span>
                          {currentUser.ageRange.min}{currentUser.ageRange.max ? ` - ${currentUser.ageRange.max}` : '+'}
                        </span>
                      </span>
                    }
                    { currentUser.gender &&
                      <span className='profile__user-info--item'>
                        <i className='material-icons'>accessibility</i>
                        <span>{currentUser.gender}</span>
                      </span>
                    }
                    { preferred_genres && preferred_genres.length > 0 &&
                      <span className='profile__user-info--item'>
                        <b>Preferred genres:&nbsp;</b>
                        <span>{preferred_genres.join(', ')}</span>
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
                  <Link to={APP.PROFILE_EDIT(currentUser.userID)}>Edit profile</Link>

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
    preferred_genres: state.users.preferred_genres,
  };
};

const mapDispatchToProps = {
  fetchUserPreferredGenres : userActions.fetchUserPreferredGenres,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
