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
        Movie.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .sort({ 'tmdbPopularity' : 'desc' })
            .exec()

);

const getUserSavedMovies = async (page, pageSize = defaultValues.DEFAULT_PAGE_SIZE, userID) => (
    await
        Movie.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .sort({ 'tmdbPopularity' : 'desc' })
            .exec()
);

const getUserRatedMovies = async (page, pageSize = defaultValues.DEFAULT_PAGE_SIZE, userID) => (
    await
        Movie.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .sort({ 'tmdbPopularity' : 'desc' })
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
