import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBContainer, MDBRow, MDBCol} from 'mdbreact';
import { Map, TileLayer} from 'react-leaflet';

import * as movieActions from '../../../redux/actions/movie.actions';
import * as cinemaActions from '../../../redux/actions/cinema.actions';

import MovieListItem from '../../../components/Movie/MovieListItem';
import PaginationComponent from '../../../components/PaginationComponent';
import CinemaMarker from '../../../components/Home/CinemaMarker';

import * as values from '../../../constants/values';

import { getBrowserLocation } from '../../../utils/location.utils';

class NowPlayingMovies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      userLocation: null,
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = page => {
    this.setState({
      isLoading: true,
    }, async () => {
      const { fetchNowPlayingMovies,fetchCinemasByCenterLocation, currentUser } = this.props;
      const userLocation = await getLocation(currentUser);

      await fetchNowPlayingMovies(page);
      await fetchCinemasByCenterLocation(userLocation);

      this.setState({
        isLoading: false,
        userLocation,
      });
    });
  }

  renderCinemaMapWithMarkers = () => {
    const { isLoading, userLocation } = this.state;
    const { cinemas } = this.props;

    if (isLoading) {
      return (
        <div className='cinema-list loading'>
          <div className='loader border-top-info' />
        </div>
      );
    }

    if (userLocation && cinemas.length > 0) {
      return (
        <div className='cinema-list'>
          <div className='home-page__cinemas-map--heading'>
            <h3>Map of cinemas nearby</h3>
          </div>
          <MDBRow>
            <MDBCol className='offset-md-1'>
              <Map
                center={userLocation}
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

  renderMovieList = () => {
    const { isLoading } = this.state;
    const { movies } = this.props;

    if (isLoading) {
      return (
        <div className='movie-list loading'>
          <div className='loader border-top-info' />
        </div>
      );
    }

    if (movies.length > 0) {
      return (
        <div className='movie-list'>
          {movies.map(m => <MovieListItem key={m.imdbID} movie={m} />)}
        </div>
      );
    }

    return (
      <div className='movie-list'>
        Movies not found.
      </div>
    );
  }

  render() {
    const { page, totalPages } = this.props;

    return (
      <div className='page'>
        <div className='movie-list__title'>Now playing movies</div>
        <MDBContainer>
          <MDBRow className='mb-40'>
            <MDBCol md='6'>
              {this.renderMovieList()}
            </MDBCol>

            <MDBCol md='6'>
              {this.renderCinemaMapWithMarkers()}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <PaginationComponent
          current={page}
          total={totalPages}
          action={this.fetchMovies}
        />
      </div>
    );
  }
}

const getLocation = async (currentUser) => {
  try {
    const { latitude, longitude } = await getBrowserLocation();
    return [latitude, longitude];
  } catch {
    const { currentUser } = this.props;
    return (currentUser && currentUser.location && currentUser.location.coordinates
      && [currentUser.location.coordinates.latitude, currentUser.location.coordinates.longitude])
      || values.CURRENT_LOCATION;
  }
};

const mapStateToProps = state => {
  return {
    movies: state.movies.list,
    page: state.movies.page,
    totalPages: state.movies.totalPages,
    currentUser: state.users.currentUser,
    cinemas: state.cinemas.list,
  };
};

const mapDispatchToProps = {
  fetchNowPlayingMovies: movieActions.fetchNowPlayingMovies,
  fetchCinemasByCenterLocation: cinemaActions.fetchCinemasByCenterLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(NowPlayingMovies);
