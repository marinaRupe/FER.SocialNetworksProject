const errors = require('restify-errors');
const nyTimesService = require('../services/nyTimes.service');

const getReviews = async (req, res) => {
  const response = await nyTimesService.getReviews();

  if (response.status !== 200) {
    throw new errors.BadRequestError('Bad request.');
  }

  res.send(response.data);
};

module.exports = {
  getReviews
};