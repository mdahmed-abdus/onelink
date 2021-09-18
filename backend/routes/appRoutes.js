const notFound = require('../errors/notFound');
const users = require('./users');
const links = require('./links');

module.exports = app => {
  app.use('/users', users);
  app.use('/links', links);
  app.use(notFound);
};
