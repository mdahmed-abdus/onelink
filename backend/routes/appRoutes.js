const notFound = require('../errors/notFound');

module.exports = app => {
  app.use(notFound);
};
