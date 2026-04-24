import { Response, NextFunction } from 'express';

import { RequestWithId } from './logger.js';
import { logger } from '../utils/logger.js';

/**
 * Custom application error class.
 */
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true,
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * Global error handling middleware.
 * Ensures structured JSON responses and prevents stack trace leakage.
 */
export const errorHandler = (
  err: Error | AppError,
  req: RequestWithId,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  logger.error(message, err, {
    requestId: req.requestId,
    path: req.path,
    method: req.method,
  });

  res.status(statusCode).json({
    status: 'error',
    requestId: req.requestId,
    message: process.env.NODE_ENV === 'production' && !(err instanceof AppError)
      ? 'An unexpected error occurred'
      : message,
  });
};
