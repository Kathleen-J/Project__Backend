const config = require('./configs/index');

module.exports = {
  development: config.development.database,
  production: config.production.database
};