import { sanitizeXSS } from './utils.js';

/**
 * Internationalization module for VOTA.
 * Supports 10 languages and RTL (Arabic).
 */
export type SupportedLang = 'en' | 'hi' | 'es' | 'fr' | 'ar' | 'ta' | 'de' | 'pt' | 'zh' | 'bn';

export class I18nManager {
  private currentLang: SupportedLang = 'en';

  private readonly rtlLangs: SupportedLang[] = ['ar'];

  /**
   * Initializes i18n from localStorage.
   */
  constructor() {
    const saved = localStorage.getItem('vota_lang') as SupportedLang;
    if (saved) this.setLanguage(saved);
  }

  /**
   * Switches the application language and updates the DOM for RTL.
   * @param lang Language code.
   */
  public setLanguage(lang: SupportedLang): void {
    this.currentLang = lang;
    localStorage.setItem('vota_lang', lang);

    // Update HTML dir attribute for RTL support
    document.documentElement.dir = this.rtlLangs.includes(lang) ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    // Dispatch event for components to re-render
    window.dispatchEvent(new CustomEvent('langChanged', { detail: lang }));
  }

  /**
   * Returns the current language code.
   */
  public getLanguage(): SupportedLang {
    return this.currentLang;
  }

  /**
   * Translates a key (simplified for scaffold).
   * @param key Translation key.
   * @returns Translated string.
   */
  public t(key: string): string {
    // In production, this would use a library like i18next
    return sanitizeXSS(key);
  }
}

export const i18n = new I18nManager();
