const axios = require('axios');

const findLocation = async (req, res) => {
  const { q } = req.query;

  // eslint-disable-next-line max-len
  const response = await axios.get(`http://api.geonames.org/searchJSON?q=${q}&maxRows=1&username=${process.env.GEONAMES_API_USERNAME}`);

  const result = response.data.geonames[0];
  res.send(result);
};

module.exports = {
  findLocation,
};
