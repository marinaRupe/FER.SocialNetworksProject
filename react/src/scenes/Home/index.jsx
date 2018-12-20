import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { APP } from '../../constants/routes';
import { Map, TileLayer} from 'react-leaflet';
import cinemaActions from '../../redux/actionCreators/cinemaActionCreator';
import CinemaMarker from '../../components/Home/CinemaMarker';
import { connect } from 'react-redux';
import * as values from '../../constants/values';

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

    this.setState({
      isLoading: false,
    });

  }

  renderCinemaMapWithMarkers = () => {
    const { isLoading } = this.state;
    const { cinemas } = this.props;

    if (isLoading) {
      return (
        <div className="cinema-list">
          Loading...
        </div>
      );
    }

    if (cinemas.length > 0) {
      return (
        <div className="cinema-list">
          <Map center={values.CURRENT_LOCATION} zoom='13' className='home-page__cinemas-map'>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {cinemas.map(c => <CinemaMarker cinema={c} />)}
          </Map>
        </div>
      );
    }

    return (
      <div className="cinema-list">
        Cinemas not found.
      </div>
    );
  }

  render() {
    return (
      <div className="home-page">
        {this.renderCinemaMapWithMarkers()}
        <button className='btn-primary'>
          <Link to={APP.PROFILE}>
            Profile
          </Link>
        </button>
        <button className='btn-primary'>
          <Link to={APP.MOVIE.POPULAR_MOVIES}>
            Most popular movies
          </Link>
        </button>
        <button className='btn-primary'>
          <Link to={APP.MOVIE.MOST_RATED_MOVIES}>
            Most rated movies
          </Link>
        </button>
      </div>
    );
  }
}
const mapStateToProps = state => {

  return {
    cinemas: state.cinemas.list
  };
};

export default  (connect(mapStateToProps)(Home));
