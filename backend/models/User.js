const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR, DUMMY_HASH } = require('../config/bcryptConfig');
const { linkSchema } = require('./Link');
const { sendMail } = require('../services/mailService');
const { Token } = require('./Token');
const { APP_URL } = require('../config/appConfig');
const { EMAIL_VERIFICATION_TIMEOUT } = require('../config/authConfig');

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
      minlength: 3,
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

userSchema.methods.isVerified = function () {
  return !!this.verifiedAt;
};

userSchema.methods.sendVerificationEmail = async function () {
  const token = new Token({
    userId: this._id,
    expires: Date.now() + EMAIL_VERIFICATION_TIMEOUT,
  });
  await token.save();

  const url = APP_URL + `/users/email/verify?tokenId=${token._id}`;

  sendMail({
    to: this.email,
    subject: 'Email verification required',
    text: `Please click on this link to verify your email: ${url}`,
  });
};

userSchema.statics.comparePassword = function (plainTextPwd, hashedPwd) {
  // using dummy hash to mitigate timing attack
  return bcrypt.compare(plainTextPwd, hashedPwd || DUMMY_HASH);
};

userSchema.statics.verifyToken = async function (tokenId) {
  const token = await Token.findById(tokenId);

  if (token?.hasExpired()) {
    await token.remove();
    return false;
  }

  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = { userSchema, User };
