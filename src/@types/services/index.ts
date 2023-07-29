export interface SendEmail {
  login: string;
  password: string;
  from: string;
  to: string;
  title: string;
  message?: string;
  username?: string;
}
