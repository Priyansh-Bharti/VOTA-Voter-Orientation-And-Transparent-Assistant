import { indiaData } from './india.js';
import { ukData } from './uk.js';
import { usaData } from './usa.js';
import { CountryData } from '../schemas/election.js';

/**
 * Retrieves election data for a specific country.
 * @param code ISO 3166-1 alpha-2 country code.
 * @returns The CountryData for the specified code, or undefined if not found.
 * @throws Error if the country code is invalid (handled by caller).
 */
export const getCountryData = (code: string): CountryData | undefined => {
  const dataMap: Record<string, CountryData> = {
    IN: indiaData,
    US: usaData,
    GB: ukData,
  };

  return dataMap[code.toUpperCase()];
};
