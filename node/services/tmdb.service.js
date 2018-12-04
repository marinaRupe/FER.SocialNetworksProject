const axios = require('axios');
const MovieService = require('../services/movie.service');

const MOVIE_API_URL = 'https://api.themoviedb.org/3';
const DISCOVER_MOVIE_URL = '/discover/movie/';

const getMovieDetails = async tmdbMovieId => {
  const response = axios.get(`${MOVIE_API_URL}/movie/${tmdbMovieId}`, {
    params: {
      'api_key': process.env.TMDB_API_KEY,
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
      movies.push(movieWithDetails);
    } else {
      const movieWithDetailsResponse = await getMovieDetails(movie.id);
    
      if (movieWithDetailsResponse.status === 200) {
        const movieWithDetails = mapMovie(movieWithDetailsResponse.data);
        movies.push(movieWithDetails);
      } else {
        console.error(movieWithDetailsResponse.message);
      }
    }
  }

  return movies;
};

const getMostPopularMovies = async (page = 1) => {
  console.info('Fetching most popular movies...');
  const response = axios.get(`${MOVIE_API_URL}${DISCOVER_MOVIE_URL}`, {
    params: {
      'api_key': process.env.TMDB_API_KEY,
      'sort_by': 'popularity.desc',
      page
    }
  });

  return response;
};

const getMostRatedMovies = async (page = 1) => {
  const response = axios.get(`${MOVIE_API_URL}${DISCOVER_MOVIE_URL}`, {
    params: {
      'api_key': process.env.TMDB_API_KEY,
      'sort_by': 'vote_average.desc',
      page
    }
  });

  return response;
};

const saveMovieList = async movies => {
  console.info('Saving movies...');

  for (const movie of movies) {
    if (!(await MovieService.existsMovieWithImdbID(movie.imdbID))) {
      await MovieService.saveMovie(movie);
      console.info(`The movie with imdb ID ${movie.imdbID} is saved!`);
    }
  }
};

const mapMovieList = movieList => {
  const movies = [];

  for (const movie of movieList) {
    const newMovie = mapMovie(movie);

    movies.push(newMovie);
  }

  return movies;
};

const mapMovie = movie => {
  const defaultPosterSize = 'w500';

  const newMovie = {
    imdbID: movie.imdb_id,
    tmdbID: movie.id,
    title: movie.title,
    year: new Date(movie.release_date).getFullYear(),
    releaseDate: movie.release_date,
    plot: movie.overview,
    genres: movie.genres.map(genre => genre.name.trim().toLowerCase()),
    actors: [],
    poster: `http://image.tmdb.org/t/p/${defaultPosterSize}${movie.poster_path}`,
    director: undefined,
    runtime: movie.runtime,
    languages: movie.spoken_languages.map(lang => lang.iso_639_1),
    website: movie.homepage,
    tmdbPopularity: movie.popularity,
  };

  return newMovie;
};

module.exports = {
  getMovieDetails,
  getDetailedMovies,
  getMostPopularMovies,
  getMostRatedMovies,
  mapMovieList,
  saveMovieList,
};