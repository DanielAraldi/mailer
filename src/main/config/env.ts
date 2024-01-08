export default {
  port: Number.parseInt(process.env.PORT || '3333'),
  mailLogin: process.env.MAIL_LOGIN,
  mailPassword: process.env.MAIL_PASSWORD,
};
