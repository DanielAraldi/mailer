import { ApiError } from './ApiError';

export const AsyncErrors = (error, request, response) => {
  if (error instanceof ApiError)
    return response
      .status(error.statusCode)
      .json({ message: error.message, statusCode: response.statusCode });

  return response.status(500).json({
    message: error.message,
    statusCode: response.statusCode,
  });
};
