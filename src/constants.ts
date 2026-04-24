/**
 * Global constants for the VOTA project.
 * All magic numbers and strings are defined here.
 */
export const APP_CONSTANTS = {
  PORT_DEFAULT: 3000,
  API_VERSION: 'v1',
} as const;

export const CONFIG = {
  DEFAULT_LOCALE: 'en-IN',
  SUPPORTED_COUNTRIES: ['IN', 'US', 'GB'],
} as const;

export const ELECTION_RULES = {
  MIN_VOTING_AGE: 18,
  INDIA: {
    CODE: 'IN',
    NAME: 'India',
    OFFICIAL_PORTAL: 'https://voters.eci.gov.in/',
  },
  USA: {
    CODE: 'US',
    NAME: 'United States',
    OFFICIAL_PORTAL: 'https://vote.gov/',
  },
  UK: {
    CODE: 'GB',
    NAME: 'United Kingdom',
    OFFICIAL_PORTAL: 'https://www.gov.uk/register-to-vote',
  },
} as const;

export const DATE_FORMATS = {
  ISO: 'yyyy-MM-dd',
  DISPLAY: 'dd MMM yyyy',
} as const;
