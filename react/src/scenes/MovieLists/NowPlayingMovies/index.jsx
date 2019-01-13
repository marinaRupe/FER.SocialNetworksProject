import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBContainer, MDBRow, MDBCol} from 'mdbreact';
import { FormControl } from 'react-bootstrap';
import { Map, TileLayer} from 'react-leaflet';
import DatePicker from 'react-datepicker';
import { buttonTypes } from '../../../enums/buttonTypes.enum';
import ButtonComponent from '../../../components/ButtonComponent';

import * as movieActions from '../../../redux/actions/movie.actions';
import * as cinemaActions from '../../../redux/actions/cinema.actions';

import MovieListItem from '../../../components/Movie/MovieListItem';
import CinemaMarker from '../../../components/Home/CinemaMarker';

import * as values from '../../../constants/values';

import { getBrowserLocation } from '../../../utils/location.utils';

class NowPlayingMovies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      userLocation: null,
      fromDate: null,
      toDate: null,
      selectedGenres: [],
    };
  }

  async componentDidMount() {
    const { getGenres } = this.props;
    await getGenres();

    this.fetchMovies();
  }

  fetchMovies = page => {
    this.setState({
      isLoading: true,
    }, async () => {
      const {
        fetchNowPlayingMovies,
        fetchCinemasByCenterLocation,
        currentUser,
      } = this.props;
      const { fromDate, toDate, selectedGenres } = this.state;
      const userLocation = await getLocation(currentUser);

      await fetchNowPlayingMovies(page, 15, fromDate, toDate, selectedGenres);
      await fetchCinemasByCenterLocation(userLocation);

      this.setState({
        isLoading: false,
        userLocation,
      });
    });
  }

  onFromDateChange = (date) => this.setState({ fromDate: date });

  onToDateChange = (date) => this.setState({ toDate: date });

  onGenreSelect = (e) => {
    const { selectedGenres } = this.state;
    e.preventDefault();
    const genre = e.target.value;
    if (selectedGenres.includes(genre)) {
      this.setState({ selectedGenres: selectedGenres.filter(_genre => _genre !== genre ) });
    } else {
      this.setState({ selectedGenres: [ ...selectedGenres, genre ] });
    }
  }

  search = () => {
    this.fetchMovies(1);
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
    const { genres } = this.props;
    const { fromDate, toDate, selectedGenres } = this.state;

    return (
      <div className='page'>
        <div className='movie-list__title'>Now playing movies</div>
        <MDBContainer>
          <MDBRow className='search__row mb-40'>
            <MDBCol sm='2'>
              <div>From date:</div>
              <DatePicker
                selected={fromDate}
                onChange={this.onFromDateChange}
                dateFormat='dd.MM.yyyy.'
              />
            </MDBCol>
            <MDBCol sm='2'>
              <div>To date:</div>
              <DatePicker
                selected={toDate}
                onChange={this.onToDateChange}
                dateFormat='dd.MM.yyyy.'
              />
            </MDBCol>
            <MDBCol sm='2'>
              <div>Genres:</div>
              <FormControl
                componentClass='select'
                placeholder='genres'
                multiple={true}
                rows={3}
                values={selectedGenres}
                className='search__multi-select'
              >
                {genres && genres.map(genre => (
                  <option
                    key={genre}
                    value={genre}
                    onClick={this.onGenreSelect}
                  >
                    {genre}
                  </option>
                ))}
              </FormControl>
            </MDBCol>
            <MDBCol sm='2'>
              <ButtonComponent
                action={this.search}
                text='Search'
                type={buttonTypes.primary}
                icon='search'
              />
            </MDBCol>
          </MDBRow>

          <MDBRow className='search__selected mb-40'>
            {
              (selectedGenres && selectedGenres.length > 0) &&
                <div>
                  <label>Selected genres:</label>
                  {selectedGenres.reduce((acc, curr) => (`${acc}, ${curr}`))}
                </div>
            }
            {selectedGenres.red}
          </MDBRow>

          <MDBRow className='mb-40'>
            <MDBCol md='6'>
              {this.renderMovieList()}
            </MDBCol>

            <MDBCol md='6'>
              {this.renderCinemaMapWithMarkers()}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
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
    genres: state.movies.genres,
  };
};

const mapDispatchToProps = {
  fetchNowPlayingMovies: movieActions.fetchNowPlayingMovies,
  fetchCinemasByCenterLocation: cinemaActions.fetchCinemasByCenterLocation,
  getGenres: movieActions.getGenres,
};

export default connect(mapStateToProps, mapDispatchToProps)(NowPlayingMovies);
