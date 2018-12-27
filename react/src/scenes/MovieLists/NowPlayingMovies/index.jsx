import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as movieActions from '../../../redux/actions/movie.actions';
import MovieListItem from '../../../components/Movie/MovieListItem';
import PaginationComponent from '../../../components/PaginationComponent';
import { MDBContainer, MDBRow, MDBCol} from 'mdbreact';
import { Map, TileLayer} from 'react-leaflet';

import * as values from '../../../constants/values';
import * as cinemaActions from '../../../redux/actions/cinema.actions';
import CinemaMarker from '../../../components/Home/CinemaMarker';

class NowPlayingMovies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
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
      await fetchNowPlayingMovies(page);
      await fetchCinemasByCenterLocation(coordinates(currentUser));

      this.setState({
        isLoading: false,
      });
    });
  }

  renderCinemaMapWithMarkers = () => {
    const { isLoading } = this.state;
    const { cinemas , currentUser} = this.props;

    if (isLoading) {
      return;
    }

    if (cinemas.length > 0) {
      return (
        <div className='cinema-list'>
          <div className='home-page__cinemas-map--heading'>
            <h3>Map of cinemas nearby</h3>
          </div>
          <MDBRow>
            <MDBCol className='offset-md-1'>
              <Map
                center={coordinates(currentUser)}
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

const coordinates = (currentUser) =>{
  return (currentUser && currentUser.location && currentUser.location.coordinates
    && [currentUser.location.coordinates.latitude, currentUser.location.coordinates.longitude])
    || values.CURRENT_LOCATION;
};

export default connect(mapStateToProps, mapDispatchToProps)(NowPlayingMovies);
