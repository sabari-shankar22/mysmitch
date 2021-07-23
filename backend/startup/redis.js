const winston = require('winston');
const redis = require('redis');

module.exports = function() {
    const redisClient = redis.createClient(6379,'localhost');
    redisClient.on('connect', function() {
        winston.info('Connected to Redis...');
      });
    redisClient.on("error", function(error) {
        winston.error(error);
    });
}