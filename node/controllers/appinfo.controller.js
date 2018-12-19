const errors = require('restify-errors');
const MovieService = require('../services/movie.service');
const UserService = require('../services/user.service');

const getAppInfo = async (req, res) => {

  const response = {
    movies_count: MovieService.getMoviesCount(),
    users_count: UserService.findAll(),
    api_count: 6
  };

  res.send(response);
};

module.exports = {
  getAppInfo
};
