export class ApiError {
  constructor(message, statusCode = 400) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
