const Joi = require('joi');

const title = Joi.string().trim().min(3).max(128);

const url = Joi.string()
  .trim()
  .min(8)
  .max(2048)
  .regex(
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
  )
  .message('Invalid url');

const newLinkSchema = Joi.object({ title, url }).options({
  presence: 'required',
});

const updateLinkSchema = Joi.object({ title, url }).or('title', 'url');

module.exports = { newLinkSchema, updateLinkSchema };
