/* eslint-disable */
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const MovieService = require('./services/movie.service');
const tmdbService = require('./services/tmdb.service');
const expressConfig = require('./configuration/express.config');
const mongoConfig = require('./configuration/mongo.config');
const axios = require('axios');

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


////////////////////////////////////////////////////////////////////////////////////////////
// API KEYS

const tmdbApiKeys = [
  process.env.TMDB_API_KEY,
  process.env.TMDB_API_KEY2,
  process.env.TMDB_API_KEY3,
];

const omdbApiKeys = [
  process.env.OMDB_API_KEY0,
  process.env.OMDB_API_KEY1,
  process.env.OMDB_API_KEY2,
  process.env.OMDB_API_KEY3,
  process.env.OMDB_API_KEY4,
  process.env.OMDB_API_KEY5,
  process.env.OMDB_API_KEY6,
  process.env.OMDB_API_KEY7,
  process.env.OMDB_API_KEY8,
  process.env.OMDB_API_KEY9,
  process.env.OMDB_API_KEY10,
  process.env.OMDB_API_KEY11,
  process.env.OMDB_API_KEY12,
  process.env.OMDB_API_KEY13,
  process.env.OMDB_API_KEY14,
  process.env.OMDB_API_KEY15,
  process.env.OMDB_API_KEY16,
  process.env.OMDB_API_KEY17,
  process.env.OMDB_API_KEY18,
  process.env.OMDB_API_KEY19,
  process.env.OMDB_API_KEY20,
  process.env.OMDB_API_KEY21,
  process.env.OMDB_API_KEY22,
  process.env.OMDB_API_KEY23,
  process.env.OMDB_API_KEY24,
  process.env.OMDB_API_KEY25,
  process.env.OMDB_API_KEY26,
  process.env.OMDB_API_KEY27,
  process.env.OMDB_API_KEY28,
  process.env.OMDB_API_KEY29,
  process.env.OMDB_API_KEY30,
  process.env.OMDB_API_KEY31,
  process.env.OMDB_API_KEY32,
  process.env.OMDB_API_KEY33,
  process.env.OMDB_API_KEY34,
  process.env.OMDB_API_KEY35,
  process.env.OMDB_API_KEY36,
  process.env.OMDB_API_KEY37,
  process.env.OMDB_API_KEY38,
  process.env.OMDB_API_KEY39,
  process.env.OMDB_API_KEY40,
];

let CURRENT_TMDB_API_KEY_INDEX = 0;
let CURRENT_OMDB_API_KEY_INDEX = 1;

const changeTmdbApiKey = () => {
  CURRENT_TMDB_API_KEY_INDEX = (CURRENT_TMDB_API_KEY_INDEX + 1) % tmdbApiKeys.length;
};

const changeOmdbApiKey = () => {
  CURRENT_OMDB_API_KEY_INDEX = (CURRENT_OMDB_API_KEY_INDEX + 1) % omdbApiKeys.length;
};

////////////////////////////////////////////////////////////////////////////////////////////


// TMDB

const MOVIE_API_URL = 'https://api.themoviedb.org/3';
const DISCOVER_MOVIE_URL = '/discover/movie/';

const getMovieDetailsTmdb = async tmdbMovieId => {
  const apiKey = process.env.TMDB_API_KEY2;
  const response = axios.get(`${MOVIE_API_URL}/movie/${tmdbMovieId}`, {
    params: {
      'api_key': apiKey,
    }
  });

  return response;
};

const getDetailedMovies = async movieList => {
  console.info('Fetching movie details...');
  const movies = [];
  for (const movie of movieList) {
    if (await MovieService.existsMovieWithTmdbID(movie.id)) {
      const movieWithDetails = await MovieService.getMovieWithTmdbID(movie.id);
      movies.push(movieWithDetails.toObject());
    } else {
      const movieWithDetailsResponse = await getMovieDetailsTmdb(movie.id);
    
      if (movieWithDetailsResponse.status === 200) {
        const movieWithDetails = await tmdbService.mapMovie(movieWithDetailsResponse.data);
        movies.push(movieWithDetails);
      } else {
        console.error(movieWithDetailsResponse.message);
      }
    }
  }

  return movies;
};

