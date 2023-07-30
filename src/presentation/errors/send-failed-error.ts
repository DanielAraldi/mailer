export class SendFailedError extends Error {
  constructor() {
    super('Send Mail Failed Error');
    this.name = 'SendFailedError';
  }
}
