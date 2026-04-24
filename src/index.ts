import dotenv from 'dotenv';

import { APP_CONSTANTS } from './constants.js';
import { createServer } from './server.js';
import { logger } from './utils/logger.js';

dotenv.config();

/**
 * Bootstraps the VOTA backend application.
 */
const bootstrap = (): void => {
  const app = createServer();
  const port = process.env.PORT || APP_CONSTANTS.PORT_DEFAULT;

  app.listen(port, () => {
    logger.info('Server started', {
      port,
      version: APP_CONSTANTS.API_VERSION,
      env: process.env.NODE_ENV || 'development',
    });
  });
};

bootstrap();
