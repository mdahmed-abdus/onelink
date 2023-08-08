const nodemailer = require('nodemailer');
const { Resend } = require('resend');
const {
  SMTP_OPTIONS,
  FROM,
  RESEND_API_KEY,
  RESEND_FROM,
} = require('../config/mailConfig');

// smtp
const transporter = nodemailer.createTransport(SMTP_OPTIONS);

const smtpSendMail = options =>
  transporter.sendMail({ ...options, from: FROM });

// resend
const resend = new Resend(RESEND_API_KEY);

const sendMail = options =>
  resend.emails.send({ ...options, from: RESEND_FROM });

module.exports = { smtpSendMail, sendMail };
