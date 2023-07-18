const jwt = require('jsonwebtoken');
const { JWT_PRIVATE_KEY } = require('../config/keys');
const { AUTH_MAX_AGE_IN_SECONDS } = require('../config/authConfig');
const { User } = require('../models/User');
const { APP_URL } = require('../config/appConfig');

const login = (req, res, user) =>
  jwt.sign({ userId: user._id, username: user.username }, JWT_PRIVATE_KEY, {
    expiresIn: AUTH_MAX_AGE_IN_SECONDS,
    issuer: APP_URL,
  });

const isLoggedIn = req => {
  const { authorization } = req.headers;

  if (!authorization) {
    return false;
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);

    const user = User.findById(decoded._id);
    if (!user) {
      return false;
    }

    req.user = decoded;
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = { login, isLoggedIn };
