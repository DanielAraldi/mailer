export default {
  port: Number.parseInt(process.env.PORT || '3333'),
  mailPort: Number.parseInt(process.env.MAIL_PORT || '2525'),
  mailHost: process.env.MAIL_HOST || 'sandbox.smtp.mailtrap.io',
};
