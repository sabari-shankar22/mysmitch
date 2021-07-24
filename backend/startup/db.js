const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
  mongoose.connect('mongodb://db/mysmitch')
    .then(() => winston.info('Connected to MongoDB...'));
}