import { ELECTION_RULES } from '../constants.js';
import { CountryData } from '../schemas/election.js';

/**
 * Election data for India.
 * Source: Election Commission of India (ECI).
 * Legally governed by the Representation of the People Act, 1950 and 1951.
 */
export const indiaData: CountryData = {
  countryCode: ELECTION_RULES.INDIA.CODE,
  countryName: ELECTION_RULES.INDIA.NAME,
  eligibility: {
    minimumAge: ELECTION_RULES.MIN_VOTING_AGE,
    citizenshipRequired: true,
    residencyRequired: true,
    idDocuments: [
      'Voter ID (EPIC)',
      'Aadhar Card',
      'PAN Card',
      'Driving License',
      'Passport',
    ],
  },
  phases: [
    {
      id: 'in-phase-1',
      title: 'Voter Registration',
      description: 'Registration of new voters and correction of existing entries.',
      startDate: '2024-01-01T00:00:00Z',
      endDate: '2024-03-31T00:00:00Z',
      status: 'COMPLETED',
    },
    {
      id: 'in-phase-2',
      title: 'Nomination Filing',
      description: 'Candidates file their nominations for the upcoming election.',
      startDate: '2024-04-01T00:00:00Z',
      endDate: '2024-04-15T00:00:00Z',
      status: 'COMPLETED',
    },
    {
      id: 'in-phase-3',
      title: 'General Elections 2024',
      description: 'Multi-phase voting across the nation for Lok Sabha.',
      startDate: '2024-04-19T00:00:00Z',
      endDate: '2024-06-01T00:00:00Z',
      status: 'ACTIVE',
    },
  ],
  registrationUrl: ELECTION_RULES.INDIA.OFFICIAL_PORTAL,
  lastUpdated: '2024-04-24T00:00:00Z',
};
