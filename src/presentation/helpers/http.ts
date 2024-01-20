import { HttpResponse } from '../protocols';
import { ServerError, UnauthorizedError } from '../errors';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(),
});

export const serverError = ({ stack }: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(stack),
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
});
