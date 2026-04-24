import { getCountryData } from '../data/index.js';
import { ElectionPhase } from '../schemas/election.js';

/**
 * ElectionEngine: Deterministic timeline computation.
 * Handles the logic for identifying current and upcoming election stages.
 */
export class ElectionEngine {
  /**
   * Computes the current active phase for a given country and date.
   * @param countryCode ISO alpha-2 country code.
   * @param date The date to check against.
   * @returns The active phase or undefined if none found.
   * @example
   * const phase = engine.computeCurrentPhase('IN', new Date('2024-04-25'));
   */
  public computeCurrentPhase(
    countryCode: string,
    date: Date,
  ): ElectionPhase | undefined {
    const data = getCountryData(countryCode);
    if (!data) return undefined;

    const time = date.getTime();
    return data.phases.find((phase) => {
      const start = new Date(phase.startDate).getTime();
      const end = new Date(phase.endDate).getTime();
      return time >= start && time <= end;
    });
  }

  /**
   * Retrieves all timeline steps for a country.
   * @param countryCode ISO alpha-2 country code.
   * @returns Array of election phases.
   * @example
   * const steps = engine.getTimelineSteps('US');
   */
  public getTimelineSteps(countryCode: string): ElectionPhase[] {
    const data = getCountryData(countryCode);
    return data?.phases || [];
  }

  /**
   * Calculates days remaining until the next phase starts.
   * @param countryCode ISO alpha-2 country code.
   * @returns Number of days, or -1 if no upcoming phase.
   * @example
   * const days = engine.getDaysUntilNextPhase('GB');
   */
  public getDaysUntilNextPhase(countryCode: string): number {
    const data = getCountryData(countryCode);
    if (!data) return -1;

    const now = new Date().getTime();
    const upcoming = data.phases
      .filter((p) => new Date(p.startDate).getTime() > now)
      .sort(
        (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      );

    if (upcoming.length === 0) return -1;

    const diff = new Date(upcoming[0].startDate).getTime() - now;
    const msInDay = 86400000;
    return Math.ceil(diff / msInDay);
  }
}

export const electionEngine = new ElectionEngine();
