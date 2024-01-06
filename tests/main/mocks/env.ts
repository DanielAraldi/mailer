import env from '../../../src/main/config/env';

export function getMailUsername(): string {
  return env.mailLogin;
}

export function getMailPassword(): string {
  return env.mailPassword;
}
