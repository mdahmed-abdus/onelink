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

// templates
const demoUserCredentialsTemplate = demoUser => `
Use given credentials to login as a demo user:

First name - ${demoUser.firstName}
Last name - ${demoUser.lastName}
Email - ${demoUser.email}
Username - ${demoUser.username}
Password - ${demoUser.password}
    
Note that the demo account and data associated will be deleted after 24 hours.
    
Please feel free to reach out on Twitter (now X) or email if you have any questions.
`;

module.exports = { smtpSendMail, sendMail, demoUserCredentialsTemplate };
