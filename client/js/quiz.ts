/**
 * Quiz Module for VOTA.
 * Handles card flip animations, score tracking, and feedback.
 */
export class VOTAQuiz {
  private score: number = 0;

  private totalQuestions: number = 0;

  /**
   * Handles the answer selection logic.
   * @param isCorrect Whether the selected answer was correct.
   * @param cardElement The card element to animate.
   */
  public handleAnswer(isCorrect: boolean, cardElement: HTMLElement): void {
    this.totalQuestions += 1;
    if (isCorrect) this.score += 1;

    cardElement.classList.add('flipped');
    const feedback = cardElement.querySelector('.feedback');
    if (feedback) {
      feedback.textContent = isCorrect ? 'Correct!' : 'Incorrect';
      feedback.className = `feedback ${isCorrect ? 'success' : 'error'}`;
    }

    if (isCorrect) this.triggerConfetti();
  }

  /**
   * Triggers a confetti animation on successful completion.
   */
  private triggerConfetti(): void {
    // In production, use a library like canvas-confetti
  }

  /**
   * Returns the final score as a formatted string.
   */
  public getScoreSummary(): string {
    return `${this.score} / ${this.totalQuestions}`;
  }
}
