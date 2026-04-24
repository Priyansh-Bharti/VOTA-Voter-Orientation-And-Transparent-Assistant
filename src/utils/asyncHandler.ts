import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';

/**
 * Higher-order function to wrap async Express routes and pass errors to next().
 * Eliminates the need for try/catch blocks in every route handler.
 * @param fn The async request handler function.
 * @returns A RequestHandler that catches errors.
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
): RequestHandler => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
