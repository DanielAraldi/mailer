import { ApiError } from './ApiError';

export const AsyncErrors = (error, req, res, next) => {
  if (error instanceof ApiError)
    return res
      .status(error.statusCode)
      .json({ message: error.message, statusCode: res.statusCode });

  return res.status(500).json({
    message: error.message,
    statusCode: res.statusCode,
  });
};
