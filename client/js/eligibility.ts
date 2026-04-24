/**
 * Eligibility Wizard Module.
 * Handles the step-by-step eligibility checker UI.
 */
export class EligibilityWizard {
  private currentStep: number = 0;

  private totalSteps: number = 0;

  private steps: HTMLElement[];

  constructor(containerClass: string) {
    this.steps = Array.from(document.querySelectorAll(`.${containerClass} .step`));
    this.totalSteps = this.steps.length;
    this.showStep(0);
  }

  /**
   * Navigates to the next step with a slide transition.
   */
  public next(): void {
    if (this.currentStep < this.totalSteps - 1) {
      this.hideStep(this.currentStep);
      this.currentStep += 1;
      this.showStep(this.currentStep);
    }
  }

  /**
   * Renders the final result card.
   * @param eligible Whether the user is eligible.
   * @param reasons Reasons for eligibility or rejection.
   */
  public renderResult(eligible: boolean, reasons: string[]): void {
    const container = document.getElementById('eligibility-result');
    if (!container) return;

    container.innerHTML = `
      <div class="result-card ${eligible ? 'success' : 'error'}">
        <div class="result-icon">${eligible ? '✅' : '❌'}</div>
        <h2 class="result-title">${eligible ? 'You are Eligible' : 'Ineligible'}</h2>
        <ul class="result-reasons">
          ${reasons.map((r) => `<li>${r}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  private showStep(index: number): void {
    this.steps[index]?.classList.add('active', 'slide-in');
  }

  private hideStep(index: number): void {
    this.steps[index]?.classList.remove('active', 'slide-in');
    this.steps[index]?.classList.add('slide-out');
  }
}
