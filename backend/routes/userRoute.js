const { User,validate } = require('../model/user');
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const router = express.Router();


router.post('/signup', async (req, res) => {
    const { error } = validate(req.body); 
    if (error){
      return res.status(400).send(error.details[0].message);
    } 
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send('User already registered.');
    }
    user = new User({ 
      email: req.body.email,
      password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'email']));
  });
  
  module.exports = router;