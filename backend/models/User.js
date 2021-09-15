const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR, DUMMY_HASH } = require('../config/bcryptConfig');
const { linkSchema } = require('./Link');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 128,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 128,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 8,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 8,
      maxlength: 254,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 1024,
    },
    verifiedAt: Date,
    links: [linkSchema],
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, BCRYPT_WORK_FACTOR);
  }
  next();
});

userSchema.statics.comparePassword = function (plainTextPwd, hashedPwd) {
  // using dummy hash to mitigate timing attack
  return bcrypt.compare(plainTextPwd, hashedPwd || DUMMY_HASH);
};

const User = mongoose.model('User', userSchema);

module.exports = { userSchema, User };