const fetchMovieList = (page = 1) => {
  console.info('Fetching movies...');
  const apiKey = process.env.TMDB_API_KEY2;
  const response = axios.get(`${MOVIE_API_URL}${DISCOVER_MOVIE_URL}`, {
    params: {
      'api_key': apiKey,
      'sort_by': 'release_date.desc',
      'release_date.lte': '2010-09-10',
      page
    }
  });

  return response;
};

const fetchTopRatedMovieList = (page = 1) => {
  console.info('Fetching movies...');
  const apiKey = process.env.TMDB_API_KEY2;
  const response = axios.get(`${MOVIE_API_URL}/movie/top_rated`, {
    params: {
      'api_key': apiKey,
      page
    }
  });

  return response;
};

////////////////////////////////////////////////////////////////////////////////////

// OMDB

const OMDB_URL = 'http://www.omdbapi.com/';

const getMovieDetailsOmdb = imdbMovieId => {
  const apiKey = omdbApiKeys[CURRENT_OMDB_API_KEY_INDEX];
  const response = axios.get(`${OMDB_URL}?apikey=${apiKey}&i=${imdbMovieId}`);
  return response;
};

const expandMovieList = async movieList => {
  console.info(`Expanding ${movieList.length} movies...`);
  return await Promise.all(movieList.map(async movie => await expandMovie(movie)));
};

const expandMovie = async movie => {
  if (!movie.imdbID) {
    console.info(`Missing IMDB ID - could not expand with OMDB data. TMDB ID of movie is: ${movie.tmdbID}.
      Fields will remain undefined.`);
    return movie;
  }
  if (movie.imdbRating) {
    console.info(`Skipping expanding for imdb ID ${movie.imdbID}`);
    return movie;
  }

  let omdbMovie = null;
  try {
    const response = (await getMovieDetailsOmdb(movie.imdbID)).data;

    if (response.Response && response.Response === 'False') {
      throw new Error(response.Error);
    }

    omdbMovie = response;
  } catch (err) {
    console.info(err.message);
    if (err.message.includes('code 401')) {
      changeOmdbApiKey();
      console.info(`\tNew API key index: ${CURRENT_OMDB_API_KEY_INDEX}`);
    }
  }
  if (omdbMovie === null) {
    console.info(`Error while expanding movie with IMDB ID ${movie.imdbID} with OMDB data.
      Fields will remain undefined.`);
    return movie;
  }

  const newGenres = (omdbMovie.Genre ? omdbMovie.Genre.split(',') : [])
    .map(genre => genre.trim().toLowerCase())
    .filter(genre => !movie.genres.includes(genre));

  const ratingsObject = omdbMovie.Ratings ? {
    imdbRating: (omdbMovie.Ratings.find(rating => rating.Source === 'Internet Movie Database') || {}).Value,
    metascore: (omdbMovie.Ratings.find(rating => rating.Source === 'Metacritic') || {}).Value,
    rottenTomatoesRating: (omdbMovie.Ratings.find(rating => rating.Source === 'Rotten Tomatoes') || {}).Value,
  } : {};
  ratingsObject.imdbRating = ratingsObject.imdbRating ? ratingsObject.imdbRating.split('/')[0] : null;
  ratingsObject.metascore = ratingsObject.metascore ? ratingsObject.metascore.split('/')[0] : null;
  ratingsObject.rottenTomatoesRating = ratingsObject.rottenTomatoesRating || null;

  const newMovie = {
    ...movie,

    plot: movie.plot || omdbMovie.Plot || null,
    genres: [...movie.genres, ...newGenres],

    poster: movie.poster || omdbMovie.Poster || null,
    website: movie.website || omdbMovie.Website || null,

    runtime: movie.runtime || omdbMovie.Runtime || null,

    imdbRating: omdbMovie.imdbRating || ratingsObject.imdbRating,
    metascore: omdbMovie.Metascore || ratingsObject.metascore,
    rottenTomatoesRating: ratingsObject.rottenTomatoesRating,
    awards: omdbMovie.Awards || null,

    rated: omdbMovie.Rated || null,
  };

  return newMovie;
};

//////////////////////////////////////////////////////////////////////////////////////

