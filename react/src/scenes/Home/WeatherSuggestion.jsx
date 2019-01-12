import React from 'react';
import { Link } from 'react-router-dom';
import { MDBRow, MDBCol } from 'mdbreact';

import CinemaMapWithMarkers from './CinemaMapWithMarkers';

import { APP } from '../../constants/routes';

const WeatherInfo = ({ weather }) => (
  <div className='home-page__weather-info'>
    {weather.currentTemperature}°C, {weather.description}
    <img
      src={`http://openweathermap.org/img/w/${weather.icon}.png`}
      alt=''
    />
  </div>
);

const WeatherSuggestion = ({ name, weather, cinemas, location }) => !weather || weather.isNice ? null : (
  <div className='home-page__cinemas-map--heading'>
    <WeatherInfo weather={weather} />
    {weather.isDangerous
      ? <div>
        <h2>Hi {name || 'there'}!</h2>
        <h5>
          Some extreme weather we're having, right?
        </h5>
        <h5>
          Best to stay at home and catch up with some{' '}
          <Link className='link' to={APP.MOVIE.PERSONAL.USER_SAVED_MOVIES}>movies you've been waiting to watch</Link>.
        </h5>
        <h5>
          We've also made a list of a couple of movies you might like{' '}
          <Link className='link' to={APP.MOVIE.PERSONAL.RECOMMENDED_MOVIES}>here</Link>.
        </h5>
      </div>
      : <MDBRow>
        <MDBCol md='6' className='home-page__weather-message'>
          <h2>Hi {name || 'there'}!</h2>
          <h5>
            The outside might not be fit for a walk in the park, but why not pick{' '}
            <Link className='link' to={APP.MOVIE.NOW_PLAYING_MOVIES}>a new movie</Link>{' '}
            and walk to one of the cinemas nearby.
          </h5>
        </MDBCol>
        <MDBCol md='6'>
          <CinemaMapWithMarkers
            cinemas={cinemas}
            location={location}
          />
        </MDBCol>
      </MDBRow>
    }
  </div>
);

export default WeatherSuggestion;
