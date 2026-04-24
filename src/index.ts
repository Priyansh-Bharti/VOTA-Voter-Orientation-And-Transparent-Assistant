import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { logger } from './utils/logger.js';
import { APP_CONSTANTS } from './constants/constants.js';

/**
 * Initializes the Express application.
 * @returns The initialized Express app.
 */
export const createApp = (): Express => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  return app;
};

/**
 * Starts the server.
 */
const startServer = (): void => {
  const app = createApp();
  const port = process.env.PORT || APP_CONSTANTS.PORT_DEFAULT;

  app.listen(port, () => {
    logger.info(`Server started`, { port });
  });
};

startServer();
