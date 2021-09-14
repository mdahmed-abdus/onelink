const notFound = require('../errors/notFound');
const users = require('./users');

module.exports = app => {
  app.use('/users', users);
  app.use(notFound);
};
