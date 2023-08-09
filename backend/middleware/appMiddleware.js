const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { IN_PROD, FRONTEND_URL } = require('../config/appConfig');

module.exports = app => {
  // body parser
  app.use(cors({ origin: FRONTEND_URL }));
  app.use(express.json());
  app.use(cookieParser());

  if (!IN_PROD) {
    app.use(morgan('dev'));
  }
};
