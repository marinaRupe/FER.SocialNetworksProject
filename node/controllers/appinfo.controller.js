const MovieService = require('../services/movie.service');
const UserService = require('../services/user.service');

const getAppInfo = async (req, res) => {
  const users = await UserService.findAll();
  const movies = await MovieService.getMoviesCount();

  const response = {
    movies_count: movies,
    users_count: users.length,
    api_count: 6,
  };

  res.send(response);
};

module.exports = {
  getAppInfo,
};
