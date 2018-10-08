import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './scenes/Home';
import Login from './scenes/Auth/Login';
import Register from './scenes/Auth/Register';
import { APP } from './constants/routes';
import history from './history';
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path={APP.ROOT} component={Home} />
            <Route exact path={APP.AUTH.LOGIN} component={Login} />
            <Route exact path={APP.AUTH.REGISTER} component={Register} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
