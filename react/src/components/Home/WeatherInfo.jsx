import React, { Component } from 'react';

class WeatherInfo extends Component {

  render() {
    const { weather } = this.props;

    return (

      <div>
        <div className='home-page__weather-info'>
          Current temperature: {weather.current_temperature}°C
        </div>
        <div className='home-page__weather-info'>
          Weather description: {weather.description}
        </div>
      </div>
    );
  }
}

export default WeatherInfo;
