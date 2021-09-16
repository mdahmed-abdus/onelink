const express = require('express');
const { User } = require('../models/User');
const { BadRequest } = require('../errors/customErrors');
const authService = require('../services/authService');

const router = express.Router();

router.post('/register', async (req, res) => {
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
});

router.post('/login', async (req, res) => {
  const { username, email, password } = req.body;

  let user;
  if (email) {
    user = await User.findOne({ username });
  } else {
    user = await User.findOne({ email });
  }

  const validPassword = await User.comparePassword(password, user?.password);

  if (!user || !validPassword) {
    throw new BadRequest('Invalid username or email or password');
  }

  authService.login(req, res, user);

  res.json({ success: true, message: 'User logged in' });
});

router.post('/logout', (req, res) => {
  // TODO: complete logout
  res.json({ success: true, message: 'User logged out' });
});

module.exports = router;
