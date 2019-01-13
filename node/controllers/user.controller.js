const errors = require('restify-errors');
const UserService = require('../services/user.service');
const settings = require('../constants/constraints.constants');
const UserLoginViewModel = require('../dataTransferObjects/viewModels/userLogin.viewModel');
const MovieStatusViewModel = require('../dataTransferObjects/viewModels/movieStatus.viewModel');

const loginWithFacebook = async (req, res) => {
  const { user } = req.body;
  const {
    userID,
    email,
    token,
    firstName,
    lastName,
    name,
    picture,
    ageRange,
    gender,
    location,
    likedPages,
  } = user;

  if (!email.match(settings.EMAIL_REGEX)) {
    throw new errors.BadRequestError({
      info: {
        email: 'Email is invalid.',
      },
    });
  }

  if (!await UserService.existsUserId(userID)) {
    await UserService.createUser(
      userID, email, token, firstName, lastName, name, picture, ageRange, gender, location, likedPages);
  }

  res.json(new UserLoginViewModel(user));
};

const getMovieStatus = async (req, res) => {
  const { userID, movieID } = req.params;

  if (!await UserService.existsUserId(userID)) {
    throw new errors.BadRequestError({
      info: {
        userID: 'User with given ID does not exist.',
      },
    });
  }

  const { watchedMovies, savedMovies, ratedMovies } = (await UserService.getUserMovieLists(userID)).userMovies;

  const isWatched = watchedMovies.includes(movieID);
  const isSaved = savedMovies.includes(movieID);

  const movieIndex = ratedMovies.findIndex(m => m.movieId === movieID);
  const isRated = movieIndex >= 0;
  const rating = isRated ? ratedMovies[movieIndex].score : null;

  const movieStatusForUser = {
    isWatched,
    isSaved,
    isRated,
    rating,
  };

  res.json(new MovieStatusViewModel(movieStatusForUser));
};

const addPreferredGenres = async (req, res) => {
  const { userID , genres} = req.params;
  const response = await UserService.addPreferredGenres(userID, genres.split(','));

  res.send(response);
};

const getPreferredGenres = async (req, res) => {
  const { userID } = req.params;
  const response = await UserService.getPreferredGenres(userID);

  res.send(response);
};

module.exports = {
  loginWithFacebook,
  getMovieStatus,
  addPreferredGenres,
  getPreferredGenres,
};
