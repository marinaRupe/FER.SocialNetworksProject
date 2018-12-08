const axios = require('axios');

const OMDB_URL = `http://www.omdbapi.com/`;

const getMovieDetails = imdbMovieId => {
  const response = axios.get(`${OMDB_URL}?apikey=${process.env.OMDB_API_KEY}&i=${imdbMovieId}`);

  return response;
};

const mapMovieList = movieList => {
  const movies = [];

  // TODO: update according to the movie model
  for (const movie of movieList) {
    const newMovie = {
      title: movie.Title,
      releaseDate: movie.Released,
      year: movie.Year,
      plot: movie.Plot,
      genres: movie.Genre.split(',').map(genre => genre.trim().toLowerCase()),
      imdbID: movie.imdbID,
      actors: movie.Actors.split(',').map(actor => actor.trim().toLowerCase()),
      poster: movie.Poster,
      director: movie.Director,
      runtime: movie.Runtime.split()[0],
      languages: movie.Language.split(',').map(lang => lang.trim().toLowerCase()), // change to ISO
      website: movie.Website,
    };

    movies.push(newMovie);
  }

  return movies;
};

const expandMovieList = async movieList => {
  console.log('Expanding ' + movieList.length + ' movies...')
  return await Promise.all(movieList.map(expandMovie));
};

const expandMovie = async movie => {
  try {
    const omdbMovie = (await getMovieDetails(movie.imdbID)).data || {};

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
  } catch (err) {
    console.error(err);
    return movie;
  }
};

module.exports = {
  mapMovieList,
  expandMovieList
};