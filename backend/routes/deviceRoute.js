const { Device,validate } = require('../model/device');
const { User } = require('../model/user');
const auth = require('../middleware/auth');
const express = require('express');
const _ = require('lodash');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const userDevices = await User.findById(req.user._id).select('devices -_id');
    
    if(userDevices.devices.length==0){
        return res.status(404).send('No devices found for this user.');
    }

    const devices = await Device.find({ _id: { $in: userDevices.devices }});


    res.send(devices);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let device = new Device({ 
      name: req.body.name,
      deviceType: req.body.deviceType,
      currentState: req.body.currentState
    });
    device = await device.save();

    await User.findByIdAndUpdate(req.user._id,
        { 
          $push: {devices: [
              device._id
          ]}
        });
    
    res.send(device);
  });


  router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let userDevices = await User.find({_id : req.user._id });
    const userDevice = userDevices[0].devices.find(device => device == req.params.id);

    if (!userDevice) return res.status(400).send('User does not have this device.');

    let device = await Device.findById(req.params.id);

    if(device.currentState != req.body.currentState){
        device.lastUpdated=new Date();
    }
    device.name = req.body.name;
    device.deviceType = req.body.deviceType;
    device.currentState = req.body.currentState;

    device = await device.save();
  
    if (!device) return res.status(404).send('The Device with the given ID was not found.');
    
    res.send(device);
  });

  router.delete('/:id', auth, async (req, res) => {
    let user = await User.findById( req.user._id );
    const userDevice = user.devices.find(device => device == req.params.id);

    if (!userDevice) return res.status(400).send('User does not have this device.');

    user.devices.splice(user.devices.indexOf(req.params.id), 1);
    user = await user.save();
  
    res.send(user);
  });


  router.post('/share/:shareToEmail/:deviceId', auth, async (req, res) => {
    let user = await User.findById( req.user._id );
    const userDevice = user.devices.find(device => device == req.params.deviceId);
    if (!userDevice) return res.status(400).send('User does not have this device.');

    let shareToUser = await User.find({ email : req.params.shareToEmail });
    if(!shareToUser) return res.status(403).send('User with provided Email Not Found');

    const shareToUserDevice = shareToUser[0].devices.find(device => device == req.params.deviceId);
    if (shareToUserDevice) return res.status(400).send('User already have this device.');


    let device = await Device.findById(req.params.deviceId);
    
    await User.findByIdAndUpdate(shareToUser[0]._id,
        { 
          $push: {devices: [
            device._id
          ]}
        });

    res.send('Success');
  });

module.exports = router;