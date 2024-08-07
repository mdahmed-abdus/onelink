const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR, DUMMY_HASH } = require('../config/bcryptConfig');
const { linkSchema } = require('./Link');
const {
  sendMail,
  demoUserCredentialsTemplate,
  emailVerificationTemplate,
  passwordResetTemplate,
} = require('../services/mailService');
const randomGenerator = require('../services/randomGenerator');
const { Token } = require('./Token');
const { FRONTEND_URL } = require('../config/appConfig');
const {
  EMAIL_VERIFICATION_TIMEOUT,
  PASSWORD_RESET_TIMEOUT,
} = require('../config/authConfig');
const { Forbidden } = require('../errors/customErrors');

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
    accountType: {
      type: String,
      required: true,
      default: 'user',
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
  if (this.accountType === 'demo') {
    throw new Forbidden('Email verification not allowed for demo users');
  }

  const token = new Token({
    userId: this._id,
    expires: Date.now() + EMAIL_VERIFICATION_TIMEOUT,
  });
  await token.save();

  const url = FRONTEND_URL + `/email/verify?tokenId=${token._id}`;

  sendMail({
    to: this.email,
    subject: 'Email verification required',
    text: emailVerificationTemplate(url),
  });
};

userSchema.methods.sendPasswordResetEmail = async function () {
  if (this.accountType === 'demo') {
    throw new Forbidden('Password reset not allowed for demo users');
  }

  const token = new Token({
    userId: this._id,
    expires: Date.now() + PASSWORD_RESET_TIMEOUT,
  });
  await token.save();

  const url = FRONTEND_URL + `/password/reset?tokenId=${token._id}`;

  return sendMail({
    to: this.email,
    subject: 'Password reset',
    text: passwordResetTemplate(url),
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

userSchema.statics.generateDemoUserDetails = function () {
  const firstName = randomGenerator.name();
  const lastName = randomGenerator.name();
  const username = randomGenerator.id();
  const email = `${firstName}.${lastName}@domain.com`.toLowerCase();
  const password = randomGenerator.id(5) + '1@!' + randomGenerator.id(5);

  return {
    firstName,
    lastName,
    username,
    email,
    password,
    verifiedAt: new Date(),
    accountType: 'demo',
  };
};

userSchema.statics.sendDemoUserDetails = async function (
  requesterEmail,
  demoUser
) {
  return sendMail({
    to: requesterEmail,
    subject: 'Demo user credentials for Onelink.',
    text: demoUserCredentialsTemplate(demoUser),
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { userSchema, User };
