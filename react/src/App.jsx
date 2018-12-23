import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Home from './scenes/Home';
import Login from './scenes/Auth/Login';
import Register from './scenes/Auth/Register';
import MostPopularMovies from './scenes/MovieLists/MostPopularMovies';
import MostRatedMovies from './scenes/MovieLists/MostRatedMovies';
import NowPlayingMovies from './scenes/MovieLists/NowPlayingMovies';
import UserRatedMovies from './scenes/MovieLists/Personal/UserRatedMovies';
import UserSavedMovies from './scenes/MovieLists/Personal/UserSavedMovies';
import UserWatchedMovies from './scenes/MovieLists/Personal/UserWatchedMovies';
import RecommendedMovies from './scenes/MovieLists/Personal/RecommendedMovies';
import MovieDetails from './scenes/MovieDetails';
import Error404 from './scenes/Error/Error404';
import Error500 from './scenes/Error/Error500';
import PrivacyPolicy from './scenes/PrivacyPolicy';
import Profile from './scenes/Profile';

import NavigationBar from './components/NavigationBar';
import PrivateRoute from './components/Auth/PrivateRoute';

import { APP } from './constants/routes';
import history from './history';

import './styles/App.css';

class App extends Component {

  render() {
    return (
      <Router history={history}>
        <div>
          <NavigationBar />
          <Helmet>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
              integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
              crossorigin=""/>
            <script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"
              integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA=="
              crossorigin=""></script>
            <script src="https://unpkg.com/react-leaflet/dist/react-leaflet.min.js" />
          </Helmet>
          <Switch>
            <Route exact path={APP.AUTH.LOGIN} component={Login} />
            <Route exact path={APP.AUTH.REGISTER} component={Register} />
            <Route exact path={APP.PRIVACY_POLICY} component={PrivacyPolicy} />
            <Route exact path={APP.NOT_FOUND_ERROR} component={Error404} />
            <Route exact path={APP.SERVER_ERROR} component={Error500} />

            <PrivateRoute exact path={APP.ROOT} component={Home}/>

            <PrivateRoute path={APP.MOVIE.POPULAR_MOVIES} component={MostPopularMovies} />
            <PrivateRoute path={APP.MOVIE.MOST_RATED_MOVIES} component={MostRatedMovies} />
            <PrivateRoute path={APP.MOVIE.NOW_PLAYING_MOVIES} component={NowPlayingMovies} />

            <PrivateRoute path={APP.MOVIE.PERSONAL.USER_RATED_MOVIES} component={UserRatedMovies} />
            <PrivateRoute path={APP.MOVIE.PERSONAL.USER_WATCHED_MOVIES} component={UserWatchedMovies} />
            <PrivateRoute path={APP.MOVIE.PERSONAL.USER_SAVED_MOVIES} component={UserSavedMovies} />
            <PrivateRoute path={APP.MOVIE.PERSONAL.RECOMMENDED_MOVIES} component={RecommendedMovies} />

            <PrivateRoute path={APP.MOVIE.DETAILS()} component={MovieDetails} />
            <PrivateRoute path={APP.PROFILE} component={Profile} />

            <Route path='*' component={Error404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
