# Accessibility Policy - VOTA

## Standards Compliance
VOTA is designed to meet **WCAG 2.1 Level AA** standards. We believe that civic information must be accessible to every citizen, regardless of their physical or cognitive abilities.

## Key Implementation Details
- **Touch Targets**: All interactive elements (navigation items, buttons) have a minimum size of **44x44px** to support users with limited motor control.
- **Landmark Roles**: Used `<header>`, `<main>`, `<nav>`, and `<aside>` to ensure screen readers can navigate the page structure efficiently.
- **Aria Labels**: Every icon-only button and navigation link includes an `aria-label` describing its function.
- **Aria Live Regions**: The chat interface and election phase badges use `aria-live="polite"` to announce updates without interrupting the user.
- **Color Contrast**: All color pairings in the Stitch design system have been verified to exceed the **4.5:1** contrast ratio for normal text.
- **Focus Rings**: Custom CSS focus states ensure that keyboard users can clearly identify the active element.
- **Typography**: Responsive font sizes and clear typeface hierarchy (Plus Jakarta Sans and Inter) ensure readability.

## Testing
This platform is tested using:
- VoiceOver (iOS/macOS)
- TalkBack (Android)
- NVDA (Windows)
- Axe DevTools for automated audits.
