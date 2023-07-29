export class ApiError {
  public statusCode: number;
  public message: string;

  constructor(message: string, statusCode: number = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
