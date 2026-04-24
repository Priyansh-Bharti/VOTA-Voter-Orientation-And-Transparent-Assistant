import { ELECTION_RULES } from '../constants.js';
import { CountryData } from '../schemas/election.js';

/**
 * Election data for the United Kingdom.
 * Source: The Electoral Commission (UK).
 * Legally governed by the Political Parties, Elections and Referendums Act 2000.
 */
export const ukData: CountryData = {
  countryCode: ELECTION_RULES.UK.CODE,
  countryName: ELECTION_RULES.UK.NAME,
  eligibility: {
    minimumAge: ELECTION_RULES.MIN_VOTING_AGE,
    citizenshipRequired: true,
    residencyRequired: true,
    idDocuments: [
      'Passport',
      'Driving License',
      'Voter Authority Certificate',
      'Older Person’s Bus Pass',
    ],
  },
  phases: [
    {
      id: 'uk-phase-1',
      title: 'Voter ID Preparation',
      description: 'New requirement for photo ID at polling stations.',
      startDate: '2024-01-01T00:00:00Z',
      endDate: '2024-12-31T00:00:00Z',
      status: 'ACTIVE',
    },
    {
      id: 'uk-phase-2',
      title: 'Local Elections 2024',
      description: 'Elections for local councils and mayors.',
      startDate: '2024-05-02T00:00:00Z',
      endDate: '2024-05-02T22:00:00Z',
      status: 'ACTIVE',
    },
  ],
  registrationUrl: ELECTION_RULES.UK.OFFICIAL_PORTAL,
  lastUpdated: '2024-04-24T00:00:00Z',
};
