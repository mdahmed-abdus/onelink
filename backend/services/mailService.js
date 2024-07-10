const nodemailer = require('nodemailer');
const brevo = require('@getbrevo/brevo');
const { SMTP_OPTIONS, FROM, BREVO_API_KEY } = require('../config/mailConfig');
const { IN_PROD } = require('../config/appConfig');

// smtp
const transporter = nodemailer.createTransport(SMTP_OPTIONS);

const smtpSendMail = options =>
  transporter.sendMail({ ...options, from: FROM });

// brevo
const apiInstance = new brevo.TransactionalEmailsApi();
const apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = BREVO_API_KEY;

const sendSmtpEmail = new brevo.SendSmtpEmail();

const brevoSendMail = ({ to, subject, text }) => {
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.textContent = text;
  sendSmtpEmail.to = [{ email: to, name: '-' }];
  sendSmtpEmail.sender = {
    name: 'Onelink',
    email: 'mdahmed.domain@gmail.com',
  };
  sendSmtpEmail.replyTo = {
    name: 'MD Ahmed',
    email: 'mdahmed.domain@gmail.com',
  };

  return apiInstance.sendTransacEmail(sendSmtpEmail);
};

// use brevo for production and smtp for development
const sendMail = IN_PROD ? brevoSendMail : smtpSendMail;

// templates
const demoUserCredentialsTemplate = demoUser => `
Use given credentials to login as a demo user:

First name - ${demoUser.firstName}
Last name - ${demoUser.lastName}
Email - ${demoUser.email}
Username - ${demoUser.username}
Password - ${demoUser.password}
    
Please note that the demo account and data associated will be deleted after 24 hours.
`;

const emailVerificationTemplate = url => `
Please click on the link to verify your email.
${url}
`;

const passwordResetTemplate = url => `
Please click on the link to reset your password.
${url}
`;

module.exports = {
  smtpSendMail,
  sendMail,
  demoUserCredentialsTemplate,
  emailVerificationTemplate,
  passwordResetTemplate,
};
