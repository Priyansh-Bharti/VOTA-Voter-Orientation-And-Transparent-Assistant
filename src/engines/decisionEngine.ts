import { getCountryData } from '../data/index.js';

/**
 * DETERMINISTIC ONLY — no AI calls permitted.
 * DecisionEngine: Pure logic for content strategy and voter eligibility.
 */
export class DecisionEngine {
  /**
   * Checks if a user is eligible to vote based on country rules.
   * @param countryCode ISO alpha-2 country code.
   * @param age User's age.
   * @param isCitizen Whether the user is a citizen.
   * @param isRegistered Whether the user is registered.
   * @returns Object containing eligibility status and reasons.
   * @example
   * const result = engine.checkEligibility('IN', 20, true, false);
   */
  public checkEligibility(
    countryCode: string,
    age: number,
    isCitizen: boolean,
    isRegistered: boolean,
  ): { eligible: boolean; reasons: string[] } {
    const data = getCountryData(countryCode);
    const reasons: string[] = [];
    if (!data) return { eligible: false, reasons: ['Invalid country code'] };

    if (age < data.eligibility.minimumAge) {
      reasons.push(`Minimum age is ${data.eligibility.minimumAge}`);
    }
    if (data.eligibility.citizenshipRequired && !isCitizen) {
      reasons.push('Citizenship required');
    }
    if (!isRegistered) {
      reasons.push('Registration required');
    }

    return { eligible: reasons.length === 0, reasons };
  }

  /**
   * Determines what content should be prioritized for the user.
   * @param countryCode ISO alpha-2 country code.
   * @param phaseTitle Current election phase title.
   * @param query User's raw query string.
   * @returns A decision object for UI content.
   * @example
   * const decision = engine.determineContent('US', 'Primary', 'Where to vote?');
   */
  public determineContent(
    countryCode: string,
    phaseTitle: string,
    query: string,
  ): { priority: string; suggestQuiz: boolean } {
    const lowercaseQuery = query.toLowerCase();
    const isLocationQuery = lowercaseQuery.includes('where') || lowercaseQuery.includes('booth');

    return {
      priority: isLocationQuery ? 'LOCATIONS' : 'INFORMATION',
      suggestQuiz: phaseTitle.includes('Registration'),
    };
  }
}

export const decisionEngine = new DecisionEngine();
