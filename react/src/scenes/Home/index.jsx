import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBContainer, MDBRow, MDBCol} from 'mdbreact';
import { Map, TileLayer} from 'react-leaflet';
import cinemaActions from '../../redux/actionCreators/cinema.actions';
import movieActions from '../../redux/actionCreators/movie.actions';
import weatherActions from '../../redux/actionCreators/weather.actions';
import appInfoActions from '../../redux/actionCreators/appInfo.actions';
import CinemaMarker from '../../components/Home/CinemaMarker';
import WeatherInfo from '../../components/Home/WeatherInfo';
import AppInfo from '../../components/Home/AppInfo';
import MovieListItem from '../../components/Movie/MovieListItem';
import ButtonComponent from '../../components/ButtonComponent';
import * as values from '../../constants/values';
import { APP } from '../../constants/routes';
import { buttonTypes } from '../../enums/buttonTypes.enum';
import history from '../../history';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  async componentDidMount() {

    const { dispatch } = this.props;

    this.setState({
      isLoading: true,
    });

    dispatch(cinemaActions.fetchCinemasByCenterLocation(values.CURRENT_LOCATION));
    dispatch(weatherActions.fetchWeatherByLocation(values.CURRENT_LOCATION));
    dispatch(appInfoActions.fetchAppInfo());
    dispatch(movieActions.fetchTopMovies(1, 5));
    dispatch(movieActions.fetchRecommendedMovies(1, 5));

    this.setState({
      isLoading: false,
    });

  }

  renderCinemaMapWithMarkers = () => {
    const { isLoading } = this.state;
    const { cinemas } = this.props;

    if (isLoading) {
      return (
        <div className='cinema-list loading'>
          <div class='loader border-top-info' />
        </div>
      );
    }

    if (cinemas.length > 0) {
      return (
        <div className='cinema-list'>
          <div className='home-page__cinemas-map--heading'>
            <h3>Rainy outside?</h3>
            <h6>Then it's the best time to watch a new movie at the cinema!</h6>
            <h6>Here is the map of cinemas nearby.</h6>
          </div>
          <MDBRow>
            <MDBCol className='offset-md-1'>
              <Map
                center={values.CURRENT_LOCATION}
                zoom='13'
                className='home-page__cinemas-map'
              >
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                {cinemas.map((c, index) => <CinemaMarker key={index} cinema={c} />)}
              </Map>
            </MDBCol>
          </MDBRow>
          
        </div>
      );
    }

    return (
      <div className='cinema-list'>
        Cinemas not found.
      </div>
    );
  }

  renderWeatherInfo = () => {
    const { weather } = this.props;

    if (weather != null) {
      return (
        <WeatherInfo weather={weather} />
      );
    }
  }

  renderAppInfo = () => {
    const { info } = this.props;

    if (info != null) {
      return (
        <AppInfo info={info} />
      );
    }
  }

  renderMovieList = (movies) => {
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <div className='movie-list small loading'>
          <div class='loader border-top-info' />
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
    const { topMovies, recommendedMovies } = this.props;

    return (
      <div className='home-page'>
        <MDBContainer>
          <MDBRow className='mb-40'>   
            <MDBCol md='6' className='offset-md-3'>
              {this.renderWeatherInfo()}
              {this.renderCinemaMapWithMarkers()}
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
        {this.renderAppInfo()}
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
  };
};

const mapDipatchToProps = {

}

export default connect(mapStateToProps)(Home);
