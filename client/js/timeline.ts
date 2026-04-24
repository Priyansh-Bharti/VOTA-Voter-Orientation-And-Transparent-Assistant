import { formatDate, formatCountdown } from './utils.js';

/**
 * Election Timeline Stepper Module.
 * Renders the multi-phase stepper from the Stitch design.
 */
export class VOTATimeline {
  private container: HTMLElement;

  constructor(containerId: string) {
    this.container = document.getElementById(containerId) || document.body;
  }

  /**
   * Renders the timeline steps.
   * @param steps Array of phases.
   */
  public render(steps: Array<{ title: string, status: string, startDate: string }>): void {
    this.container.innerHTML = steps.map((step, index) => `
      <div class="timeline-step ${step.status.toLowerCase()}">
        <div class="step-marker">${index + 1}</div>
        <div class="step-content">
          <h3 class="step-title">${step.title}</h3>
          <p class="step-date">${formatDate(step.startDate)}</p>
          ${step.status === 'ACTIVE' ? '<div class="active-badge">Live Now</div>' : ''}
        </div>
      </div>
    `).join('');
  }

  /**
   * Updates a countdown timer element.
   * @param targetDate The target date string.
   * @param elementId The DOM element ID to update.
   */
  public startCountdown(targetDate: string, elementId: string): void {
    const el = document.getElementById(elementId);
    if (!el) return;

    setInterval(() => {
      const diff = new Date(targetDate).getTime() - new Date().getTime();
      if (diff > 0) el.textContent = formatCountdown(diff);
    }, 1000);
  }
}
