const errors = require('restify-errors');
const User = require('../models/user.model');

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

const addNewUser = (email, password, firstName, lastName) => {
  const user = new User({
    email,
    firstName,
    lastName,
  });

  user.setPassword(password);
  user.setToken();

  return user;
};

const add = async (email, password, firstName, lastName) => {
  const user = addNewUser(email, password, firstName, lastName);

  await user.save();

  return user;
};

const existsEmail = async email => (await User.countDocuments({ email })) > 0;

const changePassword = async (user, newPassword) => {
  user.setPassword(newPassword);
  user.setToken();

  return User.findByIdAndUpdate(user._id, user, { new: true });
};

const updateUser = async (user, id) => User.findByIdAndUpdate(
  id, user, { new: true },
).exec();

const deleteUser = async email => User.deleteOne({ email });

module.exports = {
  findByEmail,
  findByToken,
  findAll,
  add,
  existsEmail,
  changePassword,
  updateUser,
  deleteUser,
};