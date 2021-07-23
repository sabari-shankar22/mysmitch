const mongoose = require('mongoose');
const Joi = require('joi');

const deviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, 
        minlength:3,
        maxlength: 255
      },
      deviceType: {
        type: String,
        required: true,
        enum: ['AA','AB','AC','BA','BB','BC'],
        uppercase: true
      },
      currentState: {
        type: Boolean,
        default: false
      },
    lastUpdated: {
        type: Date,
        default: Date.now,
        set: d => new Date(d * 1000)
    }
});

const Device = mongoose.model('Device', deviceSchema);

function validateDevice(user) {
    const schema = {
      name: Joi.string().min(3).max(255).required(),
      deviceType: Joi.string().valid('AA','AB','AC','BA','BB','BC'),
      currentState: Joi.boolean()
    };
  
    return Joi.validate(user, schema);
  }

exports.Device = Device;
exports.validate = validateDevice;