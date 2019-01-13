import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBContainer, MDBRow, MDBCol} from 'mdbreact';

import * as cinemaActions from '../../redux/actions/cinema.actions';
import * as movieActions from '../../redux/actions/movie.actions';
import * as weatherActions from '../../redux/actions/weather.actions';
import * as appInfoActions from '../../redux/actions/appInfo.actions';

import AppInfo from '../../components/Home/AppInfo';
import MovieListItem from '../../components/Movie/MovieListItem';
import ButtonComponent from '../../components/ButtonComponent';
import WeatherSuggestion from './WeatherSuggestion';

import * as values from '../../constants/values';
import { APP } from '../../constants/routes';
import { buttonTypes } from '../../enums/buttonTypes.enum';
import { getBrowserLocation } from '../../utils/location.utils';
import history from '../../history';


// TODO: this component is to large, move the larger render functions to separate component
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      userLocation: null,
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);

    this.setState({
      isLoading: true,
    }, async () => {
      const {
        fetchCinemasByCenterLocation,
        fetchWeatherByLocation,
        fetchAppInfo,
        fetchTopMovies,
        fetchRecommendedMovies,
        currentUser,
      } = this.props;

      const userLocation = await this.getLocation();

      await fetchCinemasByCenterLocation(userLocation);
      await fetchWeatherByLocation(userLocation);
      await fetchAppInfo();
      await fetchTopMovies(1, 5);
      await fetchRecommendedMovies(1, 5, currentUser);

      this.setState({
        isLoading: false,
        userLocation,
      });
    });
  }

  async getLocation() {
    try {
      const { latitude, longitude } = await getBrowserLocation();
      return [latitude, longitude];
    } catch {
      const { currentUser } = this.props;
      return (currentUser && currentUser.location && currentUser.location.coordinates
        && [currentUser.location.coordinates.latitude, currentUser.location.coordinates.longitude])
        || values.CURRENT_LOCATION;
    }
  }

  renderMovieList = (movies) => {
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <div className='movie-list small loading'>
          <div className='loader border-top-info' />
        </div>
      );
    }

    if (movies.length > 0) {
      return (
        <div className='movie-list small'>
          {movies.map(m => <MovieListItem key={m.imdbID} movie={m} />)}
        </div>
      );
    }

    return (
      <div className='movie-list small'>
        Movies not found.
      </div>
    );
  }

  redirectToPage = (page) => {
    history.push(page);
  }

  render() {
    const { topMovies, recommendedMovies, info, weather, cinemas, currentUser } = this.props;
    const { isLoading, userLocation } = this.state;

    return (
      <div className='home-page page'>
        <MDBContainer>
          <MDBRow className='mb-40'>
            <MDBCol md='8' className='offset-md-2'>
              {isLoading ? null :
                <WeatherSuggestion
                  name={currentUser && currentUser.firstName}
                  weather={weather}
                  cinemas={cinemas}
                  location={userLocation}
                />
              }
            </MDBCol>
          </MDBRow>
          <MDBRow className='mb-40'>
            <MDBCol md='6'>
              <h4 className='home-page__movie-list--title'>Top 5</h4>
              {this.renderMovieList(topMovies)}
              <ButtonComponent
                action={this.redirectToPage.bind(null, APP.MOVIE.POPULAR_MOVIES)}
                text='See more'
                type={buttonTypes.primary}
              />
            </MDBCol>
            <MDBCol md='6'>
              <h4 className='home-page__movie-list--title'>Recommended</h4>
              {this.renderMovieList(recommendedMovies)}
              <ButtonComponent
                action={this.redirectToPage.bind(null, APP.MOVIE.PERSONAL.RECOMMENDED_MOVIES)}
                text='See more'
                type={buttonTypes.primary}
              />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        {info && <AppInfo info={info} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cinemas: state.cinemas.list,
    weather: state.weather.current,
    info: state.app.info,
    topMovies: state.movies.topMovies.list,
    recommendedMovies: state.movies.recommendedMovies.list,
    currentUser: state.users.currentUser,
  };
};

const mapDispatchToProps = {
  fetchCinemasByCenterLocation: cinemaActions.fetchCinemasByCenterLocation,
  fetchWeatherByLocation: weatherActions.fetchWeatherByLocation,
  fetchAppInfo: appInfoActions.fetchAppInfo,
  fetchTopMovies: movieActions.fetchTopMovies,
  fetchRecommendedMovies: movieActions.fetchRecommendedMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
