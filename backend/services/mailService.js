const nodemailer = require('nodemailer');
const { Resend } = require('resend');
const {
  SMTP_OPTIONS,
  FROM,
  RESEND_API_KEY,
  RESEND_FROM,
} = require('../config/mailConfig');
const { IN_PROD } = require('../config/appConfig');

// smtp
const transporter = nodemailer.createTransport(SMTP_OPTIONS);

const smtpSendMail = options =>
  transporter.sendMail({ ...options, from: FROM });

// resend
const resend = new Resend(RESEND_API_KEY);

const resendSendMail = options =>
  resend.emails.send({ ...options, from: RESEND_FROM });

// use smtp for development and resend for production
const sendMail = IN_PROD ? resendSendMail : smtpSendMail;

module.exports = { smtpSendMail, sendMail };
