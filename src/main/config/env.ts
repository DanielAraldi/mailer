export default {
  port: Number.parseInt(process.env.PORT || '3333'),
  mailPort: process.env.MAIL_PORT || 2525,
  mailHost: process.env.MAIL_HOST || 'sandbox.smtp.mailtrap.io',
};
