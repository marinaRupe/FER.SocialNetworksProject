const getText = async (req, res) => {
  console.log('test');
  res.send('test text');
};

module.exports = {
  getText
};