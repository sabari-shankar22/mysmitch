const { User,validate } = require('../model/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error){
      return res.status(400).send(error.details[0].message);
    } 
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send('User already registered.');
    }
    let user = new User({ 
      email: req.body.email,
      password: req.body.password
    });
    user = await user.save();
    res.send(user);
  });
  
  module.exports = router; 