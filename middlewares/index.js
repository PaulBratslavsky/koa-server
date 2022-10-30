const bodyParser = require('koa-parser');

const logger = require('./logger');
const timer = require('./timer');

module.exports = [logger, timer, bodyParser];
