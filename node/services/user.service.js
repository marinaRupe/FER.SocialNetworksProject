const errors = require('restify-errors');
const User = require('../models/user.model');
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
    userMovies: {
      watchedMovies: [],
      ratedMovies: [],
      savedMovies: [],
    },
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
  await User.findOne({ 'userID': userID }, { 'userMovies.watchedMovies': 1 })
    .map((user) => {
      let { watchedMovies } = user.userMovies;

      const jumpOver = (page - 1) * pageSize;

      if (watchedMovies.length >= jumpOver){
        watchedMovies = watchedMovies.slice(jumpOver, watchedMovies.length);
      }

      watchedMovies = watchedMovies.slice(0, pageSize);

      return watchedMovies;
    })
    .exec()
);

const getUserSavedMovies = async (page, pageSize = defaultValues.DEFAULT_PAGE_SIZE, userID) => (
  await User.findOne({'userID':userID},{'userMovies.savedMovies':1})
    .map((user) => {
      let { savedMovies } = user.userMovies;

      const jumpOver = (page - 1) * pageSize;

      if(savedMovies.length >= jumpOver){
        savedMovies = savedMovies.slice(jumpOver, savedMovies.length);
      }

      savedMovies = savedMovies.slice(0, pageSize);

      return savedMovies;
    })
    .exec()
);

const getUserRatedMovies = async (page, pageSize = defaultValues.DEFAULT_PAGE_SIZE, userID) => (
  await User.findOne({ 'userID': userID }, { 'userMovies.ratedMovies': 1 })
    .map((user) => {
      let { ratedMovies } = user.userMovies;

      const jumpOver = (page - 1) * pageSize;

      if (ratedMovies.length >= jumpOver) {
        ratedMovies = ratedMovies.slice(jumpOver, ratedMovies.length);
      }

      ratedMovies = ratedMovies.slice(0, pageSize);

      return ratedMovies;
    })
    .exec()
);

const deleteUserSavedMovie = async (userID, movieID) => {

  const user = await User.findOne({'userID':userID},{'userMovies.savedMovies':1});
  let savedMovies = user.userMovies.savedMovies;
  console.log(savedMovies);
  const index = savedMovies.indexOf(movieID);
  if( index > -1) {

    savedMovies.splice(index, 1);
    console.log(savedMovies);

    await User.updateOne({'userID': userID}, {$set: {'userMovies.savedMovies': savedMovies}});
  }
};

const deleteUserWatchedMovie = async (userID, movieID) => {
  const user = await User.findOne({'userID':userID},{'userMovies.watchedMovies':1});
  let watchedMovies = user.userMovies.watchedMovies;
  console.log(watchedMovies);
  const index = watchedMovies.indexOf(movieID);
  if( index > -1) {

    watchedMovies.splice(index, 1);
    console.log(watchedMovies);

    await User.updateOne({'userID': userID}, {$set: {'userMovies.watchedMovies': watchedMovies}});
  }
};

const deleteUserRatedMovie = async (userID, movieID) => {
  const user = await User.findOne({'userID':userID},{'userMovies.ratedMovies':1});
  let ratedMovies = user.userMovies.ratedMovies;
  console.log(ratedMovies);
  let index = -1;

  for(let i=0; i<ratedMovies.length; i++){
    if(ratedMovies[i].movieId === movieID){
      index = i;
      break;
    }
  }

  if( index > -1) {
    ratedMovies.splice(index, 1);
    console.log(ratedMovies);

    await User.updateOne({'userID': userID}, {$set: {'userMovies.ratedMovies': ratedMovies}});
  }
};

const addUserWatchedMovie = async (userID, movieID) => {

  const user = await User.findOne({'userID':userID},{'userMovies.watchedMovies':1});
  let watchedMovies = user.userMovies.watchedMovies;
  watchedMovies[watchedMovies.length]=movieID;

  await User.updateOne({'userID': userID}, {$set: {'userMovies.watchedMovies': watchedMovies}});
};

const addUserRatedMovie = async (userID, movieID, score) => {
  const user = await User.findOne({'userID':userID},{'userMovies.ratedMovies':1});
  let ratedMovies = user.userMovies.ratedMovies;

  ratedMovies[ratedMovies.length]={
    'movieId' : movieID,
    'score' : score
  };

  await User.updateOne({'userID': userID}, {$set: {'userMovies.ratedMovies': ratedMovies}});
};

const addUserSavedMovie = async (userID, movieID) => {

  const user = await User.findOne({'userID':userID},{'userMovies.savedMovies':1});
  let savedMovies = user.userMovies.savedMovies;
  savedMovies[savedMovies.length]=movieID;

  await User.updateOne({'userID': userID}, {$set: {'userMovies.savedMovies': savedMovies}});
};

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
  deleteUserSavedMovie,
  deleteUserRatedMovie,
  deleteUserWatchedMovie,
  addUserRatedMovie,
  addUserSavedMovie,
  addUserWatchedMovie,
};
