const errors = require('restify-errors');
const MovieService = require('../services/movie.service');
const UserService = require('../services/user.service');
const defaultValues = require('../constants/defaultValues.constants');

const getMovieDetails = async (req, res) => {
  const { movieID } = req.params;

  if (!await MovieService.existsMovieWithImdbID(movieID)) {
    throw new errors.BadRequestError({
      info: {
        email: 'Movie with given IMDb ID does not exist.',
      },
    });
  }

  const movie = (await MovieService.getMovieWithImdbID(movieID));

  res.send(movie);
};

const getMostPopularMovies = async (req, res) => {
  const { page = 1, pageSize = defaultValues.DEFAULT_PAGE_SIZE } = req.query;

  const movies = await MovieService.getMoviesByPopularity(+page, +pageSize);
  const totalPages = Math.ceil(await MovieService.getMoviesCount() / pageSize);

  const data = { page: +page, totalPages, totalResults: movies.length, results: movies };

  res.send(data);
};

const getMostRatedMovies = async (req, res) => {
  const { page = 1, pageSize = defaultValues.DEFAULT_PAGE_SIZE } = req.query;

  const movies = await MovieService.getMoviesByImdbRating(+page, +pageSize);
  const totalPages = Math.ceil(
    await MovieService.getMoviesCount({ 'imdbRating': { '$nin': [null, 'N/A'] } }) / pageSize
  );

  const data = { page: +page, totalPages, totalResults: movies.length, results: movies };

  res.send(data);
};

const getRecommendedMovies = async (req, res) => {
  const { page = 1, pageSize = defaultValues.DEFAULT_PAGE_SIZE ,gender, age, userID} = req.query;

  const filter = await MovieService.makeFilter(gender, age, userID);

  let data = {};

  if (Object.keys(filter).length === 0){
    const movies = await MovieService.getMoviesByPopularity(+page, +pageSize);
    const totalPages = Math.ceil(await MovieService.getMoviesCount() / pageSize);

    data = { page: +page, totalPages, totalResults: movies.length, results: movies };

  }else {
    const movies = await MovieService.getMoviesByFilter(+page, +pageSize, filter);

    const totalPages = Math.ceil(
      await MovieService.getMoviesCount(filter) / pageSize
    );

    data = { page: +page, totalPages, totalResults: movies.length, results: movies };
  }
  res.send(data);
};

const getMoviesForSearch = async (req, res) => {
  const {
    page = 1,
    pageSize = defaultValues.DEFAULT_PAGE_SIZE,
    searchString = '',
    fromDate = 'null',
    toDate = 'null',
    genres = '[]',
  } = req.query;

  const { pagesCount, movies } = await MovieService.findMovies(
    {
      text: decodeURIComponent(searchString),
      fromDate: JSON.parse(decodeURIComponent(fromDate)),
      toDate: JSON.parse(decodeURIComponent(toDate)),
      genres: JSON.parse(decodeURIComponent(genres)),
    },
    +page,
    +pageSize
  );

  const data = { page: +page, totalPages: pagesCount, totalResults: movies.length, results: movies };
  res.send(data);
};

const getAllGenres = async (req, res) => {
  const data = await MovieService.getAllGenres();
  res.send(data);
};

const getUserWatchedMovies = async (req, res) => {
  const { page = 1, pageSize = defaultValues.DEFAULT_PAGE_SIZE, userID } = req.query;

  const watchedMoviesIDs = await UserService.getUserWatchedMovies(+page, +pageSize, userID);
  const watchedMovies = [];

  for (let i = 0; i < watchedMoviesIDs.length; i++) {
    watchedMovies[i] = (await MovieService.getMovieWithImdbID(watchedMoviesIDs[i]));
  }

  const totalPages = Math.ceil(watchedMoviesIDs.length / pageSize);
  const data = { page: +page, totalPages, totalResults: watchedMoviesIDs.length, results: watchedMovies };

  res.send(data);
};

const getUserSavedMovies = async (req, res) => {
  const { page = 1, pageSize = defaultValues.DEFAULT_PAGE_SIZE, userID } = req.query;

  const savedMoviesIDs = await UserService.getUserSavedMovies(+page, +pageSize, userID);
  const savedMovies = [];

  for (let i = 0; i < savedMoviesIDs.length; i++) {
    savedMovies[i] = (await MovieService.getMovieWithImdbID(savedMoviesIDs[i]));
  }

  const totalPages = Math.ceil(savedMoviesIDs.length / pageSize);
  const data = { page: +page, totalPages, totalResults: savedMoviesIDs.length, results: savedMovies };

  res.send(data);
};

const getUserRatedMovies = async (req, res) => {
  const { page = 1, pageSize = defaultValues.DEFAULT_PAGE_SIZE, userID } = req.query;
  const ratedMoviesList = await UserService.getUserRatedMovies(+page, +pageSize, userID);
  const ratedMovies = [];

  for (let i = 0; i < ratedMoviesList.length; i++) {
    const currentMovie = (await MovieService.getMovieWithImdbID(ratedMoviesList[i].movieId));
    currentMovie['score'] = ratedMoviesList[i].score;
    ratedMovies[i] = currentMovie;
  }

  const totalPages = Math.ceil(ratedMoviesList.length / pageSize);
  const data = { page: +page, totalPages, totalResults: ratedMoviesList.length, results: ratedMovies };
  res.send(data);
};

const deleteUserSavedMovie = async (req, res) => {
  const { userID, movieID } = req.query;
  const response = await UserService.deleteUserSavedMovie(userID, movieID);

  res.send(response);
};

const deleteUserWatchedMovie = async (req, res) => {
  const { userID, movieID } = req.query;
  const response = await UserService.deleteUserWatchedMovie(userID, movieID);
  res.send(response);
};

const deleteUserRatedMovie = async (req, res) => {
  const { userID, movieID } = req.query;
  const response = await UserService.deleteUserRatedMovie(userID, movieID);

  res.send(response);
};

const addUserSavedMovie = async (req, res) => {
  const { userID, movieID } = req.query;
  const response = await UserService.addUserSavedMovie(userID, movieID);

  res.send(response);
};

const addUserWatchedMovie = async (req, res) => {
  const { userID, movieID } = req.query;
  const response = await UserService.addUserWatchedMovie(userID, movieID);

  res.send(response);
};

const addUserRatedMovie = async (req, res) => {
  const { userID, movieID, score } = req.query;

  const response = await UserService.addUserRatedMovie(userID, movieID, score);

  res.send(response);
};

module.exports = {
  getMostPopularMovies,
  getMostRatedMovies,
  getRecommendedMovies,
  getMoviesForSearch,
  getAllGenres,
  getUserWatchedMovies,
  getUserSavedMovies,
  getUserRatedMovies,
  getMovieDetails,
  deleteUserSavedMovie,
  deleteUserWatchedMovie,
  deleteUserRatedMovie,
  addUserSavedMovie,
  addUserRatedMovie,
  addUserWatchedMovie,
};
