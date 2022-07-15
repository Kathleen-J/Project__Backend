const knex = require('knex');
const config = require('../../../configs/index');

export const db = knex(config[process.env.NODE_ENV || 'development'].database);