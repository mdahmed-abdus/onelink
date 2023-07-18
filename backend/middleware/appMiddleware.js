const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { IN_PROD } = require('../config/appConfig');

module.exports = app => {
  // body parser
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  if (!IN_PROD) {
    app.use(morgan('dev'));
  }
};
