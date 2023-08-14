require('dotenv').config({ path: './config/.env' });

const express = require('express');
const schedule = require('node-schedule');
const connectDb = require('./services/connectDb');
const { APP_PORT, NODE_ENV, APP_URL } = require('./config/appConfig');
const appMiddleware = require('./middleware/appMiddleware');
const appRoutes = require('./routes/appRoutes');
const appErrors = require('./errors/appErrors');
const { clearDemoUsers } = require('./scripts/db');

const app = express();

connectDb(app);

app.on('ready', () => {
  // delete demo users at 00:10 (12:10 AM) everyday
  schedule.scheduleJob('10 00 * * *', clearDemoUsers);

  appMiddleware(app);
  appRoutes(app);
  appErrors(app);

  app.listen(APP_PORT, () =>
    console.log(`Server running [mode - ${NODE_ENV}]: ${APP_URL}`)
  );
});
