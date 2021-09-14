const { MONGO_URI } = process.env;

const MONGO_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

module.exports = { MONGO_URI, MONGO_OPTIONS };
