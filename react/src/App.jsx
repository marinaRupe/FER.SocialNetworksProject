import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './scenes/Home';
import Login from './scenes/Auth/Login';
import Register from './scenes/Auth/Register';
import MostPopularMovies from './scenes/MovieLists/MostPopularMovies';
import MovieDetails from './scenes/MovieDetails';
import Error404 from './scenes/Error/Error404';
import Error500 from './scenes/Error/Error500';
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
            <Route exact path={APP.MOVIE.POPULAR_MOVIES} component={MostPopularMovies} />
            <Route exact path={APP.MOVIE.DETAILS()} component={MovieDetails} />
            <Route exact path={APP.NOT_FOUND_ERROR} component={Error404} />
            <Route exact path={APP.SERVER_ERROR} component={Error500} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
