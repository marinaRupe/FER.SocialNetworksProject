const debug = require('debug')('node:server');
const fs = require('fs');
const http = require('http');
const https = require('https');
const dotenv = require('dotenv');

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

const isProduction = () => process.env.NODE_ENV && process.env.NODE_ENV === 'production';
const isDevelopment = () => !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const initialize = app => {
  if (isDevelopment()) {
    dotenv.config({ path: '.env' });
    app.use(allowCrossDomain);
  }
};

const normalizePort = val => {
  const normalizedPort = parseInt(val, 10);

  if (Number.isNaN(normalizedPort)) {
    // named pipe
    return val;
  }

  if (normalizedPort >= 0) {
    // port number
    return normalizedPort;
  }

  return false;
};

const onListening = server => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
};

const listen = app => {
  const port = normalizePort(process.env.PORT || '3001');
  app.set('port', port);

  let server;
  if (isDevelopment()) {
    const privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
    const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

    const credentials = { key: privateKey, cert: certificate };
    server = https.createServer(credentials, app);
  } else {
    server = http.createServer(app);
  }

  server.listen(port);
  server.on('listening', onListening.bind(null, server));
};

module.exports = {
  initialize,
  listen,
  isProduction,
  isDevelopment,
};
