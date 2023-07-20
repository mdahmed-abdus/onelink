const validateId = require('./validateId');

module.exports = (req, res, next) =>
  validateId(req, res, next, req.query.tokenId);
