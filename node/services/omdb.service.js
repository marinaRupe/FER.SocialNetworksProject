const OMDB_URL = 'http://www.omdbapi.com/';

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

module.exports = {
  mapMovieList,
};