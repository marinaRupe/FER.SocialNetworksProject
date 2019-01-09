const errors = require('restify-errors');
const MovieService = require('../services/movie.service');
const UserService = require('../services/user.service');
const defaultValues = require('../constants/defaultValues.constants');

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
  const { page = 1, pageSize = defaultValues.DEFAULT_PAGE_SIZE ,gender, age, likes} = req.query;

  const filter = MovieService.makeFilter(gender, age, likes);
  const movies = await MovieService.getMoviesByFilter(+page, +pageSize, filter);

  const totalPages = Math.ceil(
    await MovieService.getMoviesCount(filter) / pageSize
  );

  const data = { page: +page, totalPages, totalResults: movies.length, results: movies };

  res.send(data);
};

const getUserWatchedMovies= async (req, res) => {
  const { page = 1, pageSize = defaultValues.DEFAULT_PAGE_SIZE, userID } = req.query;

  //console.log("backend user id: " + userID);

  const watchedMoviesIDs = await UserService.getUserWatchedMovies(+page, +pageSize, userID);
  let watchedMovies = [];

  for(let i=0; i<watchedMoviesIDs.length;i++){
    watchedMovies[i]=(await MovieService.getMovieWithImdbID(watchedMoviesIDs[i]));
  }

  const totalPages = Math.ceil(await MovieService.getMoviesCount() / pageSize);
  const data = { page: +page, totalPages, totalResults: watchedMoviesIDs.length, results: watchedMovies };

  res.send(data);
};

const getUserSavedMovies= async (req, res) => {

  const { page = 1, pageSize = defaultValues.DEFAULT_PAGE_SIZE, userID } = req.query;

  const savedMoviesIDs = await UserService.getUserSavedMovies(+page, +pageSize, userID);
  let savedMovies = [];

  for(let i=0; i<savedMoviesIDs.length;i++){
    savedMovies[i]=(await MovieService.getMovieWithImdbID(savedMoviesIDs[i]));
  }

  const totalPages = Math.ceil(await MovieService.getMoviesCount() / pageSize);
  const data = { page: +page, totalPages, totalResults: savedMoviesIDs.length, results: savedMovies };

  res.send(data);
};

const getUserRatedMovies= async (req, res) => {
  const { page = 1, pageSize = defaultValues.DEFAULT_PAGE_SIZE, userID } = req.query;

  const ratedMoviesList = await UserService.getUserRatedMovies(+page, +pageSize, userID);
  const ratedMovies = [];


  for(let i=0; i<ratedMoviesList.length; i++){
    let currentMovie= (await MovieService.getMovieWithImdbID(ratedMoviesList[i].movieId));

    currentMovie['score'] = ratedMoviesList[i].score;
    console.log('currentMovie ocjena je: ' + currentMovie.score);
    ratedMovies[i]=currentMovie;

    // TODO ne vraca atribut score
  }

  const totalPages = Math.ceil(await MovieService.getMoviesCount() / pageSize);
  const data = { page: +page, totalPages, totalResults: ratedMoviesList.length, results: ratedMovies };
  res.send(data);
};

const deleteUserSavedMovie= async (req, res) => {
  const { userID, movieID } = req.query;
  console.log(userID, movieID);
  const response = await UserService.deleteUserSavedMovie(userID,movieID);

  res.send(response);
};

const deleteUserWatchedMovie= async (req, res) => {
  const { userID, movieID } = req.query;
  const response = await UserService.deleteUserWatchedMovie(userID,movieID);
  res.send(response);
};

const deleteUserRatedMovie= async (req, res) => {
  const { userID, movieID } = req.query;
  const response = await UserService.deleteUserRatedMovie(userID,movieID);

  res.send(response);
};

const addUserSavedMovie= async (req, res) => {
  const { userID, movieID } = req.query;
  console.log(userID, movieID);
  const response = await UserService.addUserSavedMovie(userID,movieID);

  res.send(response);
};

const addUserWatchedMovie= async (req, res) => {
  const { userID, movieID } = req.query;
  console.log(userID, movieID);
  const response = await UserService.addUserWatchedMovie(userID,movieID);

  res.send(response);
};

const addUserRatedMovie= async (req, res) => {
  const { userID, movieID , score } = req.query;
  console.log(userID, movieID, score);
  const response = await UserService.addUserRatedMovie(userID,movieID,score);

  res.send(response);
};

module.exports = {
  getMostPopularMovies,
  getMostRatedMovies,
  getRecommendedMovies,
  getUserWatchedMovies,
  getUserSavedMovies,
  getUserRatedMovies,
  deleteUserSavedMovie,
  deleteUserWatchedMovie,
  deleteUserRatedMovie,
  addUserSavedMovie,
  addUserRatedMovie,
  addUserWatchedMovie,
};
