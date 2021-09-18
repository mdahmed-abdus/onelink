const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 128,
    },
    url: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 2000,
    },
  },
  { timestamps: true }
);

const Link = mongoose.model('Link', linkSchema);

module.exports = { linkSchema, Link };
