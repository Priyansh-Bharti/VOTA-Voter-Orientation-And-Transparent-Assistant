import { rateLimit, RateLimitRequestHandler } from 'express-rate-limit';

/**
 * Configuration for rate limiting middleware.
 */
export interface RateLimiterConfig {
  windowMs: number;
  max: number;
  message: string;
}

/**
 * Factory to create rate limiter middleware.
 * @param config Rate limit configuration.
 * @returns RateLimitRequestHandler.
 */
export const createRateLimiter = (
  config: RateLimiterConfig,
): RateLimitRequestHandler => rateLimit({
  windowMs: config.windowMs,
  max: config.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: config.message },
});

/**
 * Global rate limiter: 60 requests per minute.
 */
export const globalRateLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 60,
  message: 'Too many requests. Please try again later.',
});

/**
 * Chat-specific rate limiter: 10 requests per minute.
 */
export const chatRateLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 10,
  message: 'Chat limit reached. Please wait a minute.',
});
