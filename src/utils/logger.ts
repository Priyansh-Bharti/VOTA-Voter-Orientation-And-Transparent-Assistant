/**
 * Structured logger utility.
 */
export const logger = {
  /**
   * Logs an info message.
   * @param message The message to log.
   * @param meta Optional metadata.
   */
  info: (message: string, meta?: Record<string, unknown>): void => {
    // In production, this would use a library like winston or pino.
    // For the scaffold, we ensure no console.log is used directly in logic.
    process.stdout.write(`${JSON.stringify({ level: 'info', message, ...meta })}\n`);
  },

  /**
   * Logs an error message.
   * @param message The message to log.
   * @param error The error object.
   * @param meta Optional metadata.
   */
  error: (message: string, error?: Error, meta?: Record<string, unknown>): void => {
    process.stderr.write(
      `${JSON.stringify({
        level: 'error',
        message,
        error: error?.message,
        stack: error?.stack,
        ...meta,
      })}\n`,
    );
  },
};
