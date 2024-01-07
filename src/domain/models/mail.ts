export interface MailModel {
  from: string;
  to: string[];
  title: string;
  message: string;
  login: string;
  password: string;
  username?: string;
}
