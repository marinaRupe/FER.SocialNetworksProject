const errors = require('restify-errors');
const UserService = require('../services/user.service');
const settings = require('../constants/constraints.constants');
const UserLoginViewModel = require('../dataTransferObjects/viewModels/userLogin.viewModel');
const userValidator = require('../validators/user.validator');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email.match(settings.EMAIL_REGEX)) {
    throw new errors.BadRequestError({
      info: {
        email: 'Email is invalid.',
      },
    });
  }

  const user = await UserService.findByEmail(email);
  const isCorrectPassword = user.validatePassword(password);
  if (!isCorrectPassword) {
    throw new errors.NotAuthorizedError({
      info: {
        message: 'Incorrect email or password.',
      },
    });
  }

  res.json(new UserLoginViewModel(user));
};

const register = async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    password,
  } = req.body;

  const validation = userValidator.isValidUserObject(req.body);
  if (!validation.isValid) {
    throw new errors.BadRequestError({ info: validation.errors });
  }

  if (await UserService.existsEmail(email)) {
    throw new errors.ConflictError({
      info: {
        email: `User with email ${email} already exists.`,
      },
    });
  }

  const user = await UserService.add(email, password, firstName, lastName);

  res.json(new UserLoginViewModel(user));
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { user } = res.locals;

  if (!user.validatePassword(oldPassword)) {
    throw new errors.BadRequestError({
      info: {
        oldPassword: 'Invalid password.',
      },
    });
  }

  if (newPassword.length < settings.MIN_PASSWORD_LENGTH) {
    throw new errors.BadRequestError({
      info: {
        newPassword: `Password must be at least ${settings.MIN_PASSWORD_LENGTH} charachters long.`,
      },
    });
  }

  const newUser = await UserService.changePassword(user, newPassword);
  return res.json(new UserLoginViewModel(newUser));
};

module.exports = {
  login,
  register,
  changePassword
};