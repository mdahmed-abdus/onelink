const Joi = require('joi');
const { BCRYPT_MAX_BYTES } = require('../config/bcryptConfig');

const name = Joi.string().trim().min(3).max(128);

const email = Joi.string().trim().email().min(8).max(254);

// TODO: improve regex
const username = Joi.string()
  .trim()
  .min(3)
  .max(20)
  .regex(/^[a-zA-Z0-9_.]{3,20}$/)
  .message(
    'Only alphabets, numbers, underscores and dot allowed in "username"'
  );

const password = Joi.string()
  .min(8)
  .max(BCRYPT_MAX_BYTES, 'utf8')
  .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
  .message(
    '"password" must contain at least: 1 uppercase letter, 1 lowercase letter and 1 digit'
  );

const confirmPassword = Joi.valid(Joi.ref('password'));

const registerSchema = Joi.object({
  firstName: name,
  lastName: name,
  username,
  email,
  password,
  confirmPassword,
}).options({ presence: 'required' });

const loginSchema = Joi.object({ email, username, password }).or(
  'email',
  'username'
);

const resendEmailVerificationLinkSchema = Joi.object({ email }).options({
  presence: 'required',
});

const passwordForgotSchema = Joi.object({ email }).options({
  presence: 'required',
});

const passwordResetSchema = Joi.object({ password, confirmPassword }).options({
  presence: 'required',
});

module.exports = {
  registerSchema,
  loginSchema,
  resendEmailVerificationLinkSchema,
  passwordForgotSchema,
  passwordResetSchema,
};
