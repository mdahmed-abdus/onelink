const express = require('express');
const morgan = require('morgan');
const { IN_PROD } = require('../config/appConfig');

module.exports = app => {
  // body parser
  app.use(express.json());

  if (!IN_PROD) {
    app.use(morgan('dev'));
  }
};
