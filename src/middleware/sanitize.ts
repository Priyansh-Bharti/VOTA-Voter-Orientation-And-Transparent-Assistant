import { Request, Response, NextFunction } from 'express';

import { logger } from '../utils/logger.js';

/**
 * Array of patterns identified as potential prompt injection attacks.
 */
const INJECTION_PATTERNS = [
  'ignore previous',
  'jailbreak',
  'forget instructions',
  'pretend you are',
  'act as',
  'DAN',
];

/**
 * Checks for potential prompt injection patterns in the request body.
 * @param body JSON string of the request body.
 * @returns boolean true if injection is detected.
 */
const detectInjection = (body: string): boolean => INJECTION_PATTERNS.some((pattern) => (
  body.toLowerCase().includes(pattern.toLowerCase())
));

/**
 * Middleware to sanitize input and block prompt injection patterns.
 * Strips HTML and checks for disallowed phrases in request body.
 */
export const sanitizeInput = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const bodyString = JSON.stringify(req.body);

  if (detectInjection(bodyString)) {
    logger.warn('Blocked potential prompt injection', {
      ip: req.ip,
      body: req.body,
    });
    res.status(400).json({ error: 'Invalid input: Security policy violation' });
    return;
  }

  if (req.body && typeof req.body === 'object') {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].replace(/<[^>]*>?/gm, '');
      }
    });
  }

  next();
};
