const errors = require('restify-errors');
const asyncWrap = require('express-async-wrap');

const authorize = roles => asyncWrap(async (req, res, next) => {
  const { user } = res.locals;

  if (!roles.includes(user.role)) {
    throw new errors.UnauthorizedError();
  }

  next();
});


module.exports = authorize;
