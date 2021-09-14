const express = require('express');
const { User } = require('../models/User');
const { BadRequest } = require('../errors/customErrors');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new BadRequest('User already registered');
  }

  const user = new User({ firstName, lastName, email, password });
  await user.save();

  res.json({ success: true, message: 'User registered' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const validPassword = await User.comparePassword(password, user?.password);

  if (!user || !validPassword) {
    throw new BadRequest('Invalid email or password');
  }

  // TODO: complete login

  res.json({ success: true, message: 'User logged in' });
});

router.post('/logout', (req, res) => {
  // TODO: complete logout
  res.json({ success: true, message: 'User logged out' });
});

module.exports = router;
