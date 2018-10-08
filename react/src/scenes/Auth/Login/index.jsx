import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { APP } from '../../../constants/routes';
import { getToken } from '../../../utils/auth.utils';

class Login extends Component {
  render() {
    if (getToken()) {
      return <Redirect to={APP.ROOT} />;
    }

    return (
      <div>
        LOGIN
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