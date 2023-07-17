const jwt = require('jsonwebtoken');
const { JWT_PRIVATE_KEY } = require('../config/keys');
const { AUTH_MAX_AGE_IN_SECONDS } = require('../config/authConfig');
const { Unauthorized } = require('../errors/customErrors');
const { User } = require('../models/User');

const login = (req, res, user) =>
  jwt.sign({ userId: user._id }, JWT_PRIVATE_KEY, {
    expiresIn: AUTH_MAX_AGE_IN_SECONDS,
  });

const isLoggedIn = req => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Unauthorized();
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);

    const user = User.findById(decoded._id);
    if (!user) {
      throw new Unauthorized();
    }

    req.user = decoded;
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = { login, logout, isLoggedIn };
