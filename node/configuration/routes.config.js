const express = require('express');
const path = require('path');
const expressConfig = require('../configuration/express.config');
const apiConstants = require('../constants/api.constants');
const userRouter = require('../routes/api/user.routes');
const movieReviewRouter = require('../routes/api/movieReview.routes');
const movieRouter = require('../routes/api/movie.routes');
const cinemaRouter = require('../routes/api/cinema.routes');
const weatherRouter = require('../routes/api/weather.routes');
const infoRouter = require('../routes/api/info.routes');

const useProductionRoutes = app => {
  app.use('/images', express.static(path.join(__dirname, '..', '..', 'dist-react', 'images'), { maxAge: 31557600000 }));
  app.use('/libs', express.static(path.join(__dirname, '..', '..', 'dist-react', 'libs'), { maxAge: 31557600000 }));
  app.use('/static', express.static(path.join(__dirname, '..', '..', 'dist-react', 'static'), { maxAge: 31557600000 }));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', '..', 'dist-react', 'index.html')));
};

const useDevelopmentRoutes = app => {
  app.get('/:url?', (req, res) => (res.redirect(`https://localhost:3001/${req.params.url || ''}`)));
};

const configure = app => {
  app.use(`${apiConstants.API_PATH}/user`, userRouter);
  app.use(`${apiConstants.API_PATH}/movie-review`, movieReviewRouter);
  app.use(`${apiConstants.API_PATH}/movie`, movieRouter);
  app.use(`${apiConstants.API_PATH}/cinema`, cinemaRouter);
  app.use(`${apiConstants.API_PATH}/weather`, weatherRouter);
  app.use(`${apiConstants.API_PATH}/app`, infoRouter);

  if (expressConfig.isProduction()) {
    useProductionRoutes(app);
  } else {
    useDevelopmentRoutes(app);
  }
};

module.exports = {
  configure,
};
