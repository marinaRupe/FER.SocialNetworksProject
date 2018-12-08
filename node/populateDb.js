const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const MovieService = require('./services/movie.service');
const tmdbService = require('./services/tmdb.service');
const omdbService = require('./services/omdb.service');
const expressConfig = require('./configuration/express.config');
const mongoConfig = require('./configuration/mongo.config');

const app = express();

expressConfig.initialize(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoConfig.configureDatabase(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

async function fetchMovies() {
  console.log('Started fetching movies...');

  console.log(`Page number: ${1}`);
  const response = (await tmdbService.fetchMovies(1)).data;
  const totalPages = 1; //response.total_pages;

  const movies = await tmdbService.getDetailedMovies(response.results);
  const expandedMovies = await omdbService.expandMovieList(movies);

  await MovieService.saveMovieList(expandedMovies);

  for (let page = 2; page <= totalPages; page++) {
    console.log(`Page number: ${page}`);
    const response = (await tmdbService.fetchMovies(page)).data;

    const movies = await tmdbService.getDetailedMovies(response.results);
    const expandedMovies = await omdbService.expandMovieList(movies);

    await MovieService.saveMovieList(expandedMovies);
  }

  console.log('Finished fetching movies!');
}

fetchMovies();

module.exports = app;