const express = require('express');
const { User } = require('../models/User');
const catchAsyncErr = require('../middleware/catchAsyncErr');
const { guest } = require('../middleware/authMiddleware');
const validateTokenId = require('../middleware/validateTokenId');
const { BadRequest, NotFound, Forbidden } = require('../errors/customErrors');
const authService = require('../services/authService');
const {
  registerSchema,
  loginSchema,
  resendEmailVerificationLinkSchema,
  passwordForgotSchema,
  passwordResetSchema,
  demoUserRegistrationSchema,
} = require('../validation/userValidator');
const validate = require('../validation/validate');

const router = express.Router();

router.post(
  '/register',
  guest,
  catchAsyncErr(async (req, res) => {
    const errMessage = validate(registerSchema, req.body);
    if (errMessage) {
      throw new BadRequest(errMessage);
    }

    const { firstName, lastName, username, email, password } = req.body;

    const emailTaken = await User.findOne({ email });
    if (emailTaken) {
      throw new BadRequest('User already registered');
    }

    const usernameTaken = await User.findOne({ username });
    if (usernameTaken) {
      throw new BadRequest('Username is already taken');
    }

    const user = new User({ firstName, lastName, username, email, password });
    await user.save();

    res.json({ success: true, message: 'User registered' });

    await user.sendVerificationEmail();
  })
);

router.post(
  '/login',
  guest,
  catchAsyncErr(async (req, res) => {
    const errMessage = validate(loginSchema, req.body);
    if (errMessage) {
      throw new BadRequest('Invalid username or password');
    }

    const { username, email, password } = req.body;

    let user;
    if (email) {
      user = await User.findOne({ email });
    } else {
      user = await User.findOne({ username });
    }

    const validPassword = await User.comparePassword(password, user?.password);

    if (!user || !validPassword) {
      throw new BadRequest('Invalid username or email or password');
    }

    if (!user.isVerified()) {
      throw new Forbidden('Email not verified');
    }

    const token = authService.login(req, res, user);

    res.json({ success: true, message: 'User logged in', token: token });
  })
);

router.get(
  '/:username',
  catchAsyncErr(async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne(
      { username },
      '-_id username firstName lastName links._id links.title links.url'
    );

    if (!user) {
      throw new NotFound(`User with username "${username}" not found`);
    }

    res.json({
      success: true,
      message: `User has ${user.links.length} link(s)`,
      user,
    });
  })
);

router.post(
  '/email/verify',
  validateTokenId,
  catchAsyncErr(async (req, res) => {
    const token = await User.verifyToken(req.query.tokenId);
    if (!token) {
      throw new BadRequest('Invalid token');
    }

    const user = await User.findById(token.userId);
    if (!user || user?.isVerified()) {
      throw new BadRequest('Invalid email or already verified');
    }

    user.verifiedAt = new Date();
    await user.save();
    await token.remove();

    res.json({ success: true, message: 'Email verified' });
  })
);

router.post(
  '/email/resend-verification-email',
  catchAsyncErr(async (req, res) => {
    const errMessage = validate(resendEmailVerificationLinkSchema, req.body);
    if (errMessage) {
      throw new BadRequest(errMessage);
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user || user?.isVerified()) {
      throw new BadRequest('Invalid email or already verified');
    }

    await user.sendVerificationEmail();

    res.json({ success: true, message: 'Email sent' });
  })
);

router.post(
  '/password/forgot',
  catchAsyncErr(async (req, res) => {
    const errMessage = validate(passwordForgotSchema, req.body);
    if (errMessage) {
      throw new BadRequest(errMessage);
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user || !user?.isVerified()) {
      throw new BadRequest('Invalid email');
    }

    await user.sendPasswordResetEmail();

    res.json({ success: true, message: 'Mail sent' });
  })
);

router.post(
  '/password/reset',
  validateTokenId,
  catchAsyncErr(async (req, res) => {
    const errMessage = validate(passwordResetSchema, req.body);
    if (errMessage) {
      throw new BadRequest(errMessage);
    }

    const token = await User.verifyToken(req.query.tokenId);
    if (!token) {
      throw new BadRequest('Invalid token');
    }

    const user = await User.findById(token.userId);
    if (!user || !user?.isVerified()) {
      throw new BadRequest('Invalid email or user not verified');
    }

    if (req.body.password !== req.body.confirmPassword) {
      throw new BadRequest('Passwords do not match');
    }

    user.password = req.body.password;
    await user.save();
    await token.remove();

    res.json({ success: true, message: 'Password changed successfully' });
  })
);

router.post(
  '/demo/register',
  guest,
  catchAsyncErr(async (req, res) => {
    const errMessage = validate(demoUserRegistrationSchema, req.body);
    if (errMessage) {
      throw new BadRequest(errMessage);
    }

    const { email } = req.body;

    const userDetails = User.generateDemoUserDetails();
    const user = new User(userDetails);
    await user.save();

    res.json({
      success: true,
      message: 'Please check your email for credentials',
    });

    await User.sendDemoUserDetails(email, userDetails);
  })
);

module.exports = router;
