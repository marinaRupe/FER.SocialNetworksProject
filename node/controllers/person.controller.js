const errors = require('restify-errors');
const tmdbService = require('../services/tmdb.service');

const getPersonDetails = async (req, res) => {
  const { personId } = req.params;

  const response = await tmdbService.getPersonDetails(personId);

  if (response.status !== 200) {
    throw new errors.BadRequestError('Bad request.');
  }

  res.send(response.data);
};

module.exports = {
  getPersonDetails,
};
