/**
 * App Router and State Manager for VOTA.
 * Orchestrates screen transitions and navigation.
 */
export class VOTAApp {
  private currentScreen: string = 'onboarding';

  /**
   * Initializes the app and sets up global state listeners.
   */
  constructor() {
    this.initNavigation();
    this.renderScreen(this.currentScreen);
  }

  /**
   * Navigates to a specific screen.
   * @param screenId The ID of the screen to show (matching Stitch names).
   */
  public navigate(screenId: string): void {
    this.currentScreen = screenId;
    this.renderScreen(screenId);
    this.updateBottomNav(screenId);
  }

  private initNavigation(): void {
    const navItems = document.querySelectorAll('.bottom-nav-item');
    navItems.forEach((item) => {
      item.addEventListener('click', () => {
        const screenId = item.getAttribute('data-screen');
        if (screenId) this.navigate(screenId);
      });
    });
  }

  private renderScreen(screenId: string): void {
    const screens = document.querySelectorAll('.screen');
    screens.forEach((s) => s.classList.remove('active'));

    const target = document.getElementById(`screen-${screenId}`);
    if (target) target.classList.add('active');
  }

  private updateBottomNav(screenId: string): void {
    const items = document.querySelectorAll('.bottom-nav-item');
    items.forEach((item) => {
      if (item.getAttribute('data-screen') === screenId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  (window as Window & { VOTA?: VOTAApp }).VOTA = new VOTAApp();
});
