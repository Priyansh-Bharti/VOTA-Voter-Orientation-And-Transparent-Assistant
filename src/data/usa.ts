import { ELECTION_RULES } from '../constants.js';
import { CountryData } from '../schemas/election.js';

/**
 * Election data for the United States.
 * Source: Federal Election Commission (FEC) and vote.gov.
 * Note: Rules vary significantly by state (e.g., ID requirements, registration deadlines).
 */
export const usaData: CountryData = {
  countryCode: ELECTION_RULES.USA.CODE,
  countryName: ELECTION_RULES.USA.NAME,
  eligibility: {
    minimumAge: ELECTION_RULES.MIN_VOTING_AGE,
    citizenshipRequired: true,
    residencyRequired: true,
    idDocuments: [
      'State-issued Driver License',
      'U.S. Passport',
      'Military ID',
      'State ID Card',
    ],
  },
  phases: [
    {
      id: 'us-phase-1',
      title: 'Primary Elections',
      description: 'State-level primaries to select party nominees.',
      startDate: '2024-02-01T00:00:00Z',
      endDate: '2024-06-30T00:00:00Z',
      status: 'ACTIVE',
    },
    {
      id: 'us-phase-2',
      title: 'General Election Registration',
      description: 'Deadline to register for the presidential election varies by state.',
      startDate: '2024-09-01T00:00:00Z',
      endDate: '2024-10-15T00:00:00Z',
      status: 'UPCOMING',
    },
    {
      id: 'us-phase-3',
      title: 'Presidential Election 2024',
      description: 'National voting day for the President and Congress.',
      startDate: '2024-11-05T00:00:00Z',
      endDate: '2024-11-05T23:59:59Z',
      status: 'UPCOMING',
    },
  ],
  registrationUrl: ELECTION_RULES.USA.OFFICIAL_PORTAL,
  lastUpdated: '2024-04-24T00:00:00Z',
};
