var config = {};

config.mongoURI = {
  test: 'mongodb://localhost/montmatch-db-testing',
  development: 'mongodb://localhost/montmatch-db',
  production: process.env.MONGODB_URI
};

module.exports = config;