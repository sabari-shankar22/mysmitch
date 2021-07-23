const users = require('../routes/userRoute');
const auth = require('../routes/auth');
const devices = require('../routes/deviceRoute');
const error = require('../middleware/error');
const express = require("express");

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/login', auth);
    app.use('/api/devices', devices);
    app.use(error);
};