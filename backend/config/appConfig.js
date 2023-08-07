const { NODE_ENV, APP_HOSTNAME, APP_PORT, RENDER_EXTERNAL_URL } = process.env;

const IN_PROD = NODE_ENV === 'production';

const APP_PROTOCOL = IN_PROD ? 'https' : 'http';

const APP_URL = IN_PROD
  ? RENDER_EXTERNAL_URL
  : `${APP_PROTOCOL}://${APP_HOSTNAME}:${APP_PORT}`;

module.exports = {
  NODE_ENV,
  APP_PROTOCOL,
  APP_HOSTNAME,
  APP_PORT,
  IN_PROD,
  APP_URL,
};