async function fetchMovies() {
  console.info('Started fetching movies...');
  const startPage = 1;

  console.info(`Page number: ${startPage}`);

  let totalPages;
  const maxPages = 1000; // constraint from TMDb API

  try {
    const response = (await fetchTopRatedMovieList(startPage)).data;
    //const response = (await fetchMovieList(startPage)).data;
    totalPages = response.total_pages;

    const movies = await getDetailedMovies(response.results);
    const expandedMovies = await expandMovieList(movies);

    await MovieService.saveMovieList(expandedMovies);
  } catch (err) {
    console.info(err.message);
  }
  
  for (let page = startPage + 1; page <= maxPages; page++) {
    try{
      console.info(`\nPage number: ${page}/${totalPages}`);
      const response = (await fetchTopRatedMovieList(page)).data;
      //const response = (await fetchMovieList(page)).data;
  
      const movies = await getDetailedMovies(response.results);
      const expandedMovies = await expandMovieList(movies);
  
      await MovieService.saveMovieList(expandedMovies);
    } catch (err) {
      console.info(err.message);
      continue;
    }
  }

  console.info('Finished fetching movies!');
  process.exit(0);
}

async function fetchMoviesByTmdbId() {
  console.info('Started fetching movies by TMDb ID...');
  const startId = 400000;
  const maxId = 800000;

  for (let tmdbId = startId; tmdbId <= maxId; tmdbId++) {
    if (await MovieService.existsMovieWithTmdbID(tmdbId)) {
      try {
        console.info(`The movie with tmdbID: ${tmdbId} already exists!`);
        let movieWithDetails = await MovieService.getMovieWithTmdbID(tmdbId);
        movieWithDetails = await expandMovie(movieWithDetails.toObject());

        try {
          await MovieService.updateMovie(movieWithDetails);
          console.info(`The movie with imdb ID ${movieWithDetails.imdbID} is updated (tmdbID: ${movieWithDetails.tmdbID})!`);
        } catch (err) {
          console.info(`The movie with imdb ID ${movieWithDetails.imdbID} is NOT updated (tmdbID: ${movieWithDetails.tmdbID})!`);
          console.info(err.message);
        }
      } catch (err) {
        console.info(err.message);
      }
      
    } else {
      try {
        const movieWithDetailsResponse = await getMovieDetailsTmdb(tmdbId);

        if (movieWithDetailsResponse.status === 200) {
          let movieWithDetails;
          try {
            movieWithDetails = await tmdbService.mapMovie(movieWithDetailsResponse.data);
            movieWithDetails = await expandMovie(movieWithDetails);
          } catch(err) {
            console.info(`Error: The movie with tmdbID: ${tmdbId} is not mapped!`);
            console.info(err.message);
            continue;
          }
          
          try {
            await MovieService.saveMovie(movieWithDetails);
            console.info(`The movie with imdb ID ${movieWithDetails.imdbID} is saved (tmdbID: ${movieWithDetails.tmdbID})!`);
          } catch (err) {
            console.info(`The movie with imdb ID ${movieWithDetails.imdbID} is NOT saved (tmdbID: ${movieWithDetails.tmdbID})!`);
            console.info(err.message);
          }
        } else {
          console.info(`The movie with tmdbID: ${tmdbId} is does not exist!`);
          console.info(movieWithDetailsResponse.message);
        }
      } catch(err) {
        console.info(`Error: The movie with tmdbID: ${tmdbId} is does not exist!`);
      }
    }
  }

  console.info('Finished fetching movies by TMDb ID!');
  process.exit(0);
}

async function updateFromDb() {
  const totalCount = await MovieService.getMoviesCount({ 'awards': null });
  const pageSize = 40;
  const pagesCount = Math.floor(totalCount / pageSize);

  const startPage = 1;

  for (let page = startPage; page <= pagesCount; page++) {
    try {
      console.info(`Updating ${page}/${pagesCount} (total movies: ${totalCount})`);
      const movies = await MovieService.getMoviesWithNoOmdbData(page);
      const expandedMovies = await expandMovieList(movies.map(m => m.toObject()));
  
      await MovieService.saveMovieList(expandedMovies);
    } catch (err) {
      console.info(err.message);
    }
  }

  console.info('Finished updating movies!');
}

////////////////////////////////////////////////////////////////////////////////////////////

//fetchMovies();
fetchMoviesByTmdbId();
//updateFromDb();

////////////////////////////////////////////////////////////////////////////////////////////

module.exports = app;
