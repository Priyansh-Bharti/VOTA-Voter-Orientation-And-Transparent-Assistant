import { z } from 'zod';

/**
 * Zod schema for an election phase.
 * Represents a specific stage in the election process.
 */
export const ElectionPhaseSchema = z.object({
  id: z.string().describe('Unique identifier for the phase'),
  title: z.string().describe('Human-readable title of the phase'),
  description: z.string().describe('Detailed description of the phase'),
  startDate: z.string().describe('ISO date string for phase start'),
  endDate: z.string().describe('ISO date string for phase end'),
  status: z.enum(['UPCOMING', 'ACTIVE', 'COMPLETED']).describe('Current status'),
});

/**
 * Zod schema for voter eligibility requirements.
 * Defines the legal criteria to participate in an election.
 */
export const EligibilityRequirementsSchema = z.object({
  minimumAge: z.number().describe('Minimum age required to vote'),
  citizenshipRequired: z.boolean().describe('Whether citizenship is mandatory'),
  residencyRequired: z.boolean().describe('Whether local residency is mandatory'),
  idDocuments: z.array(z.string()).describe('List of accepted identification documents'),
});

/**
 * Zod schema for country-specific election data.
 * Contains rules, phases, and registration info.
 */
export const CountryDataSchema = z.object({
  countryCode: z.string().describe('ISO 3166-1 alpha-2 country code'),
  countryName: z.string().describe('Full name of the country'),
  eligibility: EligibilityRequirementsSchema,
  phases: z.array(ElectionPhaseSchema),
  registrationUrl: z.string().url().describe('Official voter registration portal'),
  lastUpdated: z.string().describe('ISO date string of last data update'),
});

/**
 * Zod schema for a polling booth location.
 */
export const BoothLocationSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  openingHours: z.string(),
});

/**
 * TypeScript types inferred from Zod schemas.
 */
export type ElectionPhase = z.infer<typeof ElectionPhaseSchema>;
export type EligibilityRequirements = z.infer<typeof EligibilityRequirementsSchema>;
export type CountryData = z.infer<typeof CountryDataSchema>;
export type BoothLocation = z.infer<typeof BoothLocationSchema>;
