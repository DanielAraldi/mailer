export default {
  port: Number.parseInt(process.env.PORT || '3333'),
  mailLogin: process.env.MAIL_LOGIN,
  mailPassword: process.env.MAIL_PASSWORD,
  mailPort: Number.parseInt(process.env.MAIL_PORT || '2525'),
  mailHost: process.env.MAIL_HOST || 'sandbox.smtp.mailtrap.io',
};
