import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './scenes/Home';
import NavigationBar from './components/NavigationBar';
import PrivateRoute from './scenes/Auth/PrivateRoute';
import Login from './scenes/Auth/Login';
import Register from './scenes/Auth/Register';
import MostPopularMovies from './scenes/MovieLists/MostPopularMovies';
import MostRatedMovies from './scenes/MovieLists/MostRatedMovies';
import MovieDetails from './scenes/MovieDetails';
import Error404 from './scenes/Error/Error404';
import Error500 from './scenes/Error/Error500';
import Profile from './scenes/Profile';
import { APP } from './constants/routes';
import { getToken } from './utils/auth.utils';
import history from './history';
import './styles/App.css';

class App extends Component {
  authed = () => !!getToken();

  render() {
    return (
      <Router history={history}>
        <div>
          <NavigationBar />
          <Switch>
            <Route exact path={APP.AUTH.LOGIN} component={Login} />
            <Route exact path={APP.AUTH.REGISTER} component={Register} />
            <Route exact path={APP.NOT_FOUND_ERROR} component={Error404} />
            <Route exact path={APP.SERVER_ERROR} component={Error500} />

            <PrivateRoute
              authed={this.authed()}
              path={APP.MOVIE.POPULAR_MOVIES}
              component={MostPopularMovies}
            />
            <PrivateRoute
              authed={this.authed()}
              path={APP.MOVIE.MOST_RATED_MOVIES}
              component={MostRatedMovies}
            />
            <PrivateRoute
              authed={this.authed()}
              path={APP.MOVIE.DETAILS()}
              component={MovieDetails}
            />
            <PrivateRoute
              authed={this.authed()}
              path={APP.PROFILE}
              component={Profile}
            />

            <PrivateRoute
              authed={this.authed()}
              path={APP.ROOT}
              component={Home}
            />

            <Route path='*' component={Error404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
