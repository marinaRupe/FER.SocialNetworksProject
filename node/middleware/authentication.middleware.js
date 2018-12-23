const errors = require('restify-errors');
const asyncWrap = require('express-async-wrap');
const UserService = require('../services/user.service');

const authenticate = asyncWrap(async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    throw new errors.BadRequestError();
  }

  const user = await UserService.findByToken(token);

  res.locals.user = user;

  next();
});

module.exports = authenticate;
