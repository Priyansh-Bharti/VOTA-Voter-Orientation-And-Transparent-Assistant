import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { logger as baseLogger } from '../utils/logger.js';

/**
 * Custom request type including a unique request ID.
 */
export interface RequestWithId extends Request {
  requestId?: string;
}

/**
 * Middleware to attach a unique Request ID to every incoming request.
 * Logs the start of the request for tracing purposes.
 */
export const requestLogger = (
  req: RequestWithId,
  res: Response,
  next: NextFunction,
): void => {
  const requestId = uuidv4();
  req.requestId = requestId;

  baseLogger.info('Incoming Request', {
    requestId,
    method: req.method,
    url: req.url,
    ip: req.ip,
  });

  next();
};
