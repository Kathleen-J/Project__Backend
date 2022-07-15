const knex = require('knex');
const config = require('../../configs');

module.exports = knex(config[process.env.NODE_ENV || 'development'].database);