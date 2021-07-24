const winston = require('winston');
const redis = require('redis').createClient(6379,'redis');

module.exports = function() {
    redis.on('connect', function() {
        winston.info('Connected to Redis...');
      });
    redis.on("error", function(error) {
        winston.error(error);
    });
    return redis;
}