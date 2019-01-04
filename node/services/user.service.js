const errors = require('restify-errors');
const User = require('../models/user.model');
const Movie = require('../models/movie.model');
const defaultValues = require('../constants/defaultValues.constants');

const findByEmail = async email => {
  const user = await User.findOne({ email }).exec();
  if (!user) {
    throw new errors.NotFoundError();
  }

  return user;
};

const findByToken = async (token) => {
  const user = await User.findOne({ token }).exec();
  if (!user) {
    throw new errors.UnauthorizedError();
  }

  return user;
};

const findAll = async () => User.find().exec();

const addNewUser = (email, password, firstName, lastName, name) => {
  const user = new User({
    email,
    firstName,
    lastName,
    name,
  });

  user.setPassword(password);
  user.setToken();

  return user;
};

const add = async (email, password, firstName, lastName, name) => {
  const user = addNewUser(email, password, firstName, lastName, name);

  await user.save();

  return user;
};

const createUser = async (
  userID, email, token, firstName, lastName, name, picture, birthday, ageRange, gender, location, likedPages) => {
  const user = new User({
    userID,
    email,
    firstName,
    lastName,
    name,
    token,
    picture,
    birthday,
    ageRange,
    gender,
    location,
    likedPages,
  });

  await user.save();

  return user;
};

const existsEmail = async email => (await User.countDocuments({ email })) > 0;

const existsUserId = async userID => (await User.countDocuments({ userID })) > 0;

const changePassword = async (user, newPassword) => {
  user.setPassword(newPassword);
  user.setToken();

  return User.findByIdAndUpdate(user._id, user, { new: true });
};


const updateUser = async (user, id) => await User.findByIdAndUpdate(
  id, user, { new: true },
).exec();

const deleteUser = async email => await User.deleteOne({ email });


const getUserWatchedMovies = async (page, pageSize = defaultValues.DEFAULT_PAGE_SIZE, userID) => (
  await
  User.findOne({'userID':userID},{'userMovies.watchedMovies':1})
    .map(function (user) {
      let watchedMovies = user.userMovies.watchedMovies;

      let jumpOver = (page - 1) * pageSize;

      if(watchedMovies.length >= jumpOver){
        watchedMovies = watchedMovies.slice(jumpOver, watchedMovies.length);
      }

      watchedMovies = watchedMovies.slice(0, pageSize);

      return watchedMovies;
    })
    .exec()
);

const getUserSavedMovies = async (page, pageSize = defaultValues.DEFAULT_PAGE_SIZE, userID) => (
  await
  User.findOne({'userID':userID},{'userMovies.savedMovies':1})
    .map(function (user) {
      let savedMovies = user.userMovies.savedMovies;

      let jumpOver = (page - 1) * pageSize;

      if(savedMovies.length >= jumpOver){
        savedMovies = savedMovies.slice(jumpOver, savedMovies.length);
      }

      savedMovies = savedMovies.slice(0, pageSize);

      return savedMovies;
    })
    .exec()
);

const getUserRatedMovies = async (page, pageSize = defaultValues.DEFAULT_PAGE_SIZE, userID) => (
  await
  User.findOne({'userID':userID},{'userMovies.ratedMovies':1})
    .map(function (user) {
      let ratedMovies = user.userMovies.ratedMovies;

      let jumpOver = (page - 1) * pageSize;

      if(ratedMovies.length >= jumpOver){
        ratedMovies = ratedMovies.slice(jumpOver, ratedMovies.length);
      }

      ratedMovies = ratedMovies.slice(0, pageSize);

      return ratedMovies;
    })
    .exec()
);

module.exports = {
  findByEmail,
  findByToken,
  findAll,
  add,
  createUser,
  existsEmail,
  changePassword,
  updateUser,
  deleteUser,
  existsUserId,
  getUserRatedMovies,
  getUserSavedMovies,
  getUserWatchedMovies,
};
