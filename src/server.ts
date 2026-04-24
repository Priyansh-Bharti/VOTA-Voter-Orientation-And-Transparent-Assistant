import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';

import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/logger.js';
import { globalRateLimiter, chatRateLimiter } from './middleware/rateLimiter.js';
import { sanitizeInput } from './middleware/sanitize.js';
import { analyticsRoutes } from './routes/analytics.js';
import { chatRoutes } from './routes/chat.js';
import { electionRoutes } from './routes/election.js';
import { pollingRoutes } from './routes/polling.js';
import { translateRoutes } from './routes/translate.js';

/**
 * Configures global security and parsing middleware.
 * @param app Express application instance.
 */
const configureMiddleware = (app: Express): void => {
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'https://api.vota-assistant.org'],
      },
    },
  }));
  app.use(cors({ origin: process.env.CORS_WHITELIST?.split(',') || '*' }));
  app.use(express.json());
  app.use(requestLogger);
  app.use(globalRateLimiter);
};

/**
 * Mounts all API routes.
 * @param app Express application instance.
 */
const mountRoutes = (app: Express): void => {
  app.use('/api/election', sanitizeInput, electionRoutes);
  app.use('/api/chat', chatRateLimiter, sanitizeInput, chatRoutes);
  app.use('/api/polling', sanitizeInput, pollingRoutes);
  app.use('/api/translate', sanitizeInput, translateRoutes);
  app.use('/api/analytics', analyticsRoutes);
};

/**
 * Configures and returns the Express server instance.
 */
export const createServer = (): Express => {
  const app = express();

  configureMiddleware(app);
  mountRoutes(app);

  // Error Handling
  app.use(errorHandler);

  return app;
};
