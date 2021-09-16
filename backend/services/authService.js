const jwt = require('jsonwebtoken');
const { JWT_PRIVATE_KEY } = require('../config/keys');
const { AUTH_MAX_AGE_IN_SECONDS } = require('../config/authConfig');

const login = (req, res, user) => {
  const token = jwt.sign({ userId: user._id }, JWT_PRIVATE_KEY, {
    expiresIn: AUTH_MAX_AGE_IN_SECONDS,
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: AUTH_MAX_AGE_IN_SECONDS * 1000,
    sameSite: true,
  });
};

module.exports = { login };
