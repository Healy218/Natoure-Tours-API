const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
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
    minlength: [8, 'Password must be at least 8 characters'],
    // validate: [validator.isAlpha, 'Tour name must only contain characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Passwords must match'],
    minlength: [8, 'A tour name must have more than 10 characters'],
    validate: {
      // This only works on Save!
      validator: function (el) {
        return el === this.password;
      },
      message: 'passwords are not the same!',
    },
  },
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete the password confirmed field
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
