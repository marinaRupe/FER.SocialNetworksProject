import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';

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
import Search from './scenes/MovieLists/Search';
import MovieDetails from './scenes/MovieDetails';
import PersonDetails from './scenes/PersonDetails';
import Error404 from './scenes/Error/Error404';
import Error500 from './scenes/Error/Error500';
import PrivacyPolicy from './scenes/PrivacyPolicy';
import ContactUs from './scenes/ContactUs';
import Profile from './scenes/Profile';
import ProfileEdit from './scenes/Profile/edit';

import NavigationBar from './components/NavigationBar';
import PrivateRoute from './components/Auth/PrivateRoute';

import { APP } from './constants/routes';
import history from './history';

import 'leaflet/dist/leaflet.css';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/App.css';

class App extends Component {

  render() {
    return (
      <Router history={history}>
        <div>
          <NavigationBar />
          <Switch>
            <Route exact path={APP.AUTH.LOGIN} component={Login} />
            <Route exact path={APP.AUTH.REGISTER} component={Register} />
            <Route exact path={APP.PRIVACY_POLICY} component={PrivacyPolicy} />
            <Route exact path={APP.CONTACT_US} component={ContactUs} />
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

            <PrivateRoute path={APP.MOVIE.SEARCH} component={Search} />

            <PrivateRoute path={APP.MOVIE.DETAILS()} component={MovieDetails} />
            <PrivateRoute path={APP.PERSON.DETAILS()} component={PersonDetails} />
            <PrivateRoute path={APP.PROFILE} component={Profile} />
            <PrivateRoute path={APP.PROFILE_EDIT()} component={ProfileEdit} />

            <Route path='*' component={Error404} />
          </Switch>
          <footer className='footer'>
            <Link to={APP.CONTACT_US} className='link'>Contact Us</Link>
            <Link to={APP.PRIVACY_POLICY} className='link'>Privacy Policy</Link>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
