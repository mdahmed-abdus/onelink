const { isLoggedIn } = require('../services/authService');
const { Unauthorized } = require('../errors/customErrors');

const guest = (req, res, next) => {
  if (isLoggedIn) {
    next(new Unauthorized());
  }
  next();
};

const auth = (req, res, next) => {
  if (!isLoggedIn(req)) {
    return next(new Unauthorized());
  }
  next();
};

module.exports = { guest, auth };
