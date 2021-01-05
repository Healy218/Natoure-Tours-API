const mongoose = require('mongoose');
const validator = require('validator');

//name, email, photo, password, passwordconfirm

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    maxlength: [40, 'A tour name must have less than 40 characters'],
    // validate: [validator.isAlpha, 'Tour name must only contain characters'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    lowercase: true,
    validator: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'User needs a password'],
    maxlength: [40, 'A tour name must have less than 40 characters'],
    minlength: [10, 'A tour name must have more than 10 characters'],
    // validate: [validator.isAlpha, 'Tour name must only contain characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Passwords must match'],
    maxlength: [40, 'A tour name must have less than 40 characters'],
    minlength: [10, 'A tour name must have more than 10 characters'],
    // validate: [validator.isAlpha, 'Tour name must only contain characters'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
