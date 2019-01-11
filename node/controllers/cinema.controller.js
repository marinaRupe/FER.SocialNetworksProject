const errors = require('restify-errors');
const hereService = require('../services/here.service');

const getCinemas = async (req, res) => {
  const { location } = req.params;

  const response = await hereService.getCinemas(location);

  if (response.status !== 200) {
    throw new errors.BadRequestError('Bad request.');
  }

  res.send(response.data.results);
};

module.exports = {
  getCinemas,
};
