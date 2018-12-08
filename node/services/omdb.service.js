const OMDB_URL = `http://www.omdbapi.com/?apikey=${process.env.}`;

const getMovieDetails = async imdbMovieId => {
  const response = axios.get(`${OMDB_URL}&i=${imdbMovieId}`);

  return response;
};

const mapMovieList = movieList => {
  const movies = [];

  for (const movie of movieList) {
    const newMovie = {
      title: movie.Title,
      releaseDate: movie.Released,
      year: movie.Year,
      plot: movie.Plot,
      genres: movie.Genre.split(',').map(genre => genre.trim().toLowerCase()),
      imdbID: movie.imdbID,
      actors: movie.Actors.split(',').map(actor => actor.trim().toLowerCase()),
      poster: movie.poster,
      director: movie.Director,
      runtime: movie.Runtime.split()[0],
      languages: movie.Language.split(',').map(lang => lang.trim().toLowerCase()), // change to ISO
      website: movie.Website,
    };

    movies.push(newMovie);
  }

  return movies;
};

const expandMovieList = async movieList => await Promise.all(movieList.map(expandMovie));

const expandMovie = async movie => {
  const omdbMovie = await getMovieDetails(movie.imdbID);

  const newGenres = omdbMovie.Genre.split(',')
    .map(genre => genre.trim().toLowerCase())
    .filter(genre => !movie.genres.includes(genre));

  const ratingsObject = {
    imdbRating: (omdbMovie.Ratings.find(rating => rating.Source === 'Internet Movie Database') || {}).Value,
    metascore: (omdbMovie.Ratings.find(rating => rating.Source === 'Metacritic') || {}).Value,
    rottenTomatoesRating: (omdbMovie.Ratings.find(rating => rating.Source === 'Rotten Tomatoes') || {}).Value,
  }
  ratingsObject.imdbRating = ratingsObject.imdbRating ? ratingsObject.imdbRating.split('/')[0] : null;
  ratingsObject.metascore = ratingsObject.metascore ? ratingsObject.metascore.split('/')[0] : null;
  ratingsObject.rottenTomatoesRating = ratingsObject.rottenTomatoesRating || null;

  const newMovie = {
    ...movie,
    plot: movie.plot || omdbMovie.Plot,
    genres: [...movie.genres, ...newGenres],
    imdbRating: omdbMovie.imdbRating || ratingsObject.imdbRating,
    metascore: omdbMovie.Metascore || ratingsObject.metascore,
    rottenTomatoesRating: ratingsObject.rottenTomatoesRating,
  }

  return newMovie;
}

module.exports = {
  mapMovieList,
  expandMovieList
};