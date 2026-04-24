import { Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

import { RequestWithId } from './logger.js';
import { logger } from '../utils/logger.js';

/**
 * Custom request including authenticated user data.
 */
export interface AuthenticatedRequest extends RequestWithId {
  user?: admin.auth.DecodedIdToken;
}

/**
 * Middleware to verify Firebase ID tokens.
 * Expects 'Authorization: Bearer <token>' header.
 */
export const verifyAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing token' });
    return;
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    logger.error('Firebase auth verification failed', error as Error, {
      requestId: req.requestId,
    });
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
