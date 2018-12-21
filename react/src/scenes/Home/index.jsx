import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { APP } from '../../constants/routes';
import { Map, TileLayer} from 'react-leaflet';
import cinemaActions from '../../redux/actionCreators/cinemaActionCreator';
import weatherActions from '../../redux/actionCreators/weatherActionCreator';
import appInfoActions from '../../redux/actionCreators/appInfoActionCreator';
import CinemaMarker from '../../components/Home/CinemaMarker';
import WeatherInfo from '../../components/Home/WeatherInfo';
import AppInfo from '../../components/Home/AppInfo';
import { connect } from 'react-redux';
import * as values from '../../constants/values';
import { MDBContainer, MDBRow, MDBCol} from 'mdbreact';

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

  renderWeatherInfo = () => {
    const { weather } = this.props;

    if (weather != null) {
      return (
        <WeatherInfo weather={weather}></WeatherInfo>
      );
    }
  }

  renderAppInfo = () => {
    const { info } = this.props;

    if (info != null) {
      return (
        <AppInfo info={info}></AppInfo>
      );
    }
  }

  render() {
    return (
      <div className="home-page">
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              {this.renderAppInfo()}
            </MDBCol>
            <MDBCol>
              {this.renderWeatherInfo()}
              {this.renderCinemaMapWithMarkers()}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
const mapStateToProps = state => {

  return {
    cinemas: state.cinemas.list,
    weather: state.weather.current,
    info: state.app.info
  };
};

export default  (connect(mapStateToProps)(Home));
