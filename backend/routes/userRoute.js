const { User } = require('../model/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    let user = new User({ 
      email: req.body.email,
      password: req.body.password
    });
    user = await user.save();
    res.send(user);
  });
  
  module.exports = router; 