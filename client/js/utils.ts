/**
 * Global utility functions for the VOTA client.
 * Includes XSS prevention, formatting, and performance helpers.
 */

/**
 * Strips HTML tags and prevents XSS by escaping characters.
 * @param str Raw input string.
 * @returns Sanitized string.
 */
export const sanitizeXSS = (str: string): string => {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

/**
 * Formats a date according to the VOTA design spec.
 * @param date Date object or ISO string.
 * @returns Formatted string.
 */
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Formats a millisecond duration into a human-readable countdown.
 * @param ms Duration in milliseconds.
 * @returns String like "2d 4h 30m".
 */
export const formatCountdown = (ms: number): string => {
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  return `${days}d ${hours}h ${minutes}m`;
};

/**
 * Debounce helper to limit function execution frequency.
 */
export const debounce = <T extends (...args: unknown[]) => void>(
  fn: T,
  ms: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  };
};
