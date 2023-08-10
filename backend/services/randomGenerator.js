const { nanoid } = require('nanoid');
const { uniqueNamesGenerator, names } = require('unique-names-generator');

const id = (size = 20) => nanoid(size);

const name = () => uniqueNamesGenerator({ dictionaries: [names] });

module.exports = { id, name };
