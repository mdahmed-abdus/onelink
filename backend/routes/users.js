const express = require('express');
const { User } = require('../models/User');
const catchAsyncErr = require('../middleware/catchAsyncErr');
const { guest } = require('../middleware/authMiddleware');
const { BadRequest, NotFound } = require('../errors/customErrors');
const authService = require('../services/authService');
const { registerSchema, loginSchema } = require('../validation/userValidator');
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
      throw new BadRequest(errMessage);
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

module.exports = router;
