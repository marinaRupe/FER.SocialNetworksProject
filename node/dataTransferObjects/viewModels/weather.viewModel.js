class WeatherViewModel {
  constructor(weather_data) {
    this.current_temperature = weather_data.main.temp;
    this.description = weather_data.weather.map(x => x.description).join(',');
  }
}

module.exports = WeatherViewModel;
