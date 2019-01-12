class WeatherViewModel {
  constructor(weatherData) {
    this.currentTemperature = Math.round(weatherData.main.temp);
    this.description = weatherData.weather.map(w => w.description).join(',');

    // list of weather conditions: https://openweathermap.org/weather-conditions
    this.isThunderstorm = weatherData.weather.some(w => w.id >= 200 && w.id < 300);
    this.isDrizzle = weatherData.weather.some(w => w.id >= 300 && w.id < 400);
    this.isRain = weatherData.weather.some(w => w.id >= 500 && w.id < 600);
    this.isSnow = weatherData.weather.some(w => w.id >= 600 && w.id < 700);
    this.isAtmosphere = weatherData.weather.some(w => w.id >= 700 && w.id < 800);
    this.isClear = weatherData.weather.some(w => w.id === 800);
    this.isCloudy = weatherData.weather.some(w => w.id > 800 && w.id < 900);

    this.isNice = !this.isThunderstorm && !this.isDrizzle && !this.isRain && !this.isSnow && !this.isAtmosphere;
    this.isDangerous = this.isAtmosphere || this.isThunderstorm
      || weatherData.weather.some(w => w.description.includes('extreme') || w.description.includes('freezing'));

    this.icon = (weatherData.weather[0] || {}).icon;
  }
}

module.exports = WeatherViewModel;
